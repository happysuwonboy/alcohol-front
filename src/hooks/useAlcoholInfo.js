import axios from 'axios';
import { useEffect, useState } from 'react'
import BASE_URL from './../constants/baseurl';


const useAlcoholInfo = alcohol_id => {
 
  const [alcoholInfo, setAlcoholInfo] = useState({})
  
  useEffect(() => {
    axios({
      method: 'get',
      url: `${BASE_URL}/alcoholdetail/${alcohol_id}`
    })
      .then(res => setAlcoholInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  return alcoholInfo
}

export default useAlcoholInfo