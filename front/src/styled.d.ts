import 'styled-components';
import { ColorsType, MediaType, ZIndexType } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: MediaType;
    colors: ColorsType;
    zIndex: ZIndexType;
  }
}
