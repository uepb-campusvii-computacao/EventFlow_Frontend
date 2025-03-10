import ReactInputMask from 'react-input-mask';
import {  Input, InputProps } from '../ui/input';
import { forwardRef } from 'react';
 
interface MaskedInputProps extends InputProps {
  mask: string;
  alwaysShowMask?: boolean;
  maskChar?: string;
}

const MaskedInput = forwardRef<ReactInputMask, MaskedInputProps>(
  ({ required,mask, alwaysShowMask, maskChar, ...props }, ref) => {
  return (<ReactInputMask
          {...props}
          mask={mask}
          alwaysShowMask={alwaysShowMask}
          maskChar={maskChar}
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          onBlur={props.onBlur}
          ref={ref}
        >
          {(inputProps) => (
            <Input
              {...inputProps} disableUnderline
            />
          )}
        </ReactInputMask>)

          });

export default MaskedInput;