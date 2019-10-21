import deepmerge from 'deepmerge';

const initialState = {
  categoryList: {},
  category: ""
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'RETRIEVE_CATE_LIST':
      return {
        ...state,
        categoryList: deepmerge(state.categoryList, action.payload)
      };
    case 'CURRENT_CATEGORY':
      return {
        ...state,
        category: action.payload.id
      }
    default:
      return state
  }

}