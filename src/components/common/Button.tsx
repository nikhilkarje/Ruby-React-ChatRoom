import styled, { css } from "styled-components";

import { CenteredContent, BoxShadow } from "styles/common";
import { Black, LightGrey, Green, White } from "styles/color";

const Default = css`
  padding: 10px 25px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 5px;
  margin: auto;
  cursor: pointer;
  outline: none;
  ${BoxShadow}

  &:active {
    box-shadow: none;
  }
`;

const Button = styled.button`
  ${CenteredContent}
  ${Default}
  background: ${Green};
  color: ${White};

  &:active {
    border: 1px solid ${Green};
    color: ${Green};
    background: ${White};
  }
`;

export const SecondaryButton = styled.button`
  ${CenteredContent}
  ${Default}
  background: ${LightGrey};
  color: ${Black};
`;

export default Button;
