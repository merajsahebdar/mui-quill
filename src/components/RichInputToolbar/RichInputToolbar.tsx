import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import {withStyles, createStyles} from '@material-ui/core/styles';
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded';
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulletedRounded';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumberedRounded';
import FormatQuoteIcon from '@material-ui/icons/FormatQuoteRounded';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlinedRounded';
import FormatTextdirectionRToLIcon from '@material-ui/icons/FormatTextdirectionRToLRounded';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeftRounded';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenterRounded';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRightRounded';
import {forwardRef, memo} from 'react';

// Rich Input Toolbar Class Key
type RichInputToolbarClassKey = 'root' | 'group';

// Rich Input Toolbar Props
interface RichInputToolbarProps {
  classes: Record<RichInputToolbarClassKey, string>;
}

/**
 * Styles
 */
const stylesInjector = withStyles(
  theme =>
    createStyles<RichInputToolbarClassKey, {}>({
      root: {
        width: '100%',
        padding: '0 12px 12px',
      },
      group: {},
    }),
  {name: 'RichInputToolbar'}
);

/**
 * Rich Input Toolbar
 *
 * @returns {JSX.Element}
 */
const RichInputToolbar = forwardRef<HTMLDivElement, RichInputToolbarProps>(
  function RichInputToolbar(props, ref) {
    const {classes} = props;

    // Render
    return (
      <div className={classes.root}>
        <Grid container ref={ref} spacing={1} alignItems="center">
          <Grid item>
            <div className={classes.group}>
              <IconButton size="small" className="ql-bold">
                <FormatBoldIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="ql-italic">
                <FormatItalicIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="ql-underline">
                <FormatUnderlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.group}>
              <Tooltip title="Numbered List">
                <IconButton size="small" className="ql-list" value="ordered">
                  <FormatListNumberedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bulleted List">
                <IconButton size="small" className="ql-list" value="bullet">
                  <FormatListBulletedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Quote">
                <IconButton size="small" className="ql-blockquote">
                  <FormatQuoteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
          <Grid item>
            <div className={classes.group}>
              <Tooltip title="Right to Left">
                <IconButton size="small" className="ql-direction" value="rtl">
                  <FormatTextdirectionRToLIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Align Left">
                <IconButton size="small" className="ql-align" value="">
                  <FormatAlignLeftIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Align Center">
                <IconButton size="small" className="ql-align" value="center">
                  <FormatAlignCenterIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Align Right">
                <IconButton size="small" className="ql-align" value="right">
                  <FormatAlignRightIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
);

/**
 * @inheritdoc
 */
const RichInputToolbarContainer = memo(stylesInjector(RichInputToolbar));

// DEFAULT EXPORT
export default RichInputToolbarContainer;
