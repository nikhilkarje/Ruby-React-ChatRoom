require "redis"

class SessionSync
  def incoming(message, callback)
    unless /\/meta\// =~ message["channel"] || (message["data"] && message["data"]["pubsub_token"] && message["data"]["pubsub_token"] == PUBSUB_TOKEN)
      message["error"] = "401::Unauthorized"
    end

    if message["data"] && message["data"]["pubsub_token"]
      message["data"].delete("pubsub_token")
    end

    # Let non-subscribe messages through
    unless message["channel"] == "/meta/subscribe"
      return callback.call(message)
    end

    if message["ext"] && message["ext"]["user"]
      client = Faye::Client.new("http://localhost:4567/faye")
      redis = Redis.new(db: 1)
      room_id = message["subscription"].split("/")[2]

      # Add client id relation
      user = message["ext"]["user"]
      redis.set("client_id:#{message["clientId"]}", user.to_json)

      # Notify entry
      payload = {
        :message => "User #{user["name"]} has entered the chat room",
        :name => "Server Client App",
        :token => "1",
        :pubsub_token => PUBSUB_TOKEN,
      }
      message_token = "message_room:#{room_id}"
      redis.rpush(message_token, payload.to_json)
      client.publish("/room/#{room_id}/messages", payload)

      # Add to the room
      room_token = "room:#{room_id}"
      users = JSON.parse(redis.hget(room_token, "users")).push(user)
      redis.hset(room_token, "users", users.to_json)
    end

    # Call the server back now we're done
    callback.call(message)
  end
end
