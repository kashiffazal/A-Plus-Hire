import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step1_4 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="any_health_conditions"
        type="radio"
        label="Do you have, or have you ever had any disability or health conditions including, allergies, illnesses, injuries or diseases lasting for more than 6 months and that may adversely impact on your abilities to carry out the duties of your role?"
        size="large"
        // vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' },
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.any_health_conditions === 'Yes' &&
        <AntInput
          type='textarea'
          label="if yes, please describe in detail"
          name="any_health_conditions_details"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
      <hr />

      <AntInput
        name="any_existing_injury"
        type="radio"
        label="Do you have any pre-existing injury or disease which you are aware of or could reasonably be expected to foresee, that could be affected by the nature of the duties and responsibilities of the position for which you are applying?"
        size="large"
        // vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' },
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.any_existing_injury === 'Yes' &&
        <AntInput
          type='textarea'
          label="if yes, please describe in detail"
          name="any_existing_injury_details"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
      <hr />

      <AntInput
        name="clad_background"
        type="radio"
        label="Are you of a culturally and / or linguistically Diverse (CALD) background?"
        size="large"
        vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' },
          { label: 'Prefer not to say' },
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      <hr />
      <AntInput
        name="identify_as_lesbian"
        type="radio"
        label="Do you identify as Lesbian, Gay, Bi-Sexual, Transgender, Intersex and / or Queer?"
        size="large"
        vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' },
          { label: 'Prefer not to say' },
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      <hr />
      <AntInput
        name="any_guilt"
        type="radio"
        label="Do you have any convictions, finding of guilt and/or pending police charges against you that are less than 10 years old?"
        size="large"
        vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' },
          { label: 'Prefer not to say' },
        ]}
        onChange={(value, name) => ocf(value, name)}
      />

    </div>
  )//End return
}//End function

export default Step1_4;