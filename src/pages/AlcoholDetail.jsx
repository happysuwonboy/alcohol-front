
import { useNavigate, useParams } from 'react-router-dom';
import StickyOrderMenu from './../components/alcoholdetail/StickyOrderMenu';
import FixedOrderMenu from '../components/alcoholdetail/FixedOrderMenu';
import AlcoholProductCard from '../components/alcoholdetail/AlcoholProductCard';
import AlcoholFood from '../components/alcoholdetail/AlcoholFood';
import AlcoholFlavor from '../components/alcoholdetail/AlcoholFlavor';
import AlcoholDesc from './../components/alcoholdetail/AlcoholDesc';
import AlcoholRecommend from './../components/alcoholdetail/AlcoholRecommend';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../constants/baseurl';


export default function AlcoholDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [alcohol, setAlcohol] = useState({})
    let [qty, setQty] = useState(1);

    useEffect(()=>{
        window.scrollTo({top : 0})
    },[params.alcohol_id])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${BASE_URL}/alcoholdetail/${params.alcoholid}`
        })
        .then(res => 
            setAlcohol(res.data)
        )
        .catch(err => {
            console.log(err)
            alert('상품 정보가 없습니다.')
            navigate('/findalcohol')
        })
    }, [params.alcoholid])

    return (
        <>
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
                <StickyOrderMenu alcohol={alcohol} qty={qty} setQty={setQty}/> 
            </main>
                <FixedOrderMenu alcohol={alcohol} qty={qty} setQty={setQty}/> 
        </>
    );
}