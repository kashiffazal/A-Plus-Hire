import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step3 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="have_car"
        type="radio"
        label="Do you have your own reliable car along with valid driver license?"
        size="large"
        // vertical
        radioOptions={[
          { label: 'Yes' },
          { label: 'No' }
        ]}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.have_car === 'Yes' &&
        <AntInput
          name="is_car_insurance"
          type="radio"
          label="Is your car insured?"
          size="large"
          // vertical
          radioOptions={[
            { label: 'Yes' },
            { label: 'No' },
          ]}
          onChange={(value, name) => ocf(value, name)}
        />
      }
      <hr/>

      <p>Are you happy to travel? Usually, the clients will be located in different areas, and you must travel a minimum from one client to another, so you must be comfortable with traveling</p>
      <AntInput
        name="km_to_travel"
        type="select"
        label="How many KM you are happy to travel?"
        size="large"
        options={pr.kmToTravelList}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.km_to_travel === 54 && //Other
        <AntInput
          type='textarea'
          label="Please write about your travel in KM"
          name="km_to_travel_other"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }
    </div>
  )//End return
}//End function

export default Step3;