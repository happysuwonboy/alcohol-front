import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 선택한 필터 체크박스 axios 요청 
export const filterData = createAsyncThunk('data/filterData', async(filterList) => {
  console.log(filterList);
  const result = await axios.post('http://localhost:8000/findalcohol', filterList);
  return result.data
})

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    checkedOption: [],
    sort: 'register_date',
    filterInfo : [
      { categoryId: 1,
        category: '주종',
        isSelected: false,
        option: [
          { id: 'takju', name: '탁주', checked: false }, 
          { id: 'yakcheongju', name: '약﹒청주',  checked: false }, 
          { id: 'gwasilju', name: '과실주',  checked: false }, 
          { id: 'jeunglyuju', name: '증류주',  checked: false }, 
          { id:'gitajulyu', name: '기타주류',  checked: false }] 
      },
      { categoryId: 2,
        category: '도수',
        isSelected: false,
        option: [
          { id: 'abv_1', name: '0% - 10%',  checked: false }, 
          { id: 'abv_2', name: '10% - 20%',  checked: false }, 
          { id: 'abv_3', name: '20% - 30%',  checked: false }, 
          { id: 'abv_4', name: '30% 이상',  checked: false }] 
      },
      { categoryId: 3,
        category: '단맛',
        isSelected: false,
        option: [
          { id: 'sweet_1', name: '약한',  checked: false }, 
          { id: 'sweet_2', name: '중간',  checked: false }, 
          { id: 'sweet_3', name: '강한',  checked: false }] 
      },
      { categoryId: 4,
        category: '신맛',
        isSelected: false,
        option: [
          { id: 'sour_1', name: '약한',  checked: false }, 
          { id: 'sour_2', name: '중간',  checked: false }, 
          { id: 'sour_3', name: '강한',  checked: false }] 
      },
      { categoryId: 5,
        category: '탄산',
        isSelected: false,
        option: [
          { id: 'soda_1', name: '약한',  checked: false }, 
          { id: 'soda_2', name: '중간',  checked: false }, 
          { id: 'soda_3', name: '강한',  checked: false }] 
      },
      { categoryId: 6,
        category: '가격',
        isSelected: false,
        option: [
          { id: 'price_1', name: '~ 1만원',  checked: false }, 
          { id: 'price_2', name: '1만원 ~ 3만원',  checked: false }, 
          { id: 'price_3', name: '3만원 ~ 5만원',  checked: false }, 
          { id: 'price_4', name: '5만원 ~ 10만원',  checked: false }, 
          { id: 'price_5', name: '10만원 이상',  checked: false }] 
      }
    ],
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    /* 체크박스 변동시 filterData 요청 */
    checkboxSeleted: (state, action) => {
      // 선택한 디스패치의 액션 데이터 받아오기
      const { categoryId, category, optionId, optionName } = action.payload;

      // 해당하는 카테고리 찾아서 반환
      const filterCategory = state.filterInfo.find(filter => filter.categoryId === categoryId);
      
      if(filterCategory) {
        // 가격의 경우 중복체크가 될 수 없어 id 6번(가격) 조건문 진행
        if(filterCategory.categoryId === 6) {
          // 가격일 경우 1) 해당 선택한 옵션이 아니면서 체크가 된 옵션 찾아 checked 반전 ( true -> false )
          const otherCheckedOption = filterCategory.option.filter(option => option.id !== optionId && option.checked);
          if(otherCheckedOption.length > 0) {
            otherCheckedOption[0].checked = !otherCheckedOption[0].checked ;
          } 
          // 가격일 경우 2) 해당 선택한 체크박스 옵션 checked 반전 ( false -> true )
          const option = filterCategory.option.find(option => option.id === optionId);
          option.checked = !option.checked;

          // checkedOption 리스트 목록에 가격 카데고리 체크박스 모두 삭제 후 해당 체크박스만 추가
          state.checkedOption = state.checkedOption.filter(option => option.categoryId !== 6);
          state.checkedOption.push({ categoryId : categoryId, category: category, id: optionId, name: optionName });
        } else {
          // 가격 아닐 경우 : 현재 클릭한 체크박스를 옵션 찾아 checked 반전
          const option = filterCategory.option.find(option => option.id === optionId);
          option.checked = !option.checked;

          // checkedOption 리스트 목록에 선택한 체크박스 옵션 optionId가 없으면 추가 / 있으면 삭제
          if(!state.checkedOption.find(option => option.id === optionId)) {
            state.checkedOption.push({ categoryId : categoryId, category: category, id: optionId, name: optionName });
          } else {
            state.checkedOption = state.checkedOption.filter(option => option.id !== optionId);
          }
        }
      }
      // filterData({데이터 넣어줄 것}) 
      // dispatch(filterData({ 데이터 다 보내야함 }))
    },

    /* remove x 버튼 누를 시 리스트에서 삭제 및 filterData 요청 */
    optionRemove: (state, action) => {
      const { categoryId, optionId } = action.payload;

      const filterCategory = state.filterInfo.find(filter => filter.categoryId === categoryId);
      if(filterCategory) {
        const option = filterCategory.option.find(option => option.id === optionId);
        option.checked = !option.checked;
        state.checkedOption = state.checkedOption.filter(option => option.id !== optionId);
      }
    },

    /* 초기화 리셋 누를 시 filterData 요청 */
    optionReset: (state, action) => {
      const optionResetId = state.checkedOption.map(list => list.id);

      state.filterInfo.map(filter => {
        filter.option.map(option => {
          if (optionResetId.includes(option.id)) {
            option.checked = !option.checked;
          }
        })
      });
      state.checkedOption = [];
    },

    /* sort change */
    changeSort: (state, action) => {
      state.sort = action.payload;
    }
  }
})

export const { checkboxSeleted, optionRemove, optionReset, changeSort } = filtersSlice.actions;
export default filtersSlice.reducer;