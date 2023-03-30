import React from 'react';
import { Link as RRLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const getVariantClasses = (variant) => {
  switch (variant) {
    case 'white-opacity':
      return 'text-white hover:opacity-60 transition-opacity duration-300';
    case 'purple-underline':
    default:
      return 'text-cc-purple hover:underline';
  }
};

const Link = ({ to, onClick, variant, isExternal, children, className, ...props }) => {
  const linkClassName = `${getVariantClasses(variant)} ${className}`;

  if (isExternal) {
    return (
      <a href={to} className={linkClassName} {...props}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <span onClick={onClick} className={`${linkClassName} cursor-pointer`} {...props}>
        {children}
      </span>
    );
  }

  return (
    <RRLink to={to} className={linkClassName} {...props}>
      {children}
    </RRLink>
  );
};

Link.defaultProps = {
  to: null,
  onClick: null,
  variant: 'purple-underline',
  isExternal: false,
  className: '',
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  isExternal: PropTypes.bool,
  className: PropTypes.string,
};

export default Link;
