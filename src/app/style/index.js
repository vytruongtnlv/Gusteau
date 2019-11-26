import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from 'react-native';
let { height, width } = Dimensions.get('window');

EStyleSheet.build({
  $rem: width < 380 ? width / 190 : width / 380
});


export const appColor = {
  blue: "#5fe5fa",
  green: '#54ff60',
  red: '#ff2e2e',
  enableColor: '',
  buttonColor: "#deebff",
  focusedColor: "#abccff",
  unfocusedColor: "#f7f7f7",
  disableColor: '#14637d',
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
  fontSize: {
    fontSize: '10rem'
  }

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
  contentPanal: {
    width: "99%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '2rem',
    backgroundColor: '#e8e8e8',
  },
  tableContainer: {
    width: "100%",
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
    width: '45%',
    height: '90rem',
    // backgroundColor: appColor.green,
    marginHorizontal: '3rem',
    marginVertical: '3rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaText: {
    fontSize: '15rem',
  },
  tableText: {
    fontSize: '10rem'
  },
  foodStyle: {
    width: '77.25rem',
    height: '88.75rem',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: appStyle.defaultStyle.space
  },
  foodImg: {
    width: '65rem',
    height: '65rem',
  },
  imgView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodTextView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '55rem',
    height: '25rem',
    backgroundColor: appColor.buttonColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  fontSize: {
    fontSize: '11rem',
  },
  orderTitle: {
    fontSize: 24,
    textAlign: 'center',
    margin: '10rem'
  },
})

export const memberStyle = EStyleSheet.create({
  fontSize: {
    fontSize: '9rem',
  }
})

export const orderInputStyles = EStyleSheet.create({
  modalInsideStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: "100%",
    height: "125rem"
  },
  viewContent: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '5rem',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  foodName: {
    textAlign: 'center',
    fontSize: '10rem',
    marginBottom: '3.5rem'
  },
  inputStyle: {
    width: "80rem",
    marginBottom: '5rem'
  },
  numericStyle: {
    // height: '20rem',
    marginBottom: '5rem',
    alignItems: 'center',
    borderWidth: 1,
  },
  numericInputStyle: {
    // height: '15rem',
    alignItems: 'center',
  }
})