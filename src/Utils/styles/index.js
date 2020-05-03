import {Dimensions} from 'react-native';

const sizeMultiplier = {
  height: 812 / Dimensions.get('window').height,
  width: 375 / Dimensions.get('window').width,
};

const hpx = (value) => {
  return value * sizeMultiplier.height + 'px';
};
const wpx = () => {
  return value * sizeMultiplier.width + 'px';
};

const colors = {
  primary: '#7159C1',
  secondary: '#fff',
  btnText: '#4B4B4B',
  btnBg: '#514089',
  backgroundGray: '#e3dddd',
  green: '#85C159',
  red: '#EB6464',
  gray: '#585858',
  themeType: 'light-content',
};
const fonts = {
  xsmall: hpx(14),
  small: hpx(16),
  medium: hpx(18),
  large: hpx(28),
  xlarge: hpx(34),
  xxlarge: hpx(50),
};
const fontName = {
  regular: 'Ubuntu-Regular',
  medium: 'Ubuntu-Medium',
  bold: 'Ubuntu-Bold',
};
let fontsInt = {};
Object.keys(fonts).forEach(
  (key) => (fontsInt[key] = parseInt(fonts[key].replace('px', ''))),
);

const style = {
  colors,
  fonts,
  fontsInt,
  fontName,
  hpx,
  wpx,
};

export default style;
