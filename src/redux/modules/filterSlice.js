import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 선택한 필터 체크박스 axios 요청 
export const filterData = createAsyncThunk('data/filterData', async(filterList) => {
  const result = await axios.post('http://localhost:8000/findalcohol', filterList);
  return result.data;
})

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    searchInput: [],
    searchInputPrice: [
      { isPrice : false },
      { inputPrice : 1, value : '1'},
      { inputPrice : 2, value : '100000'}
    ],
    checkedOption: [],
    sort: 'register_date',
    filterInfo : [
      { categoryId: 1,
        category: '주종',
        isSelected: false,
        option: [
          { id: 'takju', name: '탁주', checked: false }, 
          { id: 'yakcheongju', name: '약·청주',  checked: false }, 
          { id: 'gwasilju', name: '과실주',  checked: false }, 
          { id: 'jeunglyuju', name: '증류주',  checked: false }, 
          { id: 'gitajulyu', name: '기타주류',  checked: false }] 
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
    /* 체크박스 변동 */
    checkboxSeleted: (state, action) => {
      const { categoryId, category, optionId, optionName } = action.payload; // 선택한 디스패치의 액션 데이터 받아오기
      const filterCategory = state.filterInfo.find(filter => filter.categoryId === categoryId); // 해당하는 카테고리 찾아서 반환
      
      if(filterCategory) {
        // 가격의 경우 중복체크가 될 수 없어 id 6번(가격) 조건문 진행
        if(filterCategory.categoryId === 6) {
          // 가격일 경우 1) 해당 선택한 옵션이 아니면서 체크가 된 옵션 찾아 checked 반전 ( true -> false )
          const otherCheckedOption = filterCategory.option.filter(option => option.id !== optionId && option.checked);
          if(otherCheckedOption.length > 0) {
            otherCheckedOption[0].checked = !otherCheckedOption[0].checked;
          } 

          // 가격일 경우 2) 해당 선택한 체크박스 옵션 checked 반전 ( false -> true )
          const option = filterCategory.option.find(option => option.id === optionId);
          option.checked = !option.checked;

          // checkedOption 리스트 목록에 가격 카데고리 체크박스 모두 삭제 후 해당 체크박스만 추가
          // findIndex : 해당 인덱스 자리 찾기
          const findSeletedIndex = state.checkedOption.findIndex(seleted => seleted.id === optionId && seleted.categoryId === categoryId);

          if(findSeletedIndex === -1) { // 체크한 옵션 항목이 리스트에 없다면 같은 가격 카테고리 옵션 제외 후 추가
            state.checkedOption = state.checkedOption.filter(seleted => seleted.categoryId !== 6);
            state.checkedOption.push({ categoryId : categoryId, category: category, id: optionId, name: optionName });
          } else {
            state.checkedOption.splice(findSeletedIndex, 1); // 리스트에 존재한다면 삭제!
          }
        
        } else {
          // 가격 아닐 경우 : 현재 클릭한 체크박스를 옵션 찾아 checked 반전
          const option = filterCategory.option.find(option => option.id === optionId);
          option.checked = !option.checked;

          // checkedOption 리스트 목록에 선택한 체크박스 옵션 optionId가 없으면 추가 / 있으면 삭제
          if(!state.checkedOption.find(seleted => seleted.id === optionId)) {
            state.checkedOption.push({ categoryId : categoryId, category: category, id: optionId, name: optionName });
          } else {
            state.checkedOption = state.checkedOption.filter(seleted => seleted.id !== optionId);
          }
        }

        // 선택한 체크박스 목록에 해당하는 카테고리 id가 있으면 해당하는 카테고리 담아 있는 객체 isSelected 값을 true
        const categorySeleted = state.checkedOption.find(seleted => seleted.categoryId === categoryId);
        if(categorySeleted) {
          filterCategory.isSelected = true;
        } else {
          filterCategory.isSelected = false;
        }
      }
    },

    /* remove x 버튼 클릭 : 리스트에서 삭제 */
    optionRemove: (state, action) => {
      const { categoryId, optionId } = action.payload;

      // 가격 검색어와 가격 체크박스의 categoryId가 동일하기 때문에 
      // 가격 검색이 없는 경우에만 해당하는 카테고리 option의 값을 변경
      const filterCategory = state.filterInfo.find(filter => filter.categoryId === categoryId && !state.searchInputPrice[0].isPrice);
      if(filterCategory) {
        const option = filterCategory.option.find(option => option.id === optionId);
        option.checked = !option.checked;

        // 카테고리 옵션에서 선택된 값이 하나라도 있으면 true ( 마지막 하나를 지우는 것일 수도 있어서 체크 필요 )
        filterCategory.isSelected = filterCategory.option.some(option => option.checked); 
        state.checkedOption = state.checkedOption.filter(seleted => seleted.id !== optionId); // 리스트에서 삭제
      } else { // 가격 검색도 리스트에 담기기 때문에 가격 검색일 경우에도 리스트에서 삭제
        state.checkedOption = state.checkedOption.filter(seleted => seleted.id !== optionId);
      }
    },

    /* 초기화 리셋 클릭 */
    optionReset: (state, action) => {
      const optionResetId = state.checkedOption.map(seleted => seleted.id);

      state.filterInfo.forEach(filter => {
        filter.isSelected = false;
        filter.option.forEach(option => {
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
    },

    /* 검색 input search change */
    changeInput: (state, action) => {
      state.searchInput = action.payload;
    },

    /* 가격 input search change */
    changeInputPrice: (state, action) => {
      const searchInputPriceInfo  = action.payload;
      const { categoryId, category, id } = searchInputPriceInfo[2];
      const inputValue1 = Number(searchInputPriceInfo[0].value);
      const inputValue2 = Number(searchInputPriceInfo[1].value);


      state.filterInfo[5].isSelected = false; // 가격 카테고리 체크박스 중 하나라도 선택 여부
      state.filterInfo[5].option.map(option => option.checked = false); // 가격 카테고리 체크박스의 클릭 여부

      // 선택 리스트에 해당하는 인덱스 번호 찾기
      const findSeletedIndex = state.checkedOption.findIndex(seleted => seleted.id === id && seleted.categoryId === categoryId);
      if (findSeletedIndex === -1) { // 선택 리스트에 없다면 가격 체크박스는 없애고 가격이 아닌 체크박스 담기
        state.checkedOption = state.checkedOption.filter(seleted => seleted.categoryId !== 6);
        state.checkedOption.push({ categoryId: categoryId, category: category, optionId: id, name : `${inputValue1.toLocaleString()}원 ~ ${inputValue2.toLocaleString()}원` });
      } else { // 선택 리스트에 있다면 해당하는 값을 삭제하고 추가 ( 클릭 시 업데이트 되는 것으로 기존 것 삭제하고 새 입력값으로 )
        state.checkedOption.splice(findSeletedIndex, 1);
        state.checkedOption.push({ categoryId: categoryId, category: category, optionId: id, name : `${inputValue1.toLocaleString()}원 ~ ${inputValue2.toLocaleString()}원` });
      }

      // 입력한 가격 업데이트
      state.searchInputPrice[0].isPrice = true;
      state.searchInputPrice[1].value = searchInputPriceInfo[0].value;
      state.searchInputPrice[2].value = searchInputPriceInfo[1].value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload; // result.data : products로 넣기 ( axios 결과 )
      })
      .addCase(filterData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
})

export const { checkboxSeleted, optionRemove, optionReset, changeSort, changeInput, changeInputPrice } = filterSlice.actions;
export default filterSlice.reducer;