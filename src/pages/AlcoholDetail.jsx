
import { useLocation, useParams } from 'react-router-dom';
import StickyOrderMenu from './../components/alcoholdetail/StickyOrderMenu';
import AlcoholCard from './../components/alcoholdetail/AlcoholCard';


export default function AlcoholDetail() {
    const params = useParams();
    const alcohol_id = params.alcoholid;

    return(
        <main className='alcohol_detail'>
            <div className='alcohol_detail_container'>
                <AlcoholCard/>
                <div className='alcohol_foods_container'>
                    <h4>어울리는 안주</h4>
                    <div className='alcohol_foods_imgs'>
                        
                    </div>
                </div>
            </div>
            <StickyOrderMenu/>
        </main>
    );
}