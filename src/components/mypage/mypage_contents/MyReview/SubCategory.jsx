import ReviewSort from '../../../alcoholdetail/ReviewSort';
import ReviewDate from './ReviewDate';

export default function SubCategory(props) {
  const { subCategories, tab, onClick, setSearchTerm, searchTerm, 
    setReviewList, setPage, setSelectOption, setStartDate, startDate,
    setEndDate, endDate  } = props;

  const handleInputChange = (e) => {
    setPage(1);
    setSearchTerm(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <ul className='subcategory'>
      <div className='review_tab'>
        {subCategories.map((category) =>
          <li key={category.id}>
            <button type="button" className={tab === category.id ? 'active' : ''}
              onClick={() => onClick(category.id)}>{category.cateName}</button>
          </li>
        )}
      </div>
      <div className='search_tab'>
        <div className='search_bar'>
          <input type='text'
            placeholder='술 이름을 입력해 주세요!'
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
        {
          tab === 1 ? <ReviewDate
          startDate={startDate} endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          setStartDate={setStartDate} setEndDate={setEndDate}
          />: <ReviewSort setReviewList={setReviewList}
          setPage={setPage} setSelectOption={setSelectOption} />
        }
      </div>
    </ul>
  );
};