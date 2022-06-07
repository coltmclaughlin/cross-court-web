import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CheckboxInputContainer = styled.div`
  input[type='checkbox'] {
    -webkit-appearance: none;
    width: 1.15em;
    min-width: 1.15em;
    height: 1.15em;
    border-radius: 1px;
    border: 2px solid currentColor;
    display: grid;
    place-content: center;
    cursor: pointer;
    margin-top: 2px;

    &::before {
      content: '';
      width: 0.65em;
      height: 0.65em;
      background-color: currentColor;
      opacity: 0;
      transition: 120ms opacity ease-in-out;
    }

    &:checked::before {
      opacity: 100;
    }
  }

  label {
    font-size: 0.875em;
  }
`;

const Checkbox = ({ name, value, children, error, disabled, className, ...props }) => (
  <CheckboxInputContainer className={className}>
    <div className={`flex ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <input id={name} type="checkbox" checked={value} {...props} />
      <label htmlFor={name} className="cursor-pointer ml-4 select-none">
        {children}
      </label>
    </div>
    {error && <div className="block text-xs text-right text-red-500">{error}</div>}
  </CheckboxInputContainer>
);

Checkbox.defaultProps = {
  value: null,
  error: null,
  disabled: false,
  className: '',
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;