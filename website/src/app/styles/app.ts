import {createStyles, makeStyles} from '@material-ui/core';

/**
 * Application Styles
 */
const useAppStyles = makeStyles(theme =>
  createStyles({
    '@global': {
      ':root': {
        height: '100%',
        backgroundColor: theme.palette.background.default,
      },
      ':root > body': {
        height: '100%',
        margin: 0,
        padding: 0,
      },
      '#app': {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  })
);

// DEFAULT EXPORT
export default useAppStyles;
