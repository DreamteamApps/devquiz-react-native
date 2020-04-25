const colors = {
  primary: '#7159C1',
  secondary: '#fff',
  btnText: '#4B4B4B',
  backgroundGray: '#e3dddd',
  green: '#3DBE6F',
  red: '#E00101',
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
  fontsInt
};

export default style;
