import styled from "styled-components";

import { BoxShadow } from "styles/common";
import { White } from "styles/color";

const Card = styled.div`
  min-width: 320px;
  border-radius: 3px;
  background-color: ${White};
  ${BoxShadow}
`;

export default Card;
