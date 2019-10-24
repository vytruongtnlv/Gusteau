export const appColor = {
  blue: "#5fe5fa"
}

export const appStyle = {
  defaultStyle: {
    margin: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  containerStyle: {
    borderWidth: 1,
    borderColor: 'black',
  },
  lightTheme: {

  },

}
export const styles = {
  mainContainer: {
    width: "100%",
    height: "100%",
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: appStyle.defaultStyle.padding,
    margin: appStyle.defaultStyle.margin
  },
  leftContainer: {
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
    width: 140,
    height: 140,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodStyle: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 100,
    height: 50,
    backgroundColor: appColor.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
  }
} 