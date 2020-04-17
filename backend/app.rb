require "sinatra"
require "typhoeus"
require "pry"
require "redis"
require "faye"
require "./extensions/session_sync.rb"

configure { set :server, :puma }
set :root, "app"
enable :sessions
set :public_folder, File.dirname(__FILE__) + "/public"

PUBSUB_TOKEN = "t40kfawbmd7vu95ixjzcslho3eqp2ngr"

Client = Faye::Client.new("http://localhost:4567/faye")

use Faye::RackAdapter, { :mount => "/faye", :timeout => 5 } do |bayeux|
  bayeux.on(:unsubscribe) do |client_id, channel|
    redis = Redis.new(db: 1)
    room_id = channel.split("/")[2]
    client_token = "client_id:#{client_id}"
    if redis.exists(client_token)
      user = JSON.parse(redis.get(client_token))
      # Notify exit
      payload = {
        :message => "User #{user["name"]} has left the chat room",
        :name => "Server Client App",
        :token => "2",
        :pubsub_token => PUBSUB_TOKEN,
      }
      message_token = "message_room:#{room_id}"
      redis.rpush(message_token, payload.to_json)
      Client.publish("/room/#{room_id}/messages", payload)

      # Empty chat room
      room_token = "room:#{room_id}"
      users = JSON.parse(redis.hget(room_token, "users"))
      users.delete(user)
      redis.hset(room_token, "users", users.to_json)

      # Remove client id relation
      redis.del(client_token)
    end
  end

  bayeux.add_extension(SessionSync.new)
end

get "/" do
  erb :index, :layout => false
end

get "/user" do
  return get_user.to_json
end

get "/rooms" do
  redis = Redis.new(db: 1)
  room_keys = redis.keys("room:*")
  rooms = []
  for room_key in room_keys
    room = redis.hgetall(room_key)
    room_key.slice!("room:")
    rooms.push({
      :id => room_key,
      :name => room["name"],
      :users => JSON.parse(room["users"]).length,
    })
  end
  return { :rooms => rooms }.to_json
end

post "/new_user" do
  content_type :json
  request_json = JSON.parse(request.body.read)
  session[:user] = {
    :token => rand_token,
    :name => request_json["name"],
  }
  redis = Redis.new(db: 1)
  redis.set("user_token:#{session[:user][:token]}", { :ex => 3600 })
  return get_user.to_json
end

post "/new_room" do
  content_type :json
  request_json = JSON.parse(request.body.read)
  redis = Redis.new(db: 1)
  token = rand_token
  while redis.exists("room:#{token}")
    token = rand_token
  end
  room_token = "room:#{token}"
  if session[:user]
    redis.hset(room_token, "users", [].to_json)
    redis.hset(room_token, "name", request_json["name"])
  end
  return { :token => token }.to_json
end

post "/room/:id/message" do
  content_type :json
  check_logged_in
  request_json = JSON.parse(request.body.read)
  redis = Redis.new(db: 1)
  id = request_json["id"]
  payload = {
    :message => request_json["message"],
    :name => session[:user][:name],
    :token => session[:user][:token],
    :pubsub_token => PUBSUB_TOKEN,
  }
  token = "message_room:#{id}"
  room = redis.rpush(token, payload.to_json)
  Client.publish("/room/#{id}/messages", payload)
  return { :status => "success" }.to_json
end

get "/room/:id/messages" do
  check_logged_in
  redis = Redis.new(db: 1)
  id = params[:id]
  token = "message_room:#{id}"
  messages = redis.lrange(token, 0, -1)
  messages = messages.map { |message| JSON.parse(message) }
  return { :messages => messages }.to_json
end

get "/room/:id" do
  check_logged_in
  if request.xhr?
    redis = Redis.new(db: 1)
    room = redis.hgetall("room:#{params[:id]}")
    room["users"] = JSON.parse(room["users"]).length
    room["id"] = params[:id]
    return { :room => room }.to_json
  else
    bootstrap_javascript
    erb :room, :layout => false
  end
end

get "/logout" do
  session[:user] = nil
  redirect to("/")
end

def rand_token
  [*("a".."z"), *("0".."9")].shuffle[0, 8].join
end

def check_logged_in
  if !session[:user]
    redirect to("/")
  end
end

def get_user
  if !session[:user]
    return { :user => nil }
  end
  return { :user => session[:user] }
end

def bootstrap_javascript
  @bootstrap_javascript = "<script type=\"text/javascript\">window.config = #{get_user.to_json};window.config.client = new Faye.Client('/faye');window.config.client.addExtension({outgoing: function (message, callback) {if (message.channel === '/meta/subscribe') {message.ext = message.ext || {};message.ext.user = window.config.user;};callback(message);}})</script>"
end
