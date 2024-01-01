import FilterSortCommon from './FilterSortCommon';
import { PiStarFill } from 'react-icons/pi';

export default function ShowAlcohol(props) {
  const { products, dispatch, sort, changeSort, pad, isFilterClick, setIsFilterClick  } = props;

  return(
    <div className='product_container'>
    { !pad && 
      <FilterSortCommon 
        sort={sort}
        pad ={pad} 
        changeSort={changeSort} 
        dispatch={dispatch}
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick} />}
      <div className='product_wrap'>
      { products.map(list => (
        <div className='product_box'>
          <div className='img_box'>
            <img src={`/assets/images/alcohol_img/${list.alcohol_img1}`} alt={`${list.alcohol_name} 이미지`} />
          </div>
          <div className='info_box'>
            <p className='name'>{list.alcohol_name}</p>
            <p className='price'>{list.alcohol_price.toLocaleString()}<span>원</span></p>
            <div className='review_box'>
              <PiStarFill />
              { list.review_star 
                ? <p className='review_star'>{list.review_star}</p> 
                : <p className='text'>아직 등록된 리뷰가 없어요</p>
              }
            </div>
            <p className='tag'>{`# ${list.hashtag}`}</p>
          </div>
        </div>
      ))
      }
      </div>
    </div>
  );
}