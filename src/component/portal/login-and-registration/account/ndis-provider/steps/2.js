import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step2 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="gender"
        type="radio"
        label="Your Gender"
        size="large"
        vertical
        radioOptions={[
          { label: 'Male' },
          { label: 'Female' },
          { label: 'Prefer not to say' },
          { label: 'Prefer to self-describe' }
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.gender === 'Prefer to self-describe' &&
        <AntInput
          type='textarea'
          label="Please explain below"
          name="self_describe_explain"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] md:!h-[113px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
    </div>
  )//End return
}//End function

export default Step2;