import { AntInput } from '../../../../../mutualComponents/antd-fields';
import MultipleDaysAvailability from './partial/multiple_days_availability';

const Step2_1 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  const fp = pr.fp;
  return (
    <div className={`grid grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
      <AntInput
        type='select'
        label="Please select how many hours in a week you are willing to work. (Note that you can always update your availability from your user profile or mark yourself as not available at the moment)"
        name="availability"
        size="large"
        filter={true}
        options={pr.availabilityList}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.availability === 10 && //Hours in detail
        <>
          <p className='text-center flex items-center justify-center p-2 font-semibold border border-solid border-[var(--colorPrimary)] rounded min-h-[43.75px] bg-[var(--bgPrimary)]'>Select Hours in detail about your availability</p>
          <MultipleDaysAvailability
            timeList={pr.timeList}
            fp={fp}
            onChange={(e) => ocf(e, 'days_availability')}
            formValues={fv.days_availability}
          />
        </>
      }
    </div>
  )//End return
}//End function

export default Step2_1;