import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Spinner from '../Spinner';

const StyledDiv = styled.div`
  background-color: transparent;
  display: inline-block;
  text-transform: uppercase;
  font-size: 14px;
  font-family: ${props => (props.font ? props.font : 'shapiro95_super_wide')};
  line-height: 19px;
  min-width: 130px;
  width: ${props => (props.w ? props.w : '')};
  padding: 0;
  position: relative;
  text-align: center;
  text-decoration: none;
  opacity: ${props => (props.disabled || props.loading ? '0.3' : '1')};

  .content {
    background-color: ${props =>
      props.bg ? props.bg : props.inverted ? colors.white : colors.brandBlue};
    border: 3px solid ${props => (props.inverted ? colors.brandBlue : colors.white)};
    color: ${props => (props.inverted ? colors.brandBlue : colors.white)};
    padding: 8px 15px;
    position: relative;
    transition: 500ms background-color ease, 500ms border-color ease, 500ms color ease;
    z-index: 1;
    :hover {
      background-color: ${props => (props.inverted ? colors.brandBlue : colors.white)};
      color: ${props => (props.inverted ? colors.white : colors.brandBlue)};
      border: 3px solid ${props => (props.inverted ? colors.white : colors.brandBlue)};
    }
  }

  .double-drop {
    background-color: ${(props) =>
      props.bg ? props.bg : props.inverted ? colors.white : colors.brandBlue};
    border: 3px solid ${(props) => (props.inverted ? colors.brandBlue : colors.white)};
    height: 100%;
    left: 9px;
    position: absolute;
    top: 9px;
    width: 100%;
    z-index: 0;
  }
`;

const StyledButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

const PrimaryButton = ({
  to,
  children,
  loading,
  inverted,
  double,
  disabled,
  font,
  bg,
  w,
  ...props
}) => {
  const content = (
    <StyledDiv font={font} inverted={inverted} disabled={disabled} bg={bg} w={w} {...props}>
      {<div className="content">{loading ? <Spinner /> : children}</div>}
      {double && <div className="double-drop"></div>}
    </StyledDiv>
  );

  return to ? (
    <Link
      style={{ pointerEvents: disabled || loading ? 'none' : '' }}
      to={to}
      className="primary-button"
    >
      {content}
    </Link>
  ) : (
    <StyledButton className="primary-button">{content}</StyledButton>
  );
};

export default PrimaryButton;
