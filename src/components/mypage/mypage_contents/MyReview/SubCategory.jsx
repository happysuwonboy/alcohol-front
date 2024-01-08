export default function SubCategory(props) {
  const { subCategories, tab, onClick } = props;

  return (
    <ul className='subcategory'>
      {subCategories.map((category) =>
        <li key={category.id}>
          <button type="button" className={tab === category.id ? 'active' : ''}
            onClick={() => onClick(category.id)}>{category.cateName}</button>
        </li>)}
    </ul>
  );
};