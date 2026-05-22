import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step2_6 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="gender_preferences"
        type="radio"
        label="You're Gender Preferences"
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
      {fv.gender_preferences === 'Prefer to self-describe' &&
        <AntInput
          type='textarea'
          label="Please write below in detail"
          name="gender_preferences_other"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] md:!h-[113px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
    </div>
  )//End return
}//End function

export default Step2_6;