const media = {
  tablet: '@media (min-width: 768px)',
  desktop: '@media (min-width: 1024px)',
};

const colors = {
  primary: {
    hex: '#4A2B8C',
    rgb: '74, 43, 140',
  },
  secondary: {
    hex: '#6958A6',
    rgb: '105, 88, 166',
  },
  thirdary: {
    hex: '#A9ABD9',
    rgb: '169, 171, 217',
  },
  error: {
    hex: '#F22233',
    rgb: '242, 34, 51',
  },
  font: {
    hex: '#0D0D0D',
    rgb: '13, 13, 13',
  },
};

const theme = { media, colors };

export type MediaType = typeof media;
export type ColorsType = typeof colors;

export default theme;
