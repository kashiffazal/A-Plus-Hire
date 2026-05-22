import { AntInput } from '../../../../../mutualComponents/antd-fields';
import MultipleWorkExperience from './partial/multiple_work_experience';

const Step2_4 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  const fp = pr.fp;
  return (
    <>
      <AntInput
        name="have_experience"
        type="radio"
        label="Do you have any disability support worker experience?"
        size="large"
        // vertical
        radioOptions={[
          { label: 'No' },
          { label: 'Yes' }
        ]}
        onChange={(value, name) => ocf(value, name)}
      />

      {fv.have_experience === 'Yes' &&
        <>
          <hr className='my-3' />
          <AntInput
            name="years_of_experience"
            type="select"
            label="If yes, how many years of experience you have?"
            size="large"
            filter={true}
            options={pr.expYearsList}
            onChange={(value, name) => ocf(value, name)}
          />
          <span>
            {fv.years_of_experience &&
              <>
                <span className='[&>*]:mb-3'>
                  <p className='mt-3'>Please describe your working experience in detail</p>
                  <p>Your work history can include employment in Australia or abroad and need not be in the disability or health sectors. This may encompass the following:</p>
                  <ul className='list-disc list-inside'>
                    <li>Paid or volunteer work</li>
                    <li>Casual or part time</li>
                    <li>Interning</li>
                    <li>Work Experience</li>
                    <li>Any other relevant experiences you have</li>
                  </ul>
                </span>
                <MultipleWorkExperience
                  industryList={pr.industryList}
                  fp={fp}
                  onChange={(e) => ocf(e, 'work_experience')}
                  formValues={fv.work_experience}
                  context={pr.context}
                />
              </>
            }
          </span>
        </>
      }
    </>
  )//End return
}//End function

export default Step2_4;