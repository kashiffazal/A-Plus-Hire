import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step3 = (pr) => {
  const ocf = pr.onChangeField;
  // const fv = pr.fv;
  return (
    <AntInput
      name="services_you_need"
      type="checkbox"
      // group={true}
      label="What kind of NDIS support services you are need help with?"
      size="large"
      vertical
      group={pr.servicesList}
      onChange={(value, name) => ocf(value, name)}
    />
  )//End return
}//End function

export default Step3;