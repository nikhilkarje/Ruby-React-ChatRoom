import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { Room } from "interfaces";
import NewRoomModal from "components/NewRoomModal";
import Card from "components/common/Card";
import { Add } from "components/common/icons";
import TopHeader from "components/common/TopHeader";
import Table, {
  TableHeader,
  TableRow,
  TableData,
} from "components/common/Table";
import { DarkGrey, Purple } from "styles/color";
import { get } from "utils/request";

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[] | null>(null);

  const fetchRooms = () => {
    get("/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data.rooms));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <CCard>
      <CTopHeader>
        Chat Rooms
        <NewRoomModal triggerCss={IconPosCss} onSubmit={fetchRooms}>
          <Add iconCss={AddIconCss} />
        </NewRoomModal>
      </CTopHeader>
      <Table>
        <TableRow>
          <TableHeader>Id</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>No of people in the room</TableHeader>
          <TableHeader>Action</TableHeader>
        </TableRow>
        {rooms &&
          rooms.map((room: Room) => (
            <TableRow key={room.id}>
              <TableData>{room.id}</TableData>
              <TableData>{room.name}</TableData>
              <TableData>{room.users}</TableData>
              <TableData>
                <Link href={`/room/${room.id}`}> Join</Link>
              </TableData>
            </TableRow>
          ))}
      </Table>
    </CCard>
  );
}

const Link = styled.a`
  color: ${Purple};
`;

const CTopHeader = styled(TopHeader)`
  position: relative;
`;

const CCard = styled(Card)`
  min-width: 960px;
`;

const IconPosCss = css`
  position: absolute;
  right: 40px;
`;

const AddIconCss = css`
  font-size: 30px;
`;

const EditIconCss = css`
  font-size: 20px;
  color: ${DarkGrey};
`;
