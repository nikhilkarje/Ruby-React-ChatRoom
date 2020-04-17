import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import RoomContext from "container/RoomContext";
import ClientContext from "container/ClientContext";
import Card from "components/common/Card";
import TopHeader from "components/common/TopHeader";
import { BrightRed, Green } from "styles/color";
import { get } from "utils/request";

const SPECIAL_TOKENS = ["1", "2"];

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const subscriptionRef = useRef(null);
  const contentRef = useRef(null);
  const { client } = useContext(ClientContext);
  const { id, name } = useContext(RoomContext);
  const messagesRef = useRef(messages);
  const scrollBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };

  const subscribe = () => {
    subscriptionRef.current = client.subscribe(
      `/room/${id}/messages`,
      function (message: any) {
        setMessages(messagesRef.current.concat(message));
      }
    );
  };

  const fetchMessages = () => {
    get(`/room/${id}/messages`)
      .then((response) => response.json())
      .then((data) => setMessages(data.messages));
  };

  useEffect(() => {
    fetchMessages();
    subscribe();
    return () => subscriptionRef.current && subscriptionRef.current.cancel();
  }, []);

  useEffect(() => {
    scrollBottom();
    messagesRef.current = messages;
  }, [messages]);

  return (
    <CCard>
      <TopHeader>{name}</TopHeader>
      <Content ref={contentRef}>
        {messages.map((message) =>
          SPECIAL_TOKENS.indexOf(message.token) > -1 ? (
            <ChatWrapper>
              <MessageSpan colorCode={message.token}>
                {message.message}
              </MessageSpan>
            </ChatWrapper>
          ) : (
            <ChatWrapper>
              <NameSpan>{message.name}:</NameSpan>
              <MessageSpan>{message.message}</MessageSpan>
            </ChatWrapper>
          )
        )}
      </Content>
    </CCard>
  );
}

const CCard = styled(Card)`
  width: 100%;
`;

const Content = styled.div`
  padding: 20px 50px;
  max-height: 500px;
  overflow: auto;
`;

const ChatWrapper = styled.div`
  padding: 10px 0;
`;

const NameSpan = styled.span`
  font-weight: 400;
`;

const MessageSpan = styled.span<{
  colorCode?: string;
}>`
  padding-left: 10px;
  font-weight: 200;
  ${({ colorCode }) => {
    if (!colorCode) {
      return "";
    }
    if (colorCode === "1") {
      return css`
        color: ${Green};
      `;
    } else if (colorCode === "2") {
      return css`
        color: ${BrightRed};
      `;
    }
  }}
`;
