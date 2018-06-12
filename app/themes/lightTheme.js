import {
  cyan500, cyan700,
  green400,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

/**
 *  Light Theme is the default theme used in material-ui. It is guaranteed to
 *  have all theme variables needed for every component. Variables not defined
 *  in a custom theme will default to these values.
 */
export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  palette: {
    primary1Color: cyan500,
    // primary1Color: '#00a9a5',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: green400,
    // accent1Color: '#ff9b42',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  COLORS: {
    black: '#000000',
    greyishBrown: '#474747',
    battleshipGrey: '#6f7071',
    lightgrey: '#d4d4d4',
    white: '#ffffff',
    rose: '#d56062',
    whiteTwo: '#ebebeb',
    dodgerBlue: '#35a4ff',
    windowsBlue: '#3f88c5',
    pastelOrange: '#ff9b42',
    tealBlue: '#00a9a5',
  },
};
