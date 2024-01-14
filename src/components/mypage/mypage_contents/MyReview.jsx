import { useState } from "react";
import SubCategory from "./MyReview/SubCategory";
import CreateReviewSection from "./MyReview/CreateReviewSection";
import SubmittedReviewSection from "./MyReview/SubmittedReviewSection";

export default function MyReview({ userId, onContent }) {
  const [tab, setTab] = useState(1);
  const subCategories = [
    { id: 1, cateName: '작성 가능한 리뷰' },
    { id: 2, cateName: '작성한 리뷰' }
  ];
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [notWritten, setNotWritten] = useState([]);
  const [page, setPage] = useState(1);
  const [selectOption, setSelectOption] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [addModal, setAddModal] = useState(false);

  const handleTabClick = (tabId) => {
    setTab(tabId);
    setSearchTerm('');
  };

  return (
    <div className='my_review'>
      <SubCategory setSearchTerm={setSearchTerm} searchTerm={searchTerm}
        subCategories={subCategories} tab={tab} onClick={handleTabClick}
        setReviewList={setReviewList} setPage={setPage} setSelectOption={setSelectOption}
        setStartDate={setStartDate} startDate={startDate}
        setEndDate={setEndDate} endDate={endDate}
      />
      {tab === subCategories[0].id && <CreateReviewSection userId={userId}
        startDate={startDate} endDate={endDate} page={page} setPage={setPage}
        setNotWritten={setNotWritten} notWritten={notWritten} onContent={onContent}
        searchTerm={searchTerm} setAddModal={setAddModal} addModal={addModal}
      />}
      {tab === subCategories[1].id &&
        <SubmittedReviewSection searchTerm={searchTerm} userid={userId}
          setReviewList={setReviewList} reviewList={reviewList} setPage={setPage} page={page} 
          selectOption={selectOption} />}
    </div>
  );
};