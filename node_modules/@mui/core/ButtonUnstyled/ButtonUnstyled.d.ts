import * as React from 'react';
import { ButtonUnstyledOwnProps } from './ButtonUnstyledProps';
export interface ButtonUnstyledOwnerState extends ButtonUnstyledOwnProps {
    focusVisible: boolean;
    active: boolean;
}
/**
 * The foundation for building custom-styled buttons.
 *
 * Demos:
 *
 * - [Buttons](https://mui.com/components/buttons/)
 *
 * API:
 *
 * - [ButtonUnstyled API](https://mui.com/api/button-unstyled/)
 */
declare const ButtonUnstyled: React.ForwardRefExoticComponent<Pick<ButtonUnstyledOwnProps & Omit<any, keyof ButtonUnstyledOwnProps> & {
    component?: React.ElementType<any> | undefined;
}, string | number | symbol> & React.RefAttributes<any>>;
export default ButtonUnstyled;
