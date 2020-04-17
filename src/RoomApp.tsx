import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Container from "components/layout/Container";
import ChatBox from "components/ChatBox";
import ChatRoom from "components/ChatRoom";
import UserContext from "container/UserContext";
import RoomContext from "container/RoomContext";
import { CenteredContent } from "styles/common";
import { get } from "utils/request";

export default function RoomApp() {
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRoom, setLoadingRoom] = useState(true);

  const fetchUser = () => {
    get("/user")
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setLoadingUser(false);
      });
  };

  const fetchRoom = () => {
    get(`/room/${window.location.pathname.split("/")[2]}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.room) {
          setRoom(data.room);
        }
        setLoadingRoom(false);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchRoom();
  }, []);

  return (
    <>
      {!loadingUser && !loadingRoom && (
        <UserContext.Provider value={user}>
          <RoomContext.Provider value={room}>
            <Container>
              <Wrapper>
                <ChatRoom />
                <ChatBox />
              </Wrapper>
            </Container>
          </RoomContext.Provider>
        </UserContext.Provider>
      )}
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-top: 50px;
  min-width: 600px;
  max-width: 960px;
  margin: auto;
`;
