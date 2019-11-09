import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodListView from './src/app/views/FoodListView';
import OrderInfoView from './src/app/views/OrderInfoView';
import { appStyle } from './src/app/style';

export default createBottomTabNavigator({
  FoodList: {
    screen: FoodListView,
  },
  Order: {
    screen: OrderInfoView,
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: appStyle.tabFontSize
    },
    showIcon: true,
    activeTintColor: 'white',
    inactiveTintColor: '#b2b2b2',
    adaptive: false
  }
})