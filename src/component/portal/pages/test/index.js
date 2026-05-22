import { AntInput } from '../../../mutualComponents/antd-fields';
import { Form } from 'antd';
import { SetNumberMask } from '../../../services';
import { useEffect } from 'react';

const NumberInputMask = () => {
  useEffect(() => {
    SetNumberMask('field-number');
  }, [])

  return (
    <Form onFinish={(e) => console.log(e)}>
      <AntInput name="field-number" rules={{ min: process.env.REACT_APP_MOBILE_FORMAT_NUMBER.length+1, message: 'Invalid Number' }} />
      <button>Click</button>
    </Form>
  )
}

export default NumberInputMask;