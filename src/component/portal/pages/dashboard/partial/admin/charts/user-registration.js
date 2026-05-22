import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const UserRegistrationChart = (pr) => {
  const [data, setData] = useState([]);

  useEffect(() => { pr.data && setData(pr.data) }, [pr.data]);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ['#1979C9', '#D62A0D', '#FAA219'],
    legend: {
      position: 'top-right', // Set the legend position to 'right'
    },
  };

  return (
    <div className={`relative pt-[30px] h-full ${pr.className ? pr.className : ''}`}>
      <div className='absolute top-0'>
        <h3 className="text-xl font-semibold">User Registration by Month</h3>
        <div className='h-2 !my-4'>
          <div className="border-divider-right mx-auto !left-[-13px] lg:float-left lg:!left-[0px]"></div>
        </div>
      </div>
      <div className='h-full'>
        <Line {...config} />
      </div>
    </div>
  )//End return
}//End function
export default UserRegistrationChart;
