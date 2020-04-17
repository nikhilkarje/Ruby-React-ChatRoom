import React, { useState, useRef } from "react";
import styled from "styled-components";

import Card from "components/common/Card";
import TopHeader from "components/common/TopHeader";
import Button from "components/common/Button";
import WideInput from "components/common/WideInput";
import Modal from "components/common/Modal";
import { post } from "utils/request";

const NewRoomForm = ({
  onSubmit,
  closeModal,
}: {
  onSubmit?: () => void;
  closeModal?: any;
}) => {
  const [name, setName] = useState<string>("");
  const [errorField, setErrorField] = useState<string>("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorField) {
      setErrorField("");
    }
    setName(e.target.value);
  };

  const validate = () => {
    let isError = false;
    if (!name) {
      isError = true;
      setErrorField("Please enter room name");
    }
    return isError;
  };

  const submit = async () => {
    if (validate()) {
      return;
    }
    const response = await post("/new_room", { name });
    if (response.ok) {
      const data = await response.json();
      window.location.href = `/room/${data.token}`;
    }
  };

  return (
    <Card>
      <TopHeader>New Room</TopHeader>
      <Content>
        <WideInput
          key="name"
          type="text"
          placeholder="Room Name"
          defaultValue={name}
          error={errorField}
          onChange={handleFormChange}
        />
        <CButton onClick={submit}>Submit</CButton>
      </Content>
    </Card>
  );
};

const NewRoomModal = ({
  children,
  triggerCss,
  onSubmit,
}: {
  children: React.ReactNode;
  triggerCss?: any;
  onSubmit?: () => void;
}) => {
  const closeRef = useRef(null);
  return (
    <Modal
      ref={closeRef}
      triggerCss={triggerCss}
      content={<NewRoomForm closeModal={closeRef} onSubmit={onSubmit} />}
    >
      {children}
    </Modal>
  );
};

const Content = styled.div`
  padding: 50px;
`;

const CButton = styled(Button)`
  margin-top: 20px;
`;

export default NewRoomModal;
