import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step2_1 = (pr) => {
  const ocf = pr.onChangeField;
  // const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="work_status"
        type="radio"
        label="Your work status in Australia"
        size="large"
        vertical
        radioOptions={pr.workStatusList}
        onChange={(value, name) => ocf(value, name)}
      />
    </div>
  )//End return
}//End function

export default Step2_1;