import { Tag, Segmented, Space } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { GetObjectFromArr } from '../../../../services';

const FilterTags = (pr) => {
  const OnCloseTag = (objName, fieldName) => {
    pr.onCloseTag(objName, fieldName);
  }//End function

  const ConvertValueToName = (obj, fieldName) => {
    // console.log(fieldName);
    let value = obj.value;
    if (fieldName === 'state') { value = GetObjectFromArr(obj.value, 'value', pr.listData.states).label; }//End if condition
    if (fieldName === 'search_distance') { value = GetObjectFromArr(obj.value, 'value', pr.listData.searchDistance).label; }//End if condition
    if (fieldName === 'work_status') { value = GetObjectFromArr(obj.value, 'value', pr.listData.workStatus).label; }//End if condition
    if (fieldName === 'availability_hour_range_dr_ref_id') { value = GetObjectFromArr(obj.value, 'value', pr.listData.availability).label; }//End if condition
    if (fieldName === 'years_of_experience') { value = GetObjectFromArr(obj.value, 'value', pr.listData.expYears).label; }//End if condition
    if (fieldName === 'km_to_travel') { value = GetObjectFromArr(obj.value, 'value', pr.listData.kmToTravel).label; }//End if condition
    //@ Multiple Tags
    if (fieldName === 'other_language') { value = ConvertMultipleSelect(value, pr.listData.languages); }//End if condition
    if (fieldName === 'willing_to_provide') { value = ConvertMultipleSelect(value, pr.listData.serviceToProvide); }//End if condition
    if (fieldName === 'further_experience') { value = ConvertMultipleSelect(value, pr.listData.expInFields); }//End if condition
    return <span><span className='font-medium'>{obj.name}:</span> {value}</span>;
  }//End function

  const ConvertMultipleSelect = (value, list) => {
    let dt = [];
    value.forEach(e => { dt.push(GetObjectFromArr(e, 'value', list).label); });
    return '[' + dt.join(', ') + ']';
  }//End if function


  // console.log(pr.listData);
  return (
    <div className='portal-container flex items-center justify-between text-sm mb-3 !py-[9px] !border-b !border-solid !border-b-[var(--colorPrimary)] !rounded-b-none'>
      <div className='[&>.ant-tag-hidden]:!inline-block'>
        <Space size={[0, 8]} wrap>
          Filtered By: &nbsp;
          {pr.tags.userCondition && Object.keys(pr.tags.userCondition).map((item, index) => {
            return (pr.tags.userCondition[item].value && <Tag key={index + item} className="bg-white" closable onClose={() => OnCloseTag('userCondition', item)}>{ConvertValueToName(pr.tags.userCondition[item], item)}</Tag>)
          })}
          {pr.tags.swCondition && Object.keys(pr.tags.swCondition).map((item, index) => {
            return (pr.tags.swCondition[item].value && <Tag key={index + item} className="bg-white" closable onClose={() => OnCloseTag('swCondition', item)}>{ConvertValueToName(pr.tags.swCondition[item], item)}</Tag>)
          })}
        </Space>
      </div>
      <div className='hidden lg:block'>
        <Segmented size="small" defaultValue={pr.defaultSegment} onChange={pr.setSegment} options={[{ label: 'Block', value: 'block', icon: <AppstoreOutlined /> }, { label: 'List', value: 'list', icon: <BarsOutlined /> }]} />
      </div>
    </div>
  )//End return
}//End function

export default FilterTags;