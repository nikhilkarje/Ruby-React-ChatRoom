import React from "react";
import styled, { css } from "styled-components";

import { HEADER_HEIGHT } from "constants/style";
import { BoxShadowBottom } from "styles/common";
import { DarkGrey, LightGrey, Purple } from "styles/color";

export default function Header({ isLogin }: { isLogin?: boolean }) {
  return (
    <CHeader isLogin={isLogin}>
      <Logo href="/">Ruby React Chat Application</Logo>
      {!isLogin && <Link href="/logout">Log out</Link>}
    </CHeader>
  );
}

const Logo = styled.a`
  font-size: 20px;
  font-weight: 500;
  color: ${Purple};
`;

const Link = styled.a`
  color: ${DarkGrey};
`;

const CHeader = styled.div<{
  isLogin: boolean;
}>`
  height: ${HEADER_HEIGHT}px;
  ${BoxShadowBottom}
  padding: 0 50px;
  border-bottom: 1px solid ${LightGrey};
  display: flex;
  align-items: center;

  ${({ isLogin }) =>
    isLogin
      ? css`
          justify-content: center;
        `
      : css`
          justify-content: space-between;
        `}
`;
