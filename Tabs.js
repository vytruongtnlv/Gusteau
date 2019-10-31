import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './src/app/views/Home';
import OrderView from './src/app/views/OrderView';
import AdminView from './src/app/views/AdminView';
import { Icon } from 'react-native-elements';
import { appStyle } from './src/app/style';
import { connect } from 'react-redux';
import store from './store';
const setView = () => {
  const permission = store.getState().auth.permission;
  let val = ["Home"];
  if (permission)
    switch (permission) {
      case 'all':
        val = ["Home", "AdminView"];
        break;
      default:
        val = ["Home"];
        break;
    }
  return val;
}

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Trang chủ',
      // tabBarIcon: ({ tintColor }) => (
      //   <View >
      //     <Icon type="material" name="notifications" color={tintColor} />
      //   </View>
      // )
    }
  },
  AdminView: {
    screen: AdminView,
    navigationOptions: {
      title: 'Quản lý',
      // tabBarIcon: ({ tintColor }) => (
      //   <View >
      //     <Icon type="material" name="notifications" color={tintColor} />
      //   </View>
      // )
    }
  }
},
  {
    order: ["Home", "AdminView"],
    tabBarOptions: {
      // style: {
      //   backgroundColor: 'white',

      // },
      labelStyle: {
        fontSize: appStyle.tabFontSize
      },
      showIcon: true,
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      adaptive: false
    }
  }
)

export default (Tabs)