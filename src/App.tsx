import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Container from "components/layout/Container";
import RoomList from "components/RoomList";
import NewUserCard from "components/NewUserCard";
import UserContext from "container/UserContext";
import { CenteredContent } from "styles/common";
import { get } from "utils/request";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = () => {
    get("/user")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.user) {
          setUser(data.user);
        }
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {!loading && (
        <UserContext.Provider value={user}>
          <Container isCenter={true}>
            <Wrapper>
              {user ? <RoomList /> : <NewUserCard onSubmit={setUser} />}
            </Wrapper>
          </Container>
        </UserContext.Provider>
      )}
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  ${CenteredContent}
`;
