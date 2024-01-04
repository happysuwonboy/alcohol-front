import { PiStarFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PagiNation from 'react-js-pagination';
import { clickPageNation } from '../../redux/modules/filterSlice';
import FilterSortCommon from './FilterSortCommon';


export default function ShowAlcohol(props) {
  const { pad, isFilterClick, setIsFilterClick } = props;
  const { products, currentPage } = useSelector(state => state.filterSlice);
  const dispatch = useDispatch();
  console.log(products);

  const handleChangePage = (page) => {
    dispatch(clickPageNation(page));
  }

  return(
    <div className='product_container'>
    { !pad && 
      <FilterSortCommon 
        pad ={pad} 
        isFilterClick={isFilterClick}
        setIsFilterClick={setIsFilterClick} />}
      <div className='product_wrap'>
      { products.map(list => (
        <div className='product_box' key={list.alcohol_id}>
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
              { list.review_cnt 
                ? <p className='review_star'>{list.avg_star}<span>{`(${list.review_cnt})`}</span></p> 
                : <p className='text'>첫 리뷰를 기다리고 있어요!</p>
              }
            </div>
            <p className='tag'>{`# ${list.hashtag}`}</p>
          </div>
        </div>
      ))
      }
      </div>
      <PagiNation
        activePage={currentPage}
        itemsCountPerPage={12}
        totalItemsCount={products.length > 0 ? products[0].total_cnt : 0}
        pageRangeDisplayed={5}
        onChange={handleChangePage}
        prevPageText='<'
        nextPageText='>'
      />
    </div>
  );
}