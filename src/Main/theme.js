import getMuiTheme from 'material-ui/styles/getMuiTheme';


export const primary={
  lighter:'#faffff',
  light: '#c6ffff',
  main: '#93E2CF',
  dark: '#62b09e',
  contrastText: '#000000',
}
export const secondary={
  light: '#ffa4ae',
  main: '#fd727f',
  dark: '#c64053',
  contrastText: '#000000',
}
export const backgrounds={
  lighter:'#ededed',
  light: '#e1e1e1',
  main: '#c7c7c7',
  dark: '#969696',
  contrastText: '#000000',
}


const theme = getMuiTheme({
  palette: {
    primary: primary,
    secondary: secondary,
    backgrounds:backgrounds
  },
  tabs: {
    backgroundColor:primary.light,
    selectedTextColor:primary.contrastText,
    textColor:primary.contrastText,
  },
  inkBar:{
    backgroundColor:secondary.main,
  },
  appBar:{
    color:primary.dark
  },
  floatingActionButton:{
    color:primary.main,
    secondaryColor:secondary.main,
    zIndex:10,
  },
  refreshIndicator:{
    strokeColor:primary.dark,
    loadingStrokeColor:secondary.main,
  },
  menuItem:{
    selectedTextColor:secondary.dark,
  },
  raisedButton:{
    backgroundColor:secondary.main,
    color:secondary.contrastText,
    disabledColor:"rgb(229, 229, 229)",
    disabledTextColor:"rgba(0, 0, 0, 0.3)",
    primaryColor:primary.main,
    primaryTextColor:primary.contrastText,
    secondaryColor:secondary.main,
    secondaryTextColor:secondary.contrastText,
    textColor:"rgba(0, 0, 0, 0.87)",
  }
});

export default theme
