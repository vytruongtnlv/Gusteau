import deepmerge from 'deepmerge';

const initialState = {
  name: '',
  img: '',
  idCategory: '',
  price: '',
  foodList: {},
  priceList: {},
  currentFood: ""
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_FOOD':
      return { ...state, currentFood: action.payload.id }
    case 'FOOD_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'RETRIEVE_FOOD_LIST':
      return {
        ...state,
        foodList: deepmerge(state.foodList, action.payload)
      };
    case 'RETRIEVE_PRICE_LIST':
      return { ...state, priceList: action.payload };
    default:
      return state
  }

}