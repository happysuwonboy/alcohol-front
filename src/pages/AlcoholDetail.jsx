
import { useParams } from 'react-router-dom';
import StickyOrderMenu from './../components/alcoholdetail/StickyOrderMenu';
import AlcoholProductCard from '../components/alcoholdetail/AlcoholProductCard';
import AlcoholFood from '../components/alcoholdetail/AlcoholFood';
import AlcoholFlavor from '../components/alcoholdetail/AlcoholFlavor';
import AlcoholDesc from './../components/alcoholdetail/AlcoholDesc';
import AlcoholRecommend from './../components/alcoholdetail/AlcoholRecommend';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../constants/baseurl';


export default function AlcoholDetail() {
    const params = useParams();
    const [alcohol, setAlcohol] = useState({})

    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASE_URL}/alcoholdetail/${params.alcoholid}`
        })
        .then(res => setAlcohol(res.data))
        .catch(err => console.log(err))
    }, [params.alcoholid])

    return (
        <main className='alcohol_detail'>
            <div className='alcohol_detail_container'>
                <AlcoholProductCard alcohol={alcohol} />
                <AlcoholFood foods={alcohol.food} />
                <AlcoholFlavor flavorLevel={{
                    sweet: alcohol.flavor_sweet,
                    sour: alcohol.flavor_sour,
                    soda: alcohol.flavor_soda,
                    body: alcohol.flavor_body
                }} />
                <AlcoholDesc alcohol={alcohol} />
                <AlcoholRecommend alcohol_id={alcohol.alcohol_id} alcohol_type={alcohol.alcohol_type} />
            </div>
            <StickyOrderMenu />
        </main>
    );
}