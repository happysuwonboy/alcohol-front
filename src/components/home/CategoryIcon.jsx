import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { optionReset, clickHomeIcon } from '../../redux/modules/filterSlice';

export default function CategoryIcon() {
  const dispatch = useDispatch();
  const iconsData = [
    { img: 'takju', name: '탁주' },
    { img: 'yakcheongju', name: '약﹒청주' },
    { img: 'gwasilju', name: '과실주' },
    { img: 'jeunglyuju', name: '증류주' },
    { img: 'gitajulyu', name: '기타주류' }
  ];

  const handleClickIcon = (optionId, optionName) => {
    dispatch(optionReset());
    dispatch(clickHomeIcon({optionId, optionName}));
  };

  return (
    <div className='category_icon'>
      {iconsData.map(icon => (
        <Link to='/findalcohol' key={icon.img}>
          <figcaption onClick={() => handleClickIcon(icon.img , icon.name)}>
            <img src={`/assets/images/home/${icon.img}.png`} alt={icon.img} />
          </figcaption>
          <p>{icon.name}</p>
        </Link>
      ))
      }
    </div>
  );
};