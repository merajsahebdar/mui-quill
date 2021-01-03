import {Theme, withStyles, createStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {forwardRef} from 'react';

import RichInputBase, {RichInputBaseProps, RichInputBaseClassKey} from '../RichInputBase';

// Filled Rich Input Props
export type FilledRichInputProps = Omit<RichInputBaseProps, 'classes'> & {
  disableUnderline?: boolean;
  classes: Record<FilledRichInputClassKey, string>;
};

// Class Key
type FilledRichInputClassKey = RichInputBaseClassKey | 'underline';

/**
 * Styles
 */
const stylesInjector = withStyles(
  (theme: Theme) => {
    const light = theme.palette.type === 'light';
    const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
    const backgroundColor = light ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.09)';

    return createStyles<FilledRichInputClassKey, FilledRichInputProps>({
      /* Styles applied to the root element. */
      root: {
        position: 'relative',
        backgroundColor,
        borderRadius: theme.shape.borderRadius,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        '&:hover': {
          backgroundColor: light ? 'rgba(0, 0, 0, 0.13)' : 'rgba(255, 255, 255, 0.13)',
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor,
          },
        },
        '&$focused': {
          backgroundColor: light ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 255, 255, 0.09)',
        },
        '&$disabled': {
          backgroundColor: light ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
      },
      /* Styles applied to the root element if color secondary. */
      colorSecondary: {
        '&$underline:after': {
          borderBottomColor: theme.palette.secondary.main,
        },
      },
      /* Styles applied to the root element unless `disableUnderline={true}`. */
      underline: {
        '&:after': {
          borderBottom: `2px solid ${theme.palette.primary.main}`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '""',
          position: 'absolute',
          right: 0,
          transform: 'scaleX(0)',
          transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shorter,
            easing: theme.transitions.easing.easeOut,
          }),
          pointerEvents: 'none', // Transparent to the hover style.
        },
        '&$focused:after': {
          transform: 'scaleX(1)',
        },
        '&$error:after': {
          borderBottomColor: theme.palette.error.main,
          transform: 'scaleX(1)', // error is always underlined in red
        },
        '&:before': {
          borderBottom: `1px solid ${bottomLineColor}`,
          left: 0,
          bottom: 0,
          // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
          content: '"\\00a0"',
          position: 'absolute',
          right: 0,
          transition: theme.transitions.create('border-bottom-color', {
            duration: theme.transitions.duration.shorter,
          }),
          pointerEvents: 'none', // Transparent to the hover style.
        },
        '&:hover:not($disabled):before': {
          borderBottom: `1px solid ${theme.palette.text.primary}`,
        },
        '&$disabled:before': {
          borderBottomStyle: 'dotted',
        },
      },
      /* Pseudo-class applied to the root element if the component is focused. */
      focused: {},
      /* Pseudo-class applied to the root element if `disabled={true}`. */
      disabled: {},
      /* Styles applied to the root element if `startAdornment` is provided. */
      adornedStart: {
        paddingLeft: 12,
      },
      /* Styles applied to the root element if `endAdornment` is provided. */
      adornedEnd: {
        paddingRight: 12,
      },
      /* Pseudo-class applied to the root element if `error={true}`. */
      error: {},
      /* Styles applied to the `input` element if `margin="dense"`. */
      marginDense: {},
      /* Styles applied to the `input` element. */
      input: {
        padding: '25px 12px 8px',
        '&:-webkit-autofill': {
          WebkitBoxShadow: light ? null : '0 0 0 100px #266798 inset',
          WebkitTextFillColor: light ? null : '#fff',
          caretColor: light ? null : '#fff',
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
        },
      },
      /* Styles applied to the `input` element if `margin="dense"`. */
      inputMarginDense: {
        paddingTop: 21,
        paddingBottom: 4,
      },
      /* Styles applied to the root element if `hiddenLabel={true}`. */
      hiddenLabel: {},
      /* Styles applied to the root element if the component is a descendant of `FormControl`. */
      formControl: {},
      /* Styles applied to the root element if `fullWidth={true}`. */
      fullWidth: {},
      /* Styles applied to the `input` if in `<FormControl hiddenLabel />`. */
      inputHiddenLabel: {
        paddingTop: 16,
        paddingBottom: 17,
        '&$inputMarginDense': {
          paddingTop: 8,
          paddingBottom: 9,
        },
      },
      /* Styles applied to the `input` element if `startAdornment` is provided. */
      inputAdornedStart: {
        paddingLeft: 0,
      },
      /* Styles applied to the `input` element if `endAdornment` is provided. */
      inputAdornedEnd: {
        paddingRight: 0,
      },
    });
  },
  {name: 'FilledRichInput'}
);

/**
 * Filled Rich Input
 *
 * @param {FilledRichInputProps} props
 * @returns {JSX.Element}
 */
const FilledRichInput = forwardRef<HTMLDivElement, FilledRichInputProps>(function FilledRichInput(
  props,
  ref
) {
  const {
    classes: {underline: underlineClass, ...otherClasses},
    disableUnderline = true,
    ...other
  } = props;

  // Render
  return (
    <RichInputBase
      ref={ref}
      classes={{
        ...otherClasses,
        root: clsx(otherClasses.root, {[underlineClass]: !disableUnderline}),
      }}
      {...other}
    />
  );
});

// DEFAULT EXPORT
export default stylesInjector(FilledRichInput);
