import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function CategoryTitle({ title, subtitle, png, add }) {
  return (
    <div className='category_title'>
      <div>
        <figcaption>
          <img src={`/assets/images/home/${png}`} alt='CategoryTitleIcon' />
        </figcaption>
        <div>
          <p>{title}</p>
          <p>{subtitle}</p>
        </div>
      </div>
      {add && <Link to='/findalcohol'>더보기 <IoIosArrowForward /></Link>}
    </div>
  );
};