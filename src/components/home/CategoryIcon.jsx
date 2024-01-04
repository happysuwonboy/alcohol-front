import { Link } from 'react-router-dom';

export default function CategoryIcon() {
  const iconsData = [
    { img: 'takju', name: '탁주' },
    { img: 'yakcheongju', name: '약﹒청주' },
    { img: 'gwasilju', name: '과실주' },
    { img: 'jeunglyuju', name: '증류주' },
    { img: 'gitajulyu', name: '기타주류' }
  ];

  return (
    <div className='category_icon'>
      {iconsData.map(icon => (
        <Link key={icon.img}>
          <figcaption>
            <img src={`/assets/images/home/${icon.img}.png`} alt={icon.img} />
          </figcaption>
          <p>{icon.name}</p>
        </Link>
      ))
      }
    </div>
  );
};