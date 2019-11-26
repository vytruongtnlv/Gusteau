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
import ScanScreen from './src/app/views/ScanScreen';
import Payment from './src/app/views/Payment';
import MemberList from './src/app/views/MemberList';
import MemberView from './src/app/views/MemberView';
import QrCreator from './src/app/views/QrCreator';
import PaymentComponent from './src/app/components/PaymentComponent';
import TableManagement from './src/app/views/TableManagement';
import CategoryManagement from './src/app/views/CategoryManagement';
import MemberManagement from './src/app/views/MemberManagement';
import EmployeeManagement from './src/app/views/EmployeeManagement';
import TableDetail from './src/app/components/TableDetail';
import CategoryDetail from './src/app/components/CategoryDetail';
import FoodDetail from './src/app/components/FoodDetail';
import EmployeeView from './src/app/views/EmployeeView';
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
  Tables: {
    screen: TableManagement
  },
  Categories: {
    screen: CategoryManagement
  },
  Members: {
    screen: MemberManagement
  },
  Employees: {
    screen: EmployeeManagement
  },
  EmployeeView: {
    screen: EmployeeView
  },
  Tabs: {
    screen: Tabs
  },
  AdminTabs: {
    screen: AdminTabs
  },
  OrderTab: {
    screen: OrderTab
  },
  ScanScreen: {
    screen: ScanScreen
  },
  QrCreator: {
    screen: QrCreator
  },
  Payment: {
    screen: Payment
  },
  MemberList: {
    screen: MemberList
  },
  MemberView: {
    screen: MemberView
  },
  PaymentComponent: {
    screen: PaymentComponent
  },
  TableDetail: {
    screen: TableDetail
  },
  CategoryDetail: {
    screen: CategoryDetail
  },
  FoodDetail: {
    screen: FoodDetail
  }

}, {
  headerMode: 'none'
})

export default createAppContainer(stack)