import React from "react";
import styled from "styled-components";

interface IconProps extends Props {
  icon: string;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  iconCss?: any;
}

const Icon = ({ icon, iconCss, className }: IconProps) => (
  <CIcon className={`material-icons ${className}`} iconCss={iconCss}>
    {icon}
  </CIcon>
);

export const Add = ({ className, iconCss }: Props) => (
  <Icon className={className} iconCss={iconCss} icon="add_circle" />
);

export const Edit = ({ className, iconCss }: Props) => (
  <Icon className={className} iconCss={iconCss} icon="create" />
);

export const Close = ({ className, iconCss }: Props) => (
  <Icon className={className} iconCss={iconCss} icon="clear" />
);

export const Delete = ({ className, iconCss }: Props) => (
  <Icon className={className} iconCss={iconCss} icon="delete" />
);

const CIcon = styled.i<{
  iconCss?: any;
}>`
  &.material-icons {
    cursor: pointer;
    ${({ iconCss }) => iconCss}
  }
`;
