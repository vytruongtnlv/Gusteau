import deepmerge from 'deepmerge';

const initialState = {
  name: '',
  img: '',
  idCategory: '',
  price: '',
  currentFood: {}
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_FOOD':
      return { ...state, currentFood: action.payload }
    case 'FOOD_INPUT_CHANGE':
      return { ...state, [action.payload.field]: action.payload.value };

    default:
      return state
  }

}