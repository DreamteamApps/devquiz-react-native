import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
  xsmall: `${hp('1.5%')}px`,
  small:  `${hp('2%')}px`,
  medium: `${hp('2.5%')}px`,
  large: `${hp('4%')}px`,
  xlarge: `${hp('6%')}px`,
  xxlarge: `${hp('8%')}px`,
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
};

export default style;
