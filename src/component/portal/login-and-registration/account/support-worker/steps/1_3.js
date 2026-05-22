import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step1_3 = (pr) => {
  const ocf = pr.onChangeField;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="emergency_name"
        label="Name of the person"
        size="large"
        onBlur={(value, name) => ocf(value, name)}
      />
      <AntInput
        name="emergency_email"
        type="email"
        label="Email"
        size="large"
        onChange={(value, name) => ocf(value, name)}
      />
      <AntInput
        name="emergency_contact"
        label="Contact number"
        size="large"
        onChange={(value, name) => ocf(value, name)}
      />
      <AntInput
        name="emergency_relationship"
        label="Relationship "
        size="large"
        onBlur={(value, name) => ocf(value, name)}
      />
    </div>
  )//End return
}//End function

export default Step1_3;