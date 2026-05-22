import { useEffect } from 'react';
import { Steps } from 'antd';
const StepList = (pr) => {

  const titlesAndSubTitle = [{
    title: ['Introduction about you', 'Write your full introduction']
  }, {
    title: ['Your Gender', 'Select your Gender']
  }, {
    title: ['Services you are need help with', 'What NDIS support services you are need help with?']
  }];

  useEffect(() => {
    let stepsCount = pr.stepsCount - 1;
    let tTitle = titlesAndSubTitle[stepsCount];
    let title = tTitle ? tTitle.title : '';
    let subTitle = (tTitle && tTitle.subTitle && tTitle.subTitle[pr.subStepsCount[stepsCount] - 1]) ? tTitle.subTitle[pr.subStepsCount[stepsCount] - 1].title : '';
    pr.setHeadTitle([title, subTitle]);
  }, [pr.stepsCount, pr.subStepsCount]);

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