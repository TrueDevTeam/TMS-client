import { injectGlobal } from 'styled-components';

// Lato
import LatoHairline from 'assets/fonts/Lato/Lato-Hairline.ttf';
import LatoLight from 'assets/fonts/Lato/Lato-Light.ttf';
import LatoThin from 'assets/fonts/Lato/Lato-Thin.ttf';
import LatoRegular from 'assets/fonts/Lato/Lato-Regular.ttf';
import LatoMedium from 'assets/fonts/Lato/Lato-Medium.ttf';
import LatoSemibold from 'assets/fonts/Lato/Lato-Semibold.ttf';
import LatoBold from 'assets/fonts/Lato/Lato-Bold.ttf';
import LatoHeavy from 'assets/fonts/Lato/Lato-Heavy.ttf';
import LatoBlack from 'assets/fonts/Lato/Lato-Black.ttf';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  @font-face {
    font-family: 'Lato';
    src: url(${LatoHairline}) format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoThin}) format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoLight}) format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoMedium}) format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoSemibold}) format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoBold}) format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoHeavy}) format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url(${LatoBlack}) format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    color: #333;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  p, label {
    line-height: 1.5em;
  }
`;
