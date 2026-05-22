import { useEffect } from 'react';
import { Form, Button } from 'antd';
import { AntInput } from '../../../../mutualComponents/antd-fields';

const SearchFormPortal = (pr) => {
  const [form] = Form.useForm();

  useEffect(() => {
    //@ Reset fields on close tag
    let formObj = { [pr.closeTag.fieldName]: '' };
    if (pr.closeTag.fieldName === 'other_language' || pr.closeTag.fieldName === 'willing_to_provide' || pr.closeTag.fieldName === 'further_experience') {
      formObj = { [pr.closeTag.fieldName]: [] };
    }//End if condition
    form.setFieldsValue(formObj);
  }, [pr.closeTag])


  const fullOnMD = 'col-span-1 sm:col-span-2 md:col-span-1';
  return (
    <div className="portal-container">
      <h4 className="bg-[var(--colorPrimary)] text-white font-semibold text-center m-[-20px] mb-[10px] py-[10px] px-[20px] rounded-t">Search By</h4>
      <Form form={form} onFinish={pr.onFinish} layout="vertical" className='form-style' autoComplete="off">
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
          <div><AntInput label="Post Code" name="post_code" placeholder="Please type post code" onBlur={(value, name) => pr.ocf({ [name]: { type: 'like', value, name: 'Post Code' } }, 'userCondition')} noRequired /></div>
          <div><AntInput label="Suburb" name="suburb" placeholder="Please type suburb" onBlur={(value, name) => pr.ocf({ [name]: { type: 'like', value, name: 'Suburb' } }, 'userCondition')} noRequired /></div>
          <div><AntInput label="State" name="state" type="select" filter={true} loading={pr.getLoader} options={pr.listData.states} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'State' } }, 'userCondition')} noRequired /></div>
          <div><AntInput label="Distance from the search area" name="search_distance" type="select" filter={true} loading={pr.getLoader} options={pr.listData.searchDistance} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Distance from the search area' } }, 'userCondition')} noRequired /></div>

          <div><AntInput label="Gender" name="gender" type="select" filter={true} loading={pr.getLoader} options={pr.listData.gender} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Gender' } }, 'swCondition')} noRequired /></div>
         

            <div className=''>
              <AntInput text="English as Main Language" name="is_english_main_language" type="checkbox" onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value: (value ? 'Yes' : ''), name: 'English as Main Language' } }, 'swCondition')} noRequired
                containerClassName="pt-0 sm:pt-[26px] md:pt-0"
              />
            </div>


          <div className={fullOnMD}><AntInput label="Other Languages" name="other_language" mode='multiple' type="select" filter={true} loading={pr.getLoader} options={pr.listData.languages} onChange={(value, name) => pr.ocf({ [name]: { type: 'like-arr-or', value, name: 'Other Languages' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Work Status" name="work_status" type="select" filter={true} loading={pr.getLoader} options={pr.listData.workStatus} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Work Status' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Availability" name="availability_hour_range_dr_ref_id" type="select" filter={true} loading={pr.getLoader} options={pr.listData.availability} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Availability' } }, 'swCondition')} noRequired /></div>

          <div className={fullOnMD}><AntInput label="Support Services" name="willing_to_provide" mode='multiple' type="select" filter={true} loading={pr.getLoader} options={pr.listData.serviceToProvide} onChange={(value, name) => pr.ocf({ [name]: { type: 'like-arr-or', value, name: 'Support Services' } }, 'swCondition')} noRequired /></div>
          <div className={fullOnMD}><AntInput label="Experience by Fields" name="further_experience" mode='multiple' type="select" filter={true} loading={pr.getLoader} options={pr.listData.expInFields} onChange={(value, name) => pr.ocf({ [name]: { type: 'like-arr-or', value, name: 'Experience by Fields' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Years of experience" name="years_of_experience" type="select" filter={true} loading={pr.getLoader} options={pr.listData.expYears} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Years of experience' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Have Car" name="have_car" type="select" filter={true} loading={pr.getLoader} options={pr.listData.haveCar} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Have Car' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Happy to Travel" name="km_to_travel" type="select" filter={true} loading={pr.getLoader} options={pr.listData.kmToTravel} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Happy to Travel' } }, 'swCondition')} noRequired /></div>
          <div><AntInput label="Aboriginal or Torres Strait Islander origin" name="cultural_diversity" type="select" filter={true} loading={pr.getLoader} options={pr.listData.islanderOrigin} onChange={(value, name) => pr.ocf({ [name]: { type: 'equal', value, name: 'Aboriginal or Torres Strait Islander origin' } }, 'swCondition')} noRequired /></div>

          <div className={`${fullOnMD} sticky bottom-0 z-10 mt-3 !mb-0`}>
            <div className='flex justify-between rounded-b border-t border-solid border-[var(--colorPrimary)] m-[-20px] mt-0 pt-[15px] pb-[20px] px-[20px] bg-[var(--bgPrimary)]'>
              <Button className="btn-light btn-shadow w-[48%]" size="large" disabled={pr.loader} onClick={() => { form.resetFields(); pr.resetAll(); }}>Reset</Button>
              <Button type="primary" className="btn-shadow w-[48%]" size="large" htmlType="submit" loading={pr.loader}>Search</Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )//End return
}//End function

export default SearchFormPortal;