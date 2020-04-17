import React, { useState } from "react";
import styled from "styled-components";

import Card from "components/common/Card";
import TopHeader from "components/common/TopHeader";
import Button from "components/common/Button";
import WideInput from "components/common/WideInput";
import { User } from "interfaces";
import { post } from "utils/request";

const NewRoomCard = ({ onSubmit }: { onSubmit: (user: User) => void }) => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<{ name: string }>({
    name: "",
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError({ ...error, name: "" });
    setName(value);
  };

  const validate = () => {
    let isError = false;
    let errorEnvelope = { name: "" };
    if (!name) {
      isError = true;
      errorEnvelope["name"] = "Please enter your name";
    }
    setError(errorEnvelope);
    return isError;
  };

  const submit = async () => {
    if (validate()) {
      return;
    }
    const response = await post("/new_user", { name });
    if (response.ok) {
      const data = await response.json();
      onSubmit(data);
    }
  };

  return (
    <Card>
      <TopHeader>Sign In</TopHeader>
      <Content>
        <WideInput
          key="name"
          type="text"
          placeholder="Player Name"
          error={error.name}
          onChange={handleNameChange}
        />
        <CButton onClick={submit}>Submit</CButton>
      </Content>
    </Card>
  );
};

const Content = styled.div`
  padding: 50px;
`;

const CButton = styled(Button)`
  margin-top: 20px;
`;

export default NewRoomCard;
