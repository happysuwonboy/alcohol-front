export default function NoReview({ment}) {
  return (
    <div className='no_review'>
    <figcaption><img src='/assets/images/etc/bubble-no-star.png' alt='no review' /></figcaption>
    <p>{ment} 리뷰가 없어요 :(</p>
    <p>상품을 주문하고 리뷰를 작성해 보세요</p>
  </div>
  );
};