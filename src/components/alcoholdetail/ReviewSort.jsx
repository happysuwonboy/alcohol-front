export default function ReviewSort({setSelectOption, setReviewList, setPage}) {
  const handleSelectChange = (e) => {
    setReviewList([]);
    setPage(1);
    setSelectOption(e.target.value);
  };

  return (
    <div className='review_sort'>
      <select name='' id='' onChange={handleSelectChange}>
        <option value='detail'>상세 리뷰 순</option>
        <option value='newest'>최신순</option>
        <option value='desc'>평점 높은 순</option>
        <option value='asc'>평점 낮은 순</option>
      </select>
    </div>
  );
};