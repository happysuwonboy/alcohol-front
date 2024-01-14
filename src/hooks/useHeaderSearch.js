import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeInput, optionReset } from '../redux/modules/filterSlice';

export default function useHeaderSearch(setShowSearch) {
  const [ searchInput, setSearchInput ] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    const searchInput = e.target.value;
    if(searchInput.trim() || searchInput === '') {
      setSearchInput(searchInput);
    } else {
        alert('검색어를 입력 후 enter를 눌러주세요');
    }
  };

  const handleSearchPress = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      setShowSearch && setShowSearch(false);
      dispatch(optionReset());
      dispatch(changeInput(searchInput));
      navigate('/findalcohol');
      !setShowSearch && (document.querySelector('#header_search').value = '');
    }
  };

  return [ handleSearchChange, handleSearchPress ];
}

