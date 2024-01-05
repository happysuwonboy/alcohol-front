import getImgUrl from '../../util/getImgUrl';

export default function AlcoholFood({foods}) {
  return (
    <div className='alcohol_foods_container subsection_container'>
      <h4>어울리는 안주</h4>
      <div className='alcohol_food_imgs'>
        {foods?.split('/').map(food =>
          <figure key={food}>
            <div className='food_img'>
              <img src={getImgUrl.food(`${food}.png`)} alt="" />
            </div>
            <figcaption>
              {food}
            </figcaption>
          </figure>
        )}
      </div>
    </div>
  );

}