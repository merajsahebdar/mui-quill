import createPalette from '@material-ui/core/styles/createPalette';
import createSpacing from '@material-ui/core/styles/createSpacing';
import {createMuiTheme, fade} from '@material-ui/core/styles';

// Palette
const palette = createPalette({
  primary: {
    main: '#3B429F',
  },
  secondary: {
    main: '#AA7DCE',
  },
  background: {
    default: '#E9FFF9',
    paper: '#FFFFFF',
  },
  error: {
    main: '#FFC09F',
  },
  warning: {
    main: '#FFEE93',
  },
  success: {
    main: '#ADF7B6',
  },
  info: {
    main: '#79ADDC',
  },
});

// Spacing
const spacing = createSpacing(8);

// Typography
const typography = {
  fontFamily: [
    'Source Sans Pro',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Roboto"',
    '"Oxygen"',
    '"Ubuntu"',
    '"Cantarell"',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Helvetica Neue"',
    'sans-serif',
  ].join(', '),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 900,
};

// Theme
const defaultTheme = createMuiTheme({
  palette,
  spacing,
  shadows: [
    'none',
    `0 01px 04px ${fade(palette.grey[400], 0.5)}`,
    `0 02px 06px ${fade(palette.grey[400], 0.5)}`,
    `0 03px 08px ${fade(palette.grey[400], 0.5)}`,
    `0 04px 10px ${fade(palette.grey[400], 0.5)}`,
    `0 05px 12px ${fade(palette.grey[400], 0.5)}`,
    `0 06px 14px ${fade(palette.grey[400], 0.5)}`,
    `0 07px 16px ${fade(palette.grey[400], 0.5)}`,
    `0 08px 18px ${fade(palette.grey[400], 0.5)}`,
    `0 09px 20px ${fade(palette.grey[400], 0.5)}`,
    `0 10px 22px ${fade(palette.grey[400], 0.5)}`,
    `0 11px 24px ${fade(palette.grey[400], 0.5)}`,
    `0 12px 26px ${fade(palette.grey[400], 0.5)}`,
    `0 13px 28px ${fade(palette.grey[400], 0.5)}`,
    `0 14px 30px ${fade(palette.grey[400], 0.5)}`,
    `0 15px 32px ${fade(palette.grey[400], 0.5)}`,
    `0 16px 34px ${fade(palette.grey[400], 0.5)}`,
    `0 17px 36px ${fade(palette.grey[400], 0.5)}`,
    `0 18px 38px ${fade(palette.grey[400], 0.5)}`,
    `0 19px 40px ${fade(palette.grey[400], 0.5)}`,
    `0 20px 42px ${fade(palette.grey[400], 0.5)}`,
    `0 21px 44px ${fade(palette.grey[400], 0.5)}`,
    `0 22px 46px ${fade(palette.grey[400], 0.5)}`,
    `0 23px 48px ${fade(palette.grey[400], 0.5)}`,
    `0 24px 50px ${fade(palette.grey[400], 0.5)}`,
  ],
  shape: {
    borderRadius: 6,
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
      disableFocusRipple: true,
      disableTouchRipple: true,
    },
  },
  overrides: {
    MuiCardHeader: {
      root: {
        padding: spacing(2),
        '&:first-child, &:last-child': {
          padding: spacing(2),
        },
      },
    },
    MuiCardContent: {
      root: {
        padding: spacing(2),
        '&:first-child, &:last-child': {
          padding: spacing(2),
        },
      },
    },
    MuiCardActions: {
      root: {
        padding: spacing(2),
        '&:first-child, &:last-child': {
          padding: spacing(2),
        },
      },
    },
  },
  typography: {
    ...typography,
    subtitle1: {
      fontWeight: typography.fontWeightMedium,
    },
    subtitle2: {
      fontWeight: typography.fontWeightMedium,
    },
    h1: {
      fontWeight: typography.fontWeightBold,
    },
    h2: {
      fontWeight: typography.fontWeightBold,
    },
    h3: {
      fontWeight: typography.fontWeightBold,
    },
    h4: {
      fontWeight: typography.fontWeightBold,
    },
    h5: {
      fontWeight: typography.fontWeightBold,
    },
    h6: {
      fontWeight: typography.fontWeightBold,
    },
  },
});

// DEFAULT EXPORT
export default defaultTheme;
