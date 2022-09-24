/* eslint-disable no-nested-ternary */
import React from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  isSameDay,
  startOfWeek,
  weekRangeTitle,
  weekRange,
  dayShort,
  dayNumber,
  isThisWeek,
  isInFutureWeek,
  isPast,
} from 'shared/utils/date';
import colors from 'shared/styles/constants';

const WeekSelectorContainer = styled.div`
  .week-handler {
    display: flex;
    padding: 0.5rem 0;

    button {
      padding: 1rem;
      font-size: 1rem;
      border: 0;
      background-color: transparent;
      cursor: pointer;
    }

    svg {
      font-size: 1.5rem;
    }
  }

  .weektitle-container {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: bold;
    flex: 1;
    text-align: center;
    align-self: center;
  }

  .weekdays-container {
    display: flex;
    overflow-y: scroll;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  padding: 6px;
  border: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: ${({ day, currentDay }) => (isSameDay(day, currentDay) ? 'black' : 'white')};
  color: ${({ day, currentDay, disabled }) =>
    disabled ? colors.lightGrey : isSameDay(day, currentDay) ? 'white' : 'black'};
  .day-number {
    text-align: center;
  }
`;

const WeekSelector = ({
  selectedDate,
  increaseHandler,
  decreaseHandler,
  setSelectedDateHandler,
}) => (
  <WeekSelectorContainer>
    <div className="week-handler">
      <button
        type="button"
        onClick={decreaseHandler}
        className={isThisWeek(selectedDate) ? 'opacity-50 pointer-events-none' : ''}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <span className="weektitle-container">{weekRangeTitle(selectedDate)}</span>
      <button
        type="button"
        onClick={increaseHandler}
        className={isInFutureWeek(selectedDate, 2) ? 'opacity-50 pointer-events-none' : ''}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
    <div className="weekdays-container px-2 md:px-6">
      {weekRange(startOfWeek(selectedDate)).map((day) => (
        <DayContainer
          key={day}
          day={day}
          currentDay={selectedDate}
          onClick={() => setSelectedDateHandler(day)}
          disabled={isPast(day)}
        >
          <span className="text-xs sm:text-base">{dayShort(day)}</span>
          <span className="text-sm sm:text-base">{dayNumber(day)}</span>
        </DayContainer>
      ))}
    </div>
  </WeekSelectorContainer>
);

WeekSelector.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  increaseHandler: PropTypes.func.isRequired,
  decreaseHandler: PropTypes.func.isRequired,
  setSelectedDateHandler: PropTypes.func.isRequired,
};

export default WeekSelector;
