import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step2_3 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="willing_to_provide"
        type="checkbox"
        // group={true}
        label="What kind of support you are willing to provide?"
        size="large"
        vertical
        group={pr.serviceList}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.willing_to_provide && fv.willing_to_provide.includes(21) && //Others
        <AntInput
          type='textarea'
          label="Please write below in detail"
          name="willing_to_provide_other"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] md:!h-[324px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
    </div>
  )//End return
}//End function

export default Step2_3;