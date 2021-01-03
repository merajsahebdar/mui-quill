import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {Fragment, useCallback, useState} from 'react';

import RichTextField from '../components/RichTextField';
import useAppStyles from './styles/app';
import defaultTheme from './themes/default';

/**
 * Styles
 */
const useStyles = makeStyles(() =>
  createStyles({
    content: {
      '& > p, & > ol, & > ul': {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  })
);

/**
 * App
 *
 * @returns {JSX.Element}
 */
function App(): React.ReactElement {
  // Style Sheet
  useAppStyles();
  const classes = useStyles();

  // State: Value
  const [value, setValue] = useState('');

  // State: Edit Mode
  const [mode, setMode] = useState<'edit' | 'view'>('edit');

  /**
   * Handle Change
   */
  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  /**
   * Handle Reset
   */
  const onReset = useCallback(() => {
    setValue('');
  }, []);

  /**
   * Toggle Mode
   */
  const toggleMode = useCallback(() => {
    setMode(prevState => (prevState === 'edit' ? 'view' : 'edit'));
  }, []);

  // Render
  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card elevation={4}>
          <CardHeader
            disableTypography
            title={
              <Typography color="textPrimary" component="p" variant="subtitle1">
                Material UI Quill
              </Typography>
            }
          />
          <CardContent>
            {mode === 'edit' && (
              <RichTextField
                fullWidth
                label="Rich Text"
                variant="filled"
                value={value}
                onChange={onChange}
                options={{
                  toolbar: true,
                }}
              />
            )}
            {mode === 'view' && (
              <Typography
                className={classes.content}
                color="textSecondary"
                component="div"
                variant="body1"
                dangerouslySetInnerHTML={{__html: value}}
              />
            )}
          </CardContent>
          <CardActions>
            <div style={{marginLeft: 'auto'}} />
            {mode === 'edit' && (
              <Fragment>
                <Button color="primary" size="medium" variant="text" onClick={onReset}>
                  Reset
                </Button>
                <Button
                  color="primary"
                  size="medium"
                  variant="contained"
                  disabled={value === ''}
                  onClick={toggleMode}
                >
                  Save
                </Button>
              </Fragment>
            )}
            {mode === 'view' && (
              <Button
                color="primary"
                size="medium"
                variant="text"
                disabled={value === ''}
                onClick={toggleMode}
              >
                Edit
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
