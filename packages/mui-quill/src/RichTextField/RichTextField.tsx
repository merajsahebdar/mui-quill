import FormHelperText, {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import InputLabel, {InputLabelProps} from '@material-ui/core/InputLabel';
import FormControl, {FormControlProps} from '@material-ui/core/FormControl';
import {forwardRef} from 'react';

import FilledRichInput from '../FilledRichInput';
import OutlinedRichInput from '../OutlinedRichInput';
import type {RichInputBaseProps} from '../RichInputBase';

// Rich Text Field Props
type RichTextFieldProps = Omit<FormControlProps, 'onChange' | 'onFocus' | 'onBlur'> & {
  variant?: 'filled' | 'outlined';
  value?: string;
  defaultValue?: string;
  required?: boolean;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  FormHelperTextProps?: FormHelperTextProps;
  InputLabelProps?: InputLabelProps;
  options?: RichInputBaseProps['options'];
  onChange?: RichInputBaseProps['onChange'];
  onFocus?: RichInputBaseProps['onFocus'];
  onBlur?: RichInputBaseProps['onBlur'];
};

const variantInputComponent = {
  filled: FilledRichInput,
  outlined: OutlinedRichInput,
};

/**
 * Rich Text Field
 *
 * @param {RichTextFieldProps} props
 * @returns {JSX.Element}
 */
const RichTextField = forwardRef<HTMLDivElement, RichTextFieldProps>(function RichTextField(
  props,
  ref
) {
  const {
    children,
    className,
    color = 'primary',
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    InputLabelProps,
    label,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    value,
    variant = 'filled',
    options,
    ...other
  } = props;

  const inputLabelId = label && id ? `${id}-label` : undefined;
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

  const InputComponent = variantInputComponent[variant];

  // Render
  return (
    <FormControl
      className={className}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      required={required}
      color={color}
      variant={variant}
      ref={ref}
      {...other}
    >
      {label && (
        <InputLabel htmlFor={id} id={inputLabelId} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}

      <InputComponent
        aria-describedby={helperTextId}
        defaultValue={defaultValue}
        fullWidth={fullWidth}
        value={value}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        classes={{} as any}
        options={options}
        label={label}
      />

      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
});

// DEFAULT EXPORT
export default RichTextField;
