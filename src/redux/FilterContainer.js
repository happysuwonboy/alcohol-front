import { useDispatch, useSelector } from 'react-redux';
import FilterWrap from '../components/findalcohol/FilterWrap';
import { checkboxSeleted, optionRemove, optionReset } from '../redux/filter_modules/filterSlice';

export default function FilterContainer() {
  const dispatch = useDispatch();
  const {filterInfo, checkedOption} = useSelector(state => state.filtersSlice);
  console.log(checkedOption);

  return (
    <>
      <FilterWrap 
        filterInfo={filterInfo}
        checkedOption={checkedOption}
        dispatch={dispatch}
        checkboxSeleted={checkboxSeleted}
        optionRemove={optionRemove}
        optionReset={optionReset}
          />
      {/* showAlcohol 컴포넌트 추가 */}
    </>
  );
}