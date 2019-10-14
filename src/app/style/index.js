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
    padding: appStyle.defaultStyle.padding
  },
  leftContainer: {
    width: "75%",
    height: "100%",
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: appStyle.defaultStyle.padding,
    top: appStyle.defaultStyle.padding,
  },
  rightContainer: {
    width: "25%",
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

  },
  foodStyle: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
} 