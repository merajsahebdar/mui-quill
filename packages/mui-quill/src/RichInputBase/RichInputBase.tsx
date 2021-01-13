import {useFormControl} from '@material-ui/core/FormControl';
import {Theme, createStyles, withStyles} from '@material-ui/core/styles';
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import Quill, {Sources, RangeStatic} from 'quill';
import type Delta from 'quill-delta';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';

import RichInputToolbar from '../RichInputToolbar';
import postpone from '../utils/postpone';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useQuillStyles from './styles/quill';

// Quill Options
type QuillOptions = {
  toolbar: boolean | {font: boolean};
};

// Rich Input Base Class Key
export type RichInputBaseClassKey =
  | 'root'
  | 'formControl'
  | 'focused'
  | 'disabled'
  | 'adornedStart'
  | 'adornedEnd'
  | 'error'
  | 'marginDense'
  | 'colorSecondary'
  | 'fullWidth'
  | 'hiddenLabel'
  | 'input'
  | 'inputMarginDense'
  | 'inputHiddenLabel'
  | 'inputAdornedStart'
  | 'inputAdornedEnd';

// Rich Input Base Props
export type RichInputBaseProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'onFocus' | 'onBlur'
> & {
  error?: boolean;
  disabled?: boolean;
  label?: ReactNode;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  classes: Record<RichInputBaseClassKey, string>;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  renderSuffix?: (state: {
    disabled?: boolean;
    error?: boolean;
    filled?: boolean;
    focused?: boolean;
    margin?: 'dense' | 'none' | 'normal';
    required?: boolean;
    startAdornment?: React.ReactNode;
  }) => React.ReactNode;
  options?: QuillOptions;
};

const formControlStates = [
  'color',
  'disabled',
  'error',
  'hiddenLabel',
  'margin',
  'required',
  'filled',
];

/**
 * Form Control State
 *
 * @param {Record<string,any>} props
 * @param {Record<string,any>|undefined} formControl
 * @returns {Record<string,any>}
 */
function formControlState(
  props: Record<string, any>,
  formControl: Record<string, any> | undefined
): Record<string, any> {
  return formControlStates.reduce((acc, state) => {
    acc[state] = props[state];

    if (formControl) {
      if (typeof props[state] === 'undefined') {
        acc[state] = formControl[state];
      }
    }

    return acc;
  }, {} as Record<string, any>);
}

/**
 * Supports determination of isControlled().
 * Controlled input accepts its current value as a prop.
 *
 * @see https://facebook.github.io/react/docs/forms.html#controlled-components
 * @param value
 * @returns {boolean} true if string (including '') or number (including zero)
 */
function hasValue(value: any): boolean {
  return value != null && !(Array.isArray(value) && value.length === 0);
}

/**
 * Check if the givven value is a valid delta.
 *
 * @param {any} value
 */
function isDelta(value: any): boolean {
  return value && value.ops;
}

/**
 * Determine if field is empty or filled.
 * Response determines if label is presented above field or as placeholder.
 *
 * @param obj
 * @param SSR
 * @returns {boolean} False when not present or empty string.
 *                    True when any number or string with length.
 */
