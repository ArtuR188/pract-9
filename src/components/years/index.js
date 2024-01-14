import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import './style.css';
import CalendarContext from '../../context/calendar.context';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  margin: 0 10px;
`;

const YearItem = styled.div`
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  color: ${({ isSelected }) => (isSelected ? 'green' : 'white')};
`;

const YearsComponent = () => {
  const { currentDate, setCurrentDate } = useContext(CalendarContext);
  const [year, setYear] = useState(currentDate.getFullYear());
  const halfCount = 12;

  const nextPage = () => {
    setYear((prevYear) => prevYear + 25);
  };

  const prevPage = () => {
    setYear((prevYear) => prevYear - 25);
  };

  const click = (year) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  return (
    <Wrapper className='years-wrapper content-wrapper'>
      <Header>
        <ArrowIcon icon={faArrowLeft} onClick={prevPage} />
        {year}
        <ArrowIcon icon={faArrowRight} onClick={nextPage} />
      </Header>
      {Array(halfCount)
        .fill(null)
        .map((_el, index) => {
          const showYear = year - halfCount + index;
          const isSelected = currentDate.getFullYear() === showYear;
          return (
            <YearItem
              key={showYear}
              onClick={() => click(showYear)}
              isSelected={isSelected}
            >
              {showYear}
            </YearItem>
          );
        })}
      <YearItem onClick={() => click(year)}>{year}</YearItem>
      {Array(halfCount)
        .fill(null)
        .map((_el, index) => {
          const showYear = year + index + 1;
          const isSelected = currentDate.getFullYear() === showYear;
          return (
            <YearItem
              key={showYear}
              onClick={() => click(showYear)}
              isSelected={isSelected}
            >
              {showYear}
            </YearItem>
          );
        })}
    </Wrapper>
  );
};

export default YearsComponent;
