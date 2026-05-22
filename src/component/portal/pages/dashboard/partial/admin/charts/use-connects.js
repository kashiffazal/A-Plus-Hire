import React, { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';

const UseConnectsChart = (pr) => {
  const [data, setData] = useState([]);

  useEffect(() => { pr.data && setData(pr.data); }, [pr.data]);

  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    legend: {
      position: 'top-right', // Set the legend position to 'right'
    },
  };

  return (
    <div className={`relative pt-[40px] h-full ${pr.className ? pr.className : ''}`}>
      <div className='absolute top-0'>
        <h3 className="text-xl font-semibold">Connects Usage</h3>
        <div className='h-2 !my-4'>
          <div className="border-divider-right mx-auto !left-[-13px] lg:float-left lg:!left-[0px]"></div>
        </div>
      </div>
      <div className='h-full'>
        <Area {...config} />
      </div>
    </div>
  )//End return
}//End function

export default UseConnectsChart;