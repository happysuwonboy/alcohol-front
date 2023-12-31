import FilterSortCommon from './FilterSortCommon';

export default function ShowAlcohol(props) {
  return(
    <div>
      { !props.pad && 
          <FilterSortCommon 
            sort={props.sort}
            pad ={props.pad} 
            changeSort={props.changeSort} 
            dispatch={props.dispatch}
            isFilterClick={props.isFilterClick}
            setIsFilterClick={props.setIsFilterClick} />}
    </div>
  );
}