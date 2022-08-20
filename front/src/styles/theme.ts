const media = {
  tablet: '@media (min-width: 768px)',
  desktop: '@media (min-width: 1024px)',
};

const theme = { media: media };

export type MediaType = typeof media;

export default theme;
