import { createBottomTabNavigator } from 'react-navigation-tabs';
import FoodListView from './src/app/views/FoodListView';
import OrderInfoView from './src/app/views/OrderInfoView';
import { appStyle } from './src/app/style';
import BillStatistic from './src/app/views/BillStatistic';
import FoodInputForm from './src/app/views/FoodInputForm';
import EmployeeView from './src/app/views/EmployeeView';
import CategoryManagement from './src/app/views/CategoryManagement';
import TableManagement from './src/app/views/TableManagement';
import MemberManagement from './src/app/views/MemberManagement';
import AdminView from './src/app/views/AdminView';
import Profile from './src/app/views/Profile';

export default createBottomTabNavigator({
  BillStatistic: {
    screen: BillStatistic,
    navigationOptions: {
      title: 'Thống kê',
    }
  },
  AdminView: {
    screen: AdminView,
    navigationOptions: {
      title: 'Quản lý',
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Tài khoản',
    }
  }
}, {

  tabBarOptions: {
    labelStyle: {
      fontSize: appStyle.tabFontSize
    }
  }
})