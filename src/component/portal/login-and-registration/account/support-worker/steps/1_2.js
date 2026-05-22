import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step1_2 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        name="is_english_main_language"
        type="radio"
        label="Is English your main language?"
        size="large"
        // vertical
        radioOptions={[
          { label: 'Yes' },
          { label: 'No' }
        ]}
        className='!mt-[9px] mb-[10px]'
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.is_english_main_language === 'No' &&
        <AntInput
          name="main_language"
          type="select"
          label="If no, Then please select your main language"
          size="large"
          filter={true}
          options={pr.languagesList}
          setValueLabel={['id','name']}
          onChange={(value, name) => ocf(value, name)}
        />
      }
      <div className='md:col-span-2'>
        <AntInput
          name="other_language"
          type="select"
          label="Please select other languages you can speak"
          size="large"
          filter={true}
          mode='multiple'
          options={pr.languagesList}
          noRequired
          onChange={(value, name) => ocf(value, name)}
        />
      </div>
    </div>
  )//End return
}//End function

export default Step1_2;