import React from "react";
import styled, { css } from "styled-components";

import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { HEADER_HEIGHT, FOOTER_HEIGHT } from "constants/style";
import { EggShellWhite } from "styles/color";

export default function Container({
  isCenter,
  isLogin,
  children,
}: {
  isCenter?: boolean;
  isLogin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <CContainer>
        <Header isLogin={isLogin} />
        <Content isCenter={isCenter}>{children}</Content>
        <Footer />
      </CContainer>
    </>
  );
}

const CContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div<{
  isCenter: boolean;
}>`
  ${({ isCenter }) =>
    isCenter &&
    css`
      height: 1px;
    `}
  min-height: calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px);
  flex: 1 0 auto;
  background-color: ${EggShellWhite};
`;
