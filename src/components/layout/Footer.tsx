import React from "react";
import styled from "styled-components";

import { FOOTER_HEIGHT } from "constants/style";
import { CenteredContent } from "styles/common";

export default function Footer() {
  return (
    <CFooter>Copyright © Your Website {new Date().getFullYear()}.</CFooter>
  );
}

const CFooter = styled.div`
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  height: ${FOOTER_HEIGHT}px;
  border-top: 1px solid rgb(158, 158, 158);
  ${CenteredContent}
`;
