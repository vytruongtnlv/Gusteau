import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');
EStyleSheet.build({
  $rem: width / 380
});

export const appColor = {
  blue: "#5fe5fa",
  green: '#54ff60',
  red: '#ff2e2e'
}

export const appStyle = {
  defaultStyle: {
    bottom: '0.5rem',
    margin: '1.5rem',
    padding: '1.5rem',
    borderWidth: 1,
    borderColor: 'black',
    space: '2.25rem',
    tabFontSize: '100rem',
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: 'black',
  },
  lightTheme: {

  },

}
export const styles = EStyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bigContainer: {
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    width: "65%",
    height: "100%",
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    alignItems: 'center',
    left: appStyle.defaultStyle.padding,
    top: appStyle.defaultStyle.padding,
  },
  categoryView: {
    margin: appStyle.defaultStyle.margin,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallLeft: {
    width: "50%",
    height: "100%",
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
    alignItems: 'center',
    left: appStyle.defaultStyle.padding,
    top: appStyle.defaultStyle.padding,
  },
  rightContainer: {
    width: "35%",
    height: "100%",
    position: 'absolute',
    right: appStyle.defaultStyle.padding,
    top: appStyle.defaultStyle.padding,
  },
  tableStyle: {
    width: '120rem',
    height: '75rem',
    backgroundColor: appColor.green,
    marginHorizontal: '3rem',
    marginVertical: '3rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodStyle: {
    // borderWidth: 1,
    // borderColor: 'black',
    width: '75rem',
    height: '75rem',
    justifyContent: 'center',
    alignItems: 'center',
    margin: appStyle.defaultStyle.space
  },
  foodImg: {
    flex: 1,
    width: '70rem',
    height: '70rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '50rem',
    height: '25rem',
    backgroundColor: appColor.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: '5rem',
  }
})
export const orderStyle = EStyleSheet.create({
  orderView: {
    height: "100%",
    width: "100%"
  },
  priceStyle: {
    fontSize: '11rem',
    textAlign: 'left',
  },
  orderTitle: {
    fontSize: 24,
    textAlign: 'center',
    margin: '10rem'
  },

})
export const orderInputStyles = EStyleSheet.create({
  modalInsideStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "50%",
    height: "50%"
  },
  viewContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  foodName: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20
  },
  numericStyle: {
    height: 75,
    marginBottom: 20,
    alignItems: 'center'
  }
})