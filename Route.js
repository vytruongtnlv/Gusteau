import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './src/app/views/Login';
import Home from './src/app/views/Home';
import OrderView from './src/app/views/OrderView';
import TableFoodComponent from './src/app/components/TableFoodComponent';
import TableListView from './src/app/views/TableListView';
import FoodInputForm from './src/app/views/FoodInputForm';
import Tabs from './Tabs';
import OrderTab from './OrderTab';
import AdminTabs from './AdminTabs';
const stack = createStackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home
  },
  OrderView: {
    screen: OrderView
  },
  FoodInputForm: {
    screen: FoodInputForm
  },
  Tabs: {
    screen: Tabs
  },
  AdminTabs: {
    screen: AdminTabs
  },
  OrderTab: {
    screen: OrderTab
  }
}, {
  headerMode: 'none'
})

export default createAppContainer(stack)