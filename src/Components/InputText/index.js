import React, {forwardRef} from 'react';

import {Input} from './styles';

const InputText = forwardRef((props, ref) => {
  return <Input {...props} ref={ref} />;
});
export default InputText;
