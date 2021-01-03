import NotchedOutline from '@material-ui/core/OutlinedInput/NotchedOutline';
import {Theme, withStyles, createStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {forwardRef} from 'react';

import RichInputBase, {RichInputBaseProps, RichInputBaseClassKey} from '../RichInputBase';

// Outlined Rich Input Props
export type OutlinedRichInputProps = Omit<RichInputBaseProps, 'classes'> & {
  disableUnderline?: boolean;
  classes: Record<OutlinedRichInputClassKey, string>;
  notched?: boolean;
};

// Class Key
type OutlinedRichInputClassKey =
  | RichInputBaseClassKey
  | 'notchedOutline'
  | 'sizeSmall'
  | 'inputSizeSmall';

/**
 * Styles
 */
const stylesInjector = withStyles(
  (theme: Theme) => {
    const light = theme.palette.type === 'light';
    const borderColor = light ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';

    return createStyles<OutlinedRichInputClassKey, OutlinedRichInputProps>({
      /* Styles applied to the root element. */
      root: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        '&:hover $notchedOutline': {
          borderColor: theme.palette.text.primary,
        },
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          '&:hover $notchedOutline': {
            borderColor,
          },
        },
        '&$focused $notchedOutline': {
          borderColor: theme.palette.primary.main,
          borderWidth: 2,
        },
        '&$error $notchedOutline': {
          borderColor: theme.palette.error.main,
        },
        '&$disabled $notchedOutline': {
          borderColor: theme.palette.action.disabled,
        },
      },
      /* Styles applied to the root element if the color is secondary. */
      colorSecondary: {
        '&$focused $notchedOutline': {
          borderColor: theme.palette.secondary.main,
        },
      },
      /* Styles applied to the root element if the component is focused. */
      focused: {},
      /* Styles applied to the root element if `disabled={true}`. */
      disabled: {},
      /* Styles applied to the root element if `startAdornment` is provided. */
      adornedStart: {
        paddingLeft: 14,
      },
      /* Styles applied to the root element if `endAdornment` is provided. */
      adornedEnd: {
        paddingRight: 14,
      },
      /* Pseudo-class applied to the root element if `error={true}`. */
      error: {},
      /* Styles applied to the `input` element if `size="small"`. */
      sizeSmall: {},
      /* Styles applied to the `NotchedOutline` element. */
      notchedOutline: {
        borderColor,
      },
      /* Styles applied to the `input` element. */
      input: {
        padding: '16.5px 14px',
      },
      /* Styles applied to the `input` element if `size="small"`. */
      inputSizeSmall: {
        paddingTop: 8.5,
        paddingBottom: 8.5,
      },
      /* Styles applied to the `input` element if `startAdornment` is provided. */
      inputAdornedStart: {
        paddingLeft: 0,
      },
      /* Styles applied to the `input` element if `endAdornment` is provided. */
      inputAdornedEnd: {
        paddingRight: 0,
      },
      /* Styles applied to the root element if the component is a descendant of `FormControl`. */
      formControl: {},
      /* Styles applied to the root element if `fullWidth={true}`. */
      fullWidth: {},
      /* Styles applied to the `input` element if `margin="dense"`. */
      marginDense: {},
      /* Styles applied to the `input` element if `margin="dense"`. */
      inputMarginDense: {},
      /* Styles applied to the root element if `hiddenLabel={true}`. */
      hiddenLabel: {},
      /* Styles applied to the `input` if in `<FormControl hiddenLabel />`. */
      inputHiddenLabel: {
        paddingTop: 16,
        paddingBottom: 17,
        '&$inputMarginDense': {
          paddingTop: 8,
          paddingBottom: 9,
        },
      },
    });
  },
  {name: 'OutlinedRichInput'}
);

/**
 * Outlined Rich Input
 *
 * @param {OutlinedRichInputProps} props
 * @returns {JSX.Element}
 */
const OutlinedRichInput = forwardRef<HTMLDivElement, OutlinedRichInputProps>(
  function OutlinedRichInput(props, ref) {
    const {classes, label, notched, ...other} = props;

    // Render
    return (
      <RichInputBase
        renderSuffix={state => (
          <NotchedOutline
            className={classes.notchedOutline}
            label={label}
            labelWidth={0}
            notched={
              typeof notched !== 'undefined'
                ? notched
                : Boolean(state.startAdornment || state.filled || state.focused)
            }
          />
        )}
        classes={{
          ...classes,
          root: clsx(classes.root),
        }}
        ref={ref}
        {...other}
      />
    );
  }
);

// DEFAULT EXPORT
export default stylesInjector(OutlinedRichInput);
