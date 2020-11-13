import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import colors from 'shared/styles/constants';
import InfoSvg from 'shared/components/svg/InfoSvg';
import LEVELS from 'shared/constants/levels';
import TEXT from 'shared/constants/text';

const SessionLevel = ({ level, showInfo = false }) => {
  if (level === LEVELS.BASIC) {
    return null;
  }

  return (
    <>
      <span className="level">
        LEVEL
        <span className="level-number">2</span>
      </span>
      {showInfo && (
        <>
          <InfoSvg dataTip={TEXT.ADVANCED_TOOLTIP} />
          <ReactTooltip
            backgroundColor="#9999FF"
            place="right"
            effect="solid"
            delayHide={3000}
            clickable
            html
          />
        </>
      )}
    </>
  );
};

SessionLevel.propTypes = {
  level: PropTypes.string.isRequired,
  showInfo: PropTypes.bool,
};

export default SessionLevel;
