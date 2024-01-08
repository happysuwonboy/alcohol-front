import { useState } from "react";
import SubCategory from "./MyReview/SubCategory";
import CreateReviewSection from "./MyReview/CreateReviewSection";
import SubmittedReviewSection from "./MyReview/SubmittedReviewSection";

export default function MyReview() {
    const [tab, setTab] = useState(1);
    const subCategories = [
        { id: 1, cateName: '작성 가능한 리뷰' },
        { id: 2, cateName: '작성한 리뷰' }
    ];

    const handleTabClick = (tabId) => {
        setTab(tabId)
    };

    return (
        <div className='my_review'>
            <SubCategory subCategories={subCategories} tab={tab} onClick={handleTabClick} />
            {tab === subCategories[0].id && <CreateReviewSection />}
            {tab === subCategories[1].id && <SubmittedReviewSection />}
        </div>
    );
};