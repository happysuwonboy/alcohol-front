import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';

export default function NoticeDate(props) {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange, setStartDate, setEndDate } = props;

  const years = range(2019, getYear(new Date()) + 1, 1);
  const months = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  const handleStartReset = () => {
    setStartDate(null);
  };

  const handleEndReset = () => {
    setEndDate(null);
  };

  return (
    <div className='date_picker'>
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
            <div
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {'<'}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}년
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}월
                  </option>
                ))}
              </select>
              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {'>'}
              </button>
            </div>
        )}
        locale={ko}
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText='시작일'
        minDate={new Date('2019-12-30')}
        maxDate={new Date()}
        dateFormat='yyyy-MM-dd'
      />
      {startDate ? <button type='button' onClick={handleStartReset}>x</button> : null}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {'<'}
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={months[getMonth(date)]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {'>'}
            </button>
          </div>
        )}
        locale={ko}
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        placeholderText='종료일'
        minDate={startDate}
        maxDate={new Date()}
        dateFormat='yyyy-MM-dd'
      />
      {endDate ? <button type='button' onClick={handleEndReset}>x</button> : null}
    </div>
  );
};