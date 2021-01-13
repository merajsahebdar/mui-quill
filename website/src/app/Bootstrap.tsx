import CssBaseline from '@material-ui/core/CssBaseline';
import {MuiThemeProvider} from '@material-ui/core/styles';
import App from './App';
import defaultTheme from './themes/default';

/**
 * Bootstrap
 *
 * @returns {JSX.Element}
 */
function Bootstrap(): React.ReactElement {
  // Render
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  );
}

export default Bootstrap;
