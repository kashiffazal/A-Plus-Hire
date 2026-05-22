import { useEffect } from 'react';
import { Steps } from 'antd';
const StepList = (pr) => {

  useEffect(() => {
    let stepsCount = pr.stepsCount - 1;
    let tTitle = titlesAndSubTitle[stepsCount];
    let title = tTitle ? tTitle.title : '';
    let subTitle = (tTitle && tTitle.subTitle && tTitle.subTitle[pr.subStepsCount[stepsCount] - 1]) ? tTitle.subTitle[pr.subStepsCount[stepsCount] - 1].title : '';
    pr.setHeadTitle([title, subTitle]);
  }, [pr.stepsCount, pr.subStepsCount]);


  const titlesAndSubTitle = [{
    title: ['Introduction about you', 'Write in detail about your company']
  }, {
    title: ['Your Gender', 'Select your Gender']
  }, {
    title: ['NDIS support services provide', 'What kind of services you provide?']
  }];
  return (
    //@ Don't Show on Modal with Edit mode
    //@ It will just return heading data on modal
    !pr.withinModal &&
    <Steps
      direction="vertical"
      current={pr.stepsCount - 1}
      size='small'
      items={[
        { title: titlesAndSubTitle[0].title[0] },
        { title: titlesAndSubTitle[1].title[0] },
        { title: titlesAndSubTitle[2].title[0] }
      ]}
    />
  )//End return
}//End function

export default StepList;