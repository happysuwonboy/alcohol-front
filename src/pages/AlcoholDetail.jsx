
import { useLocation, useParams } from 'react-router-dom';
import StickyOrderMenu from './../components/alcoholdetail/StickyOrderMenu';
import AlcoholCard from './../components/alcoholdetail/AlcoholCard';
import FlavorLevel from '../components/alcoholdetail/FlavorLevel';


export default function AlcoholDetail() {
    const params = useParams();
    const alcohol_id = params.alcoholid;

    return(
        <main className='alcohol_detail'>
            <div className='alcohol_detail_container'>
                <AlcoholCard/>
                <div className='alcohol_foods_container'>
                    <h4>어울리는 안주</h4>
                    <div className='alcohol_food_imgs'>
                        <figure>
                            <div className='food_img'>
                                <img src="/assets/images/food_img/카프레제.png" alt="" />
                            </div>
                            <figcaption>
                                카프레제
                            </figcaption>
                        </figure>
                        <figure>
                            <div className='food_img'>
                                <img src="/assets/images/food_img/카프레제.png" alt="" />
                            </div>
                            <figcaption>
                                카프레제
                            </figcaption>
                        </figure>
                        <figure>
                            <div className='food_img'>
                                <img src="/assets/images/food_img/카프레제.png" alt="" />
                            </div>
                            <figcaption>
                                카프레제
                            </figcaption>
                        </figure>
                    </div>
                </div>
                <div className='alcohol_flavor_container'>
                    <h4>향미그래프</h4>
                    <div>
                        <FlavorLevel flovorType={'단맛'}/>
                        <FlavorLevel flovorType={'산미'}/>
                    </div>
                    <div>
                        <FlavorLevel flovorType={'탄산'}/>
                        <FlavorLevel flovorType={'바디'}/>
                    </div>
                </div>
            </div>
            <StickyOrderMenu/>
        </main>
    );
}