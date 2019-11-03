import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodListView from './src/app/views/FoodListView';
import OrderInfoView from './src/app/views/OrderInfoView';
import { appStyle } from './src/app/style';
import BillStatistic from './src/app/views/BillStatistic';
import FoodInputForm from './src/app/views/FoodInputForm';

export default createBottomTabNavigator({
  BillStatistic: {
    screen: BillStatistic,
    tabBarOptions: {
      title: 'Thống kê'
    }
  },
  Food: {
    screen: FoodInputForm,
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#323232',

    },
    labelStyle: {
      fontSize: appStyle.tabFontSize
    },
    showIcon: true,
    activeTintColor: 'white',
    inactiveTintColor: '#b2b2b2',
    adaptive: false
  }
})