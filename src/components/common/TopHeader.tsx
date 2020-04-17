import styled, { css } from "styled-components";

import { CenteredContent } from "styles/common";
import { Purple, White } from "styles/color";

const TopHeader = styled.div<{
  backGroundColor?: any;
}>`
  ${CenteredContent}
  padding: 20px 25px;
  background-color: ${Purple};
  color: ${White};
  font-weight: 600;
  font-size: 18px;
  border-radius: 3px 3px 0 0;
  ${({ backGroundColor }) =>
    !!backGroundColor &&
    css`
      background-color: ${backGroundColor};
    `}
`;

export default TopHeader;
