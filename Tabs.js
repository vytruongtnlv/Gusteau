import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './src/app/views/Home';
import OrderView from './src/app/views/OrderView';
import AdminView from './src/app/views/AdminView';

export default createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  OrderView: {
    screen: OrderView,
    navigationOptions: {
      tabBarVisible: false,
      hiddenTabs: true
    }
  },
  AdminView: {
    screen: AdminView
  }
}, {
  order: ["Home", "AdminView"]
})