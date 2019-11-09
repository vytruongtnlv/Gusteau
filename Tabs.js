import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from './src/app/views/Home';
import { Icon } from 'react-native-elements';
import { appStyle } from './src/app/style';
import Profile from './src/app/views/Profile';

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Trang chủ',
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Tài khoản',

    }
  }
},
  {
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