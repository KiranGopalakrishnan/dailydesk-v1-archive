import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from './colors';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      text: {
        textTransform: 'none',
        height: '40px',
      },
      contained: {
        textTransform: 'none',
        height: '40px',
      },
      outlined: {
        border: `solid 1px ${colors.BLUE_1}`,
        textTransform: 'none',
        height: '40px',
        '&:hover': {
          backgroundColor: colors.BLUE_1,
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        height: '56px',
        borderRadius: '8px',
        color: colors.MIDNIGHT_4,
        outline: 'none !important',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.GREY_4,
          color: colors.MIDNIGHT_4,
          border: `solid 1px ${colors.GREY_6}`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: `solid 2px ${colors.BLUE_1}`,
          color: colors.MIDNIGHT_4,
        },
        '&:focus .MuiOutlinedInput-notchedOutline': {
          border: `solid 2px ${colors.BLUE_1}`,
          color: colors.MIDNIGHT_4,
        },
        '&:focus': {
          outline: 'none',
        },
        '&:hover': {
          outline: 'none',
        },
      },
      input: {
        '&:focus': {
          outline: 'none',
        },
        '&::placeholder': {
          color: 'gray',
        },
        color: colors.MIDNIGHT_4,
      },
    },
  },
  palette: {
    primary: {
      light: colors.GREY_2,
      main: colors.BLUE_1,
      dark: colors.ALMOST_DARK_2,
      contrastText: colors.WHITE,
    },
    secondary: {
      light: colors.GREY_2,
      main: colors.MIDNIGHT_1,
      dark: colors.MIDNIGHT_5,
      contrastText: colors.BLACK,
    },
  },
  spacing: 8,
  typography: {
    htmlFontSize: 16,
    fontFamily: '"Open Sans", sans-serif',
    allVariants: {
      color: colors.MIDNIGHT_4,
    },
    h1: {
      fontWeight: 500,
      fontSize: '2.5rem',
    },

    h2: {
      fontWeight: 500,
      fontSize: '2rem',
    },

    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
    },

    h4: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },

    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },

    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 300,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 600,
    },
    caption: {
      fontWeight: 500,
    },
  },
});

export { colors };
