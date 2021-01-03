import {ComponentType, FieldsetHTMLAttributes} from 'react';

declare module '@material-ui/core/OutlinedInput/NotchedOutline' {
  export interface NotchedOutlineProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
    disabled?: boolean;
    error?: boolean;
    focused?: boolean;
    label: React.ReactNode;
    labelWidth: number;
    notched: boolean;
  }
  export default interface NotchedOutline extends ComponentType<NotchedOutlineProps> {}
}
