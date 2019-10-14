import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/app/reducers';
const store = createStore(reducers, {}, applyMiddleware(thunk));


store.subscribe(() => {
})

export default store;