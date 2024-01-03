import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiStarFill } from 'react-icons/pi';
import FilterSortCommon from './FilterSortCommon';

export default function ShowAlcohol(props) {
  const { pad, isFilterClick, setIsFilterClick } = props;
  const { products } = useSelector(state => state.filterSlice);
  console.log(products);

  return(
    <div className='product_container'>
    { !pad && 
      <FilterSortCommon 
        pad ={pad} 
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick} />}
      <div className='product_wrap'>
      { products.map(list => (
        <div className='product_box'>
          <div className='img_box'>
            <Link to={`/findalcohol/${list.alcohol_id}`}>
              <img src={`/assets/images/alcohol_img/${list.alcohol_img1}`} alt={`${list.alcohol_name} 이미지`} />
            </Link>
          </div>
          <div className='info_box'>
            <p className='name'>{list.alcohol_name}</p>
            <div className='price_box'>
            { list.dc_percent
            ? <p className='dc'>{list.alcohol_price?.toLocaleString()}<span>원</span></p>
            : ''
            }
              <div className='dc_info'>
            { list.dc_percent ?
              <>
                <span className='percent'>{list.dc_percent}%</span>
                <p className='dc_price'>{list.dc_price.toLocaleString()}<span>원</span></p>
              </>
                : <p className='price'>{list.alcohol_price.toLocaleString()}<span>원</span></p>
              }
              </div>
            </div>
            <div className='review_box'>
              <PiStarFill />
              { list.review_star 
                ? <p className='review_star'>{list.review_star}<span>(총 리뷰수)</span></p> 
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