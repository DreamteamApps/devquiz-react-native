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
  xsmall: '14px',
  small: '16px',
  medium: '18px',
  large: '28px',
  xlarge: '34px',
  xxlarge: '50px',
};
let fontsInt = {};
Object.keys(fonts).forEach(
  (key) => (fontsInt[key] = parseInt(fonts[key].replace('px', ''))),
);

const style = {
  colors,
  fonts,
  fontsInt,
};

export default style;
