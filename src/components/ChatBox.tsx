import React, { useContext, useState } from "react";
import styled from "styled-components";

import RoomContext from "container/RoomContext";
import Card from "components/common/Card";
import WideInput from "components/common/WideInput";
import { User } from "interfaces";
import { post } from "utils/request";

const ChatBox = () => {
  const [message, setMessage] = useState<string>("");
  const { id } = useContext(RoomContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  };

  const validate = () => {
    let isError = false;
    if (!message) {
      isError = true;
    }
    return isError;
  };

  const submit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode !== 13) {
      return;
    }
    if (validate()) {
      return;
    }
    const response = await post(`/room/${id}/message`, { id, message });
    if (response.ok) {
      setMessage("");
    }
  };

  return (
    <Content>
      <WideInput
        key="name"
        type="text"
        value={message}
        placeholder="Message"
        onChange={handleChange}
        onKeyUp={submit}
      />
    </Content>
  );
};

const Content = styled.div`
  padding: 20px 50px 50px;
  width: 100%;
`;

export default ChatBox;
