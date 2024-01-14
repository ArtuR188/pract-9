import React, { useContext } from 'react';
import styled from 'styled-components';
import './style.css';
import CalendarContext from '../../context/calendar.context';
import { MONTHS } from '../shared/months';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  font-weight: bold;
`;

const MonthItem = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: ${({ isSelected }) => (isSelected ? 'green' : 'white')};
`;

const MonthsComponent = () => {
  const { setCurrentDate, currentDate, datesWithEvents } = useContext(CalendarContext);

  const click = (index) => {
    setCurrentDate((preCurrentDate) => {
      const newDate = new Date(preCurrentDate);
      newDate.setMonth(index);
      return newDate;
    });
  };

  return (
    <Wrapper className='months-wrapper content-wrapper'>
      <Header>{MONTHS[currentDate.getMonth()]}</Header>
      {MONTHS.map((month, i) => (
        <MonthItem
          key={month}
          onClick={() => click(i)}
          isSelected={datesWithEvents.some(date => date.year === currentDate.getFullYear() && date.month === i + 1)}
        >
          {month}
        </MonthItem>
      ))}
    </Wrapper>
  );
};

export default MonthsComponent;
