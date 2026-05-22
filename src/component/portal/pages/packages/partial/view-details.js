import React, { useState, useEffect } from 'react';
import { Descriptions, Button } from 'antd';
import { HTTP } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';


const ViewDetails = (pr) => {
  // const [descResponsiveDetails] = useState({ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 });
  const [descResponsiveDetailsTwoCol] = useState({ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 });
  const [descResponsiveDetailsThreeCol] = useState({ xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 1 });
  // const [descResponsiveDetailsFourCol] = useState({ xxl: 4, xl: 4, lg: 4, md: 4, sm: 4, xs: 2 });
  const [getDetailLoader, setGetDetailLoader] = useState(false);
  const [data, setData] = useState({});

  const getDetails = (id) => {
    setGetDetailLoader(true)
    HTTP('get', '/packageViewDetails/' + id).then(res => {
      setGetDetailLoader(false);
      if (!res) { return false; }
      // console.log(res);
      setData(res.data);
    });
  }//End function

  useEffect(() => {
    (pr.id && pr.id !== '') && getDetails(pr.id);
  }, [pr.id])

  return (
    <ScreenLoader active={getDetailLoader}>
      <div className="description-custom">
        <h1>Main Details</h1>
        <Descriptions size="small" layout='vertical' bordered column={descResponsiveDetailsThreeCol} className='three-col-vertical'>
          <Descriptions.Item label="Package Name">{data.name}</Descriptions.Item>
          <Descriptions.Item label="Description">{data.desc}</Descriptions.Item>
          <Descriptions.Item label="Connects">{data.connects}</Descriptions.Item>
        </Descriptions>

        <h1>Pricing</h1>
        <Descriptions size="small" layout='vertical' bordered column={descResponsiveDetailsThreeCol} className='three-col-vertical'>
          <Descriptions.Item label="Free Plan?">{data.is_free_plan ? 'Free' : '-'}</Descriptions.Item>
          <Descriptions.Item label="Regular / Sale Price">
            {data.sale_price ? <span className='flex items-center justify-between'><span><span className='font-bold text-[11px]'>Sale:</span> {data.currency}{data.sale_price}</span> <span><span className='font-bold text-[11px]'>Regular:</span> {data.currency}{data.regular_price}</span></span> :
              <span>{data.currency}{data.regular_price}</span>
            }
          </Descriptions.Item>
        </Descriptions>

        <React.Fragment>
          <h1>List to Show in Website</h1>
          {/* {JSON.stringify(data.list)} */}
          <Descriptions size="small" layout='vertical' bordered column={descResponsiveDetailsThreeCol} className='three-col-vertical single-label'>
            {data.list && Object.keys(data.list.icon).map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <Descriptions.Item label='Icon'>
                    {data.list.icon[item] === 'las la-check' && 'Active'}
                    {data.list.icon[item] === 'las la-times' && 'In Active'}
                    {data.list.icon[item] === 'las la-exclamation' && 'Exclamation'}
                  </Descriptions.Item>
                  <Descriptions.Item label='Label'>
                    <span className={data.list.strike[item] ? 'line-through' : ''}>{data.list.label[item]}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label='Strike'>
                    {data.list.strike[item] ? 'TRUE' : 'FALSE'}
                  </Descriptions.Item>
                </React.Fragment>
              )
            })}
          </Descriptions>
        </React.Fragment>

        <h1>Inserted Details</h1>
        <Descriptions size="small" layout='vertical' bordered column={descResponsiveDetailsTwoCol} className='two-col-vertical'>
          <Descriptions.Item label="Created Date">{data.createdDate}, {data.createdTime}</Descriptions.Item>
          <Descriptions.Item label="Created By">{data.createdBy}</Descriptions.Item>
          {data.updatedBy &&
            <React.Fragment>
              <Descriptions.Item label="Updated Date">{data.updatedDate}, {data.updatedTime}</Descriptions.Item>
              <Descriptions.Item label="Updated By">{data.updatedBy}</Descriptions.Item>
            </React.Fragment>
          }
        </Descriptions>
      </div>
    </ScreenLoader>
  )//End render
}//End function

export default ViewDetails;