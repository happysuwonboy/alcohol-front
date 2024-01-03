export default function AlcoholDesc({alcohol}) {
  
  return (
    <div className='alcohol_desc_container subsection_container'>
      <h4>상품 설명</h4>
      <figure className='alcohol_comment_wrapper'>
        <div className='alcohol_comment_img'>
          <img src={`/assets/images/alcohol_img/${alcohol.alcohol_img2}`} alt="" />
        </div>
        <figcaption className='alcohol_comment_text'>
          <h5> [{alcohol.alcohol_name}], 어떤 맛을 갖고 있나요? </h5>
          {alcohol.alcohol_comment1?.split('/').map((line, idx) =>
            <p key={`line${idx + 1}`}>
              {line}
            </p>
          )}
        </figcaption>
      </figure>
      <figure className='alcohol_comment_wrapper'>
        <div className='alcohol_comment_img'>
          <img src={`/assets/images/alcohol_img/${alcohol.alcohol_img3}`} alt="" />
        </div>
        <figcaption className='alcohol_comment_text'>
          <h5> [{alcohol.alcohol_name}], 어떤 음식과 잘 어울리나요? </h5>
          {alcohol.alcohol_comment2?.split('/').map((line, idx) =>
            <p key={`line${idx + 1}`}>
              {line}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}