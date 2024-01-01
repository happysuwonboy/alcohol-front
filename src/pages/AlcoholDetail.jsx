
import { useLocation, useParams } from 'react-router-dom';

export default function AlcoholDetail() {
    const params = useParams();
    const alcohol_id = params.alcoholid;

    return(
        <div>
            {alcohol_id}
        </div>
    );
}