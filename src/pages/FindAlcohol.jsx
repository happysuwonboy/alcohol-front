import Avata from '../components/findalcohol/Avata';
import FilterContainer from '../redux/FilterContainer';

export default function FindAlcohol() {
    return(
        <main className='findalcohol_section'>
            <Avata />
            <FilterContainer />
        </main>
    );
}