import React, { useImperativeHandle, useRef } from "react";
import styled, { css } from "styled-components";

import { Black, BrightRed, LightGrey, White } from "styles/color";

const WideInput = ({ forwardRef, error, ...props }: any) => {
  const inputRef = useRef(null);
  if (forwardRef) {
    useImperativeHandle(forwardRef as any, () => inputRef.current);
  }

  return (
    <InputWrapper>
      <Input isError={!!error} ref={inputRef} {...props} />
      {error && <ErrorContainer>{error}</ErrorContainer>}
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{
  isError?: boolean;
}>`
  width: 100%;
  outline: none;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
  padding-left: 15px;
  vertical-align: middle;
  border-radius: 5px;
  line-height: 16px;
  border: 1px solid ${LightGrey};
  background: ${White};
  height: 38px;
  color: ${Black};
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.08) inset;

  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${BrightRed};
    `}
`;

const ErrorContainer = styled.span`
  color: ${BrightRed};
  font-size: 10px;
  position: absolute;
  bottom: 4px;
`;

export default WideInput;
