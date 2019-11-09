import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodListView from './src/app/views/FoodListView';
import OrderInfoView from './src/app/views/OrderInfoView';
import { appStyle } from './src/app/style';

export default createBottomTabNavigator({
  FoodList: {
    screen: FoodListView,
    navigationOptions: {
      title: 'Món ăn',
    }
  },
  Order: {
    screen: OrderInfoView,
    navigationOptions: {
      title: 'Đơn hàng',
    }
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: appStyle.tabFontSize
    },
  }
})