function isFilled(obj: any, SSR = false): boolean {
  return (
    obj &&
    ((hasValue(obj.value) && obj.value !== '') ||
      (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
  );
}

/**
 * Special comparison function that knows how to compare Deltas.
 */
function isEqualValue(value: any, nextValue: any): boolean {
  if (isDelta(value) && isDelta(nextValue)) {
    return isEqual(value.ops, nextValue.ops);
  } else {
    return isEqual(value, nextValue);
  }
}

/**
 * Styles
 */
export const stylesInjector = withStyles(
  (theme: Theme) => {
    return createStyles<RichInputBaseClassKey, RichInputBaseProps>({
      /* Styles applied to the root element. */
      root: {
        // Mimics the default input display property used by browsers for an input.
        ...theme.typography.body1,
        color: theme.palette.text.primary,
        lineHeight: '1.4375em', // 23px
        boxSizing: 'border-box', // Prevent padding issue with fullWidth.
        position: 'relative',
        cursor: 'text',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&$disabled': {
          color: theme.palette.text.disabled,
          cursor: 'default',
        },
      },
      /* Styles applied to the root element if the component is a descendant of `FormControl`. */
      formControl: {},
      /* Styles applied to the root element if the component is focused. */
      focused: {},
      /* Styles applied to the root element if `disabled={true}`. */
      disabled: {},
      /* Styles applied to the root element if `startAdornment` is provided. */
      adornedStart: {},
      /* Styles applied to the root element if `endAdornment` is provided. */
      adornedEnd: {},
      /* Pseudo-class applied to the root element if `error={true}`. */
      error: {},
      /* Styles applied to the `input` element if `margin="dense"`. */
      marginDense: {},
      /* Styles applied to the root element if the color is secondary. */
      colorSecondary: {},
      /* Styles applied to the root element if `fullWidth={true}`. */
      fullWidth: {
        width: '100%',
      },
      /* Styles applied to the root element if `hiddenLabel={true}`. */
      hiddenLabel: {},
      /* Styles applied to the `input` element. */
      input: {
        font: 'inherit',
        letterSpacing: 'inherit',
        color: 'currentColor',
        padding: '4px 0 5px',
        border: 0,
        boxSizing: 'border-box',
        background: 'none',
        margin: 0, // Reset for Safari
        display: 'block',
        // Make the flex item shrink with Firefox
        minWidth: 0,
        width: '100%', // Fix IE11 width issue
        '&:focus': {
          outline: 0,
        },
        // Reset Firefox invalid required input style
        '&:invalid': {
          boxShadow: 'none',
        },
        '&$disabled': {
          opacity: 1, // Reset iOS opacity
        },
      },
      /* Styles applied to the `input` element if `margin="dense"`. */
      inputMarginDense: {
        paddingTop: 1,
      },
      /* Styles applied to the `input` element if `startAdornment` is provided. */
      inputAdornedStart: {},
      /* Styles applied to the `input` element if `endAdornment` is provided. */
      inputAdornedEnd: {},
      /* Styles applied to the `input` element if `hiddenLabel={true}`. */
      inputHiddenLabel: {},
    });
  },
  {name: 'RichInputBase'}
);

/**
 * Rich Input Base
 *
 * @param {RichInputBaseProps} props
 * @returns {JSX.Element}
 */
const RichInputBase = forwardRef<HTMLDivElement, RichInputBaseProps>(function RichInputBase(
  props,
  ref
) {
  const {
    placeholder,
    fullWidth,
    error,
    disabled,
    value,
    classes,
    options = {toolbar: false},
    renderSuffix,
    onChange,
  } = props;

  // Quill Style Sheet
  useQuillStyles();

  // Form Control
  const [focused, setFocused] = useState(false);

  const formControl = useFormControl();
  const fcs = formControlState(props, formControl);

  fcs.focused = formControl ? formControl.focused : focused;

  const onFilled = formControl && formControl.onFilled;
  const onEmpty = formControl && formControl.onEmpty;

  /**
   * Handle Focus
   */
  const handleFocus = useCallback(() => {
    if (formControl && formControl.onFocus) {
      formControl.onFocus();
    } else {
      setFocused(true);
    }
  }, [formControl]);

  /**
   * Handle Blur
   */
  const handleBlur = useCallback(() => {
    if (formControl && formControl.onBlur) {
      formControl.onBlur();
    } else {
      setFocused(false);
    }
  }, [formControl]);

  // Editor instance reference
  const editorRef = useRef<Quill>();

  // Latest Selection
  const selectionRef = useRef<RangeStatic>();

  // Latest Contents
  const contentsRef = useRef<Delta | string>();

  // Latest Delta
  const lastDeltaChangeSetRef = useRef<Delta>();

  // Is Controlled
  const {current: isControlled} = useRef(value != null);

  // Editor root reference
  const editorElementRef = useRef<HTMLDivElement | null>(null);

  // Editor toolbar reference
  const toolbarElementRef = useRef<HTMLDivElement | null>(null);

  /**
   * Set Editor Selection
   */
  const setEditorSelection = useCallback((editor: Quill, range: RangeStatic) => {
    selectionRef.current = range;
    if (range) {
      // Validate bounds before applying.
      const length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, length - 1 - range.index));
      editor.setSelection(range);
    }
  }, []);

  /**
   * Replace the contents of the editor, but keep the previous selection hanging
   * around so that the cursor won't move.
   */
  const setEditorContents = useCallback(
    (editor: Quill, value: Delta | string) => {
      contentsRef.current = value;
      const currentSelection = selectionRef.current;
      if (typeof value === 'string') {
        editor.setContents(editor.clipboard.convert(value as any));
      } else {
        editor.setContents(value);
      }

      postpone(() => {
        if (currentSelection) {
          setEditorSelection(editor, currentSelection);
        }
      });
    },
    [setEditorSelection]
  );

  /**
   * Handle Click
   */
  const handleClick = useCallback(() => {
    if (editorRef.current) {
      console.log('hi');
      editorRef.current.focus();
    }
  }, []);

  /**
   * Check Dirty
   */
  const checkDirty = useCallback(
    obj => {
      if (isFilled(obj) || placeholder) {
        if (onFilled) {
          onFilled();
        }
      } else if (onEmpty) {
        onEmpty();
      }
    },
    [onFilled, onEmpty, placeholder]
  );

  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({value});
    }
  }, [value, checkDirty, isControlled]);

  /**
   * Handle Change
   */
  const handleChange = useCallback(
    (value: string) => {
      if (!isControlled) {
        checkDirty({
          value,
        });
      }

      if (onChange) {
        onChange(value);
      }
    },
    [checkDirty, isControlled, onChange]
  );

  /**
   * Handle Editor Text Change
   *
   * @param {Delta} delta
   * @param {Sources} sources
   * @param {Quill} editor
   */
  const handleEditorTextChange = useCallback(
    (delta: Delta, __: Sources, editor: Quill) => {
      const value = editor.getLength() === 1 ? '' : editor.root.innerHTML;

      // We keep storing the same type of value as what the user gives us,
      // so that value comparisons will be more stable and predictable.
      const nextContents = isDelta(value) ? editor.getContents() : value;

      if (nextContents !== contentsRef.current) {
        // Taint this `delta` object, so we can recognize whether the user
        // is trying to send it back as `value`, preventing a likely loop.
        lastDeltaChangeSetRef.current = delta;

        contentsRef.current = nextContents;

        handleChange(value);
      }
    },
    [handleChange]
  );

  /**
   * Handle Editor Selection Change
   *
   * @param {Range} nextSelection
   * @param {Sources} sources
   * @param {Quill} editor
   */
  const handleEditorSelectionChange = useCallback(
    (nextSelection: RangeStatic, __: Sources, editor: Quill) => {
      console.log('Here');
      const currentSelection = selectionRef.current;
      const hasGainedFocus = !currentSelection && nextSelection;
      const hasLostFocus = currentSelection && !nextSelection;

      if (isEqual(nextSelection, currentSelection)) {
        return;
      }

      selectionRef.current = nextSelection;

      if (hasGainedFocus) {
        handleFocus();
      } else if (hasLostFocus) {
        handleBlur();
      }
    },
    [handleFocus, handleBlur]
  );

  /**
   * Handle Editor Change
   *
   * @param {'text-change'|'selection-change'} eventName
   * @param {Range|Delta} rangeOrDelta
   * @param {Range|Delta} prevRangeOrDelta
   * @param {Sources} sources
   */
  const handleEditorChange = useCallback(
    (
      eventName: 'text-change' | 'selection-change',
      rangeOrDelta: RangeStatic | Delta,
      ___: RangeStatic | Delta,
      sources: Sources
    ) => {
      invariant(editorRef.current, 'No editor initiated to hook.');
      if (eventName === 'text-change') {
        handleEditorTextChange(rangeOrDelta as Delta, sources, editorRef.current);
      } else if (eventName === 'selection-change') {
        handleEditorSelectionChange(rangeOrDelta as RangeStatic, sources, editorRef.current);
      }
    },
    [editorRef, handleEditorTextChange, handleEditorSelectionChange]
  );

  /**
   * Initiate Editor
   */
  const initiateEditor = useCallback(() => {
    invariant(
      editorElementRef.current !== null,
      'No element provided to initiate editor on top of it.'
    );

    invariant(
      options.toolbar || toolbarElementRef !== null,
      'No element provided to insert editor toolbar in it.'
    );

    const instance = new Quill(editorElementRef.current, {
      placeholder,
      readOnly: disabled,
      formats: ['bold', 'italic', 'underline', 'list', 'blockquote', 'direction', 'align'],
      modules: {
        ...(options.toolbar
          ? {
              toolbar: {
                container: toolbarElementRef.current,
              },
            }
          : {}),
      },
    });

    if (value !== undefined) {
      setEditorContents(instance, value);
    }

    // Hook Editor
    instance.on('editor-change', handleEditorChange);

    editorRef.current = instance;

    return () => {
      instance.off('editor-change', handleEditorChange);
    };
  }, [placeholder, disabled, value, options, setEditorContents, handleEditorChange]);

  // Disable/Enable Editor
  useEffect(() => {
    if (editorRef.current) {
      if (disabled) {
        editorRef.current.disable();
      } else {
        editorRef.current.enable();
      }
    }
  }, [disabled]);

  // Change Value
  useEffect(() => {
    if (editorRef.current) {
      const prevContents = contentsRef.current;
      const nextContents = value ?? '';

      if (!isEqualValue(nextContents, prevContents)) {
        setEditorContents(editorRef.current, nextContents);
      }
    }
  }, [value, setEditorContents]);

  // Initiate Editor
  useEffect(() => {
    if (!editorRef.current) {
      initiateEditor();
    }
  }, [initiateEditor]);

  // Render
  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={clsx(classes.root, {
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.fullWidth]: fullWidth,
        [classes.focused]: fcs.focused,
        [classes.formControl]: formControl,
        [classes.marginDense]: fcs.margin === 'dense',
      })}
    >
      <div
        className={clsx(classes.input, {
          [classes.disabled]: fcs.disabled,
          [classes.inputMarginDense]: fcs.margin === 'dense',
          [classes.inputHiddenLabel]: fcs.hiddenLabel,
        })}
        ref={editorElementRef}
      />
      {options.toolbar && <RichInputToolbar ref={toolbarElementRef} />}
      {renderSuffix
        ? renderSuffix({
            ...fcs,
          })
        : null}
    </div>
  );
});

// DEFAULT EXPORT
export default stylesInjector(RichInputBase);
