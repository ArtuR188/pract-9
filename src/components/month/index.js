import React, { useContext } from 'react';
import styled from 'styled-components';
import { MONTHS } from '../shared/months';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const Wrapper = styled.div`
  padding: 5px;
  padding-right: 25px;
  border-radius: 2.5px;
  background-color: whitesmoke;
  color: black;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  right: 5px;
`;

const DayItem = styled.div`
  --day-col-start: ${props => props.dayOfWeek};
  cursor: pointer;
`;

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

const MonthComponent = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysCount = getDaysInMonth(currentYear, currentMonth);

  const click = (day) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(day);
      return newDate;
    });
  };

  return (
    <Wrapper className='content-wrapper month-wrapper'>
      <div className='header'>{MONTHS[currentMonth]}</div>
      {WEEK_DAYS.map(dayName => (
        <div key={dayName} className='day-name'>{dayName}</div>
      ))}
      {Array(daysCount).fill(null).map((el, i) => {
        const date = new Date(currentDate);
        date.setDate(i + 1);
        const dayOfWeek = date.getDay();
        return (
          <DayItem
            key={i + 1}
            onClick={() => click(i + 1)}
            dayOfWeek={dayOfWeek}
            className='content-item day'
          >{i + 1}</DayItem>
        );
      })}
    </Wrapper>
  );
};

export default MonthComponent;
