import useHeaderSearch from '../../hooks/useHeaderSearch';

export default function HeaderMobileSearch ({setShowSearch}) {
  const [ handleChangeSearch, handleSearchPress ] = useHeaderSearch(setShowSearch);

  return (
    <div className='bg_search'>
      <div className='search_box'>
        <label htmlFor='mobile_search' className='label_hidden'></label>
        <input type='text' id='mobile_search' placeholder='무엇을 찾고 계신가요?' onChange={handleChangeSearch} onKeyPress={handleSearchPress}/>
      </div>
    </div>
  )
}