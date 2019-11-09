import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodListView from './src/app/views/FoodListView';
import OrderInfoView from './src/app/views/OrderInfoView';
import { appStyle } from './src/app/style';
import BillStatistic from './src/app/views/BillStatistic';
import FoodInputForm from './src/app/views/FoodInputForm';
import EmployeeView from './src/app/views/EmployeeView';

export default createBottomTabNavigator({
  BillStatistic: {
    screen: BillStatistic,
    navigationOptions: {
      title: 'Thống kê',
    }
  },
  Employee: {
    screen: EmployeeView,
    navigationOptions: {
      title: 'Quản lý nhân viên',
    }
  }
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