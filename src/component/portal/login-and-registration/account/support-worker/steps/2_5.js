import { AntInput } from '../../../../../mutualComponents/antd-fields';

const Step2_4 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>

      <AntInput
        name="further_experience"
        type="checkbox"
        label="Do you have any experience in related to the following?"
        size="large"
        vertical
        group={pr.expList}
        onChange={(value, name) => ocf(value, name)}
      />
      {fv.further_experience && fv.further_experience.includes(48) && //Others
        <AntInput
          type='textarea'
          label="Please write below in detail"
          name="further_experience_other"
          size="large"
          placeholder="Please type here"
          className='!h-[60px] md:!h-[474px] !resize-none'
          onBlur={(value, name) => ocf(value, name)}
        />
      }

    </div>
  )//End return
}//End function

export default Step2_4;