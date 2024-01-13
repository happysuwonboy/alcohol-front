import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeInput, optionReset } from '../redux/modules/filterSlice';

export default function useHeaderSearch(setShowSearch) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchPress = (e) => {
    e.preventDefault();
    const searchInput = e.target.value.trim();
    if( searchInput ) {
      setShowSearch && setShowSearch(false);
        dispatch(optionReset());
        dispatch(changeInput(e.target.value));
        navigate('findalcohol');
        !setShowSearch && (document.querySelector('#header_search').value = '')
    } else {
        alert('검색어를 입력 후 enter를 눌러주세요');
    }
  };

  return handleSearchPress;
}

