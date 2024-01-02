
import { useParams } from 'react-router-dom';
import StickyOrderMenu from './../components/alcoholdetail/StickyOrderMenu';
import AlcoholCard from './../components/alcoholdetail/AlcoholCard';
import FlavorLevel from '../components/alcoholdetail/FlavorLevel';
import useAlcoholInfo from '../hooks/useAlcoholInfo';


export default function AlcoholDetail() {
    const params = useParams();
    const alcohol = useAlcoholInfo(params.alcoholid);

    return (
        <main className='alcohol_detail'>
            <div className='alcohol_detail_container'>
                <AlcoholCard alcohol={alcohol} />
                <div className='alcohol_foods_container'>
                    <h4>어울리는 안주</h4>
                    <div className='alcohol_food_imgs'>
                        {alcohol.food?.split('/').map(food =>
                            <figure>
                                <div className='food_img'>
                                    <img src={`/assets/images/food_img/${food}.png`} alt="" />
                                </div>
                                <figcaption>
                                    {food}
                                </figcaption>
                            </figure>
                        )}
                    </div>
                </div>
                <div className='alcohol_flavor_container'>
                    <h4>향미그래프</h4>
                    <div>
                        <FlavorLevel level={alcohol.flavor_sweet} flovorType={'단맛'} />
                        <FlavorLevel level={alcohol.flavor_sour} flovorType={'산미'} />
                    </div>
                    <div>
                        <FlavorLevel level={alcohol.flavor_soda} flovorType={'탄산'} />
                        <FlavorLevel level={alcohol.flavor_body} flovorType={'바디'} />
                    </div>
                </div>
            </div>
            <StickyOrderMenu />
        </main>
    );
}