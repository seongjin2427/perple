import 'styled-components';
import { MediaType } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    media: MediaType;
  }
}
