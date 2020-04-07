import { DefaultTheme } from 'styled-components';

const defaultTheme: DefaultTheme = {
  borderRadius: '6px',

  colors: {
    primary: {
      lightest: '#EFF8FF',
      lighter: '#BCDEFA',
      light: '#6CB2EB',
      base: '#3490DC',
      dark: '#2779BD',
      darker: '#1C3D5A',
      darkest: '#12283A'
    },
    white: '#FFFFFF',
    grey: {
      lightest: '#F8FAFC',
      lighter: '#F1F5F8',
      light: '#DAE1E7',
      base: '#B8C2CC',
      dark: '#8795A1',
      darker: '#606F7B',
      darkest: '#3D4852'
    },
    black: '#22292F',
    main: 'cyan',
    secondary: 'magenta'
  }
};

export default defaultTheme;
