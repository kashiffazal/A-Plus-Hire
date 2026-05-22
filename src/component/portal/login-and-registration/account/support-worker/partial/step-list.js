import { useEffect } from 'react';
import { Steps } from 'antd';
const StepList = (pr) => {

  useEffect(() => {
    let stepsCount = pr.stepsCount - 1;
    let tTitle = titlesAndSubTitle[stepsCount];
    let title = tTitle ? tTitle.title : '';
    let subTitle = (tTitle && tTitle.subTitle && tTitle.subTitle[pr.subStepsCount[stepsCount] - 1]) ? tTitle.subTitle[pr.subStepsCount[stepsCount] - 1].title : '';
    pr.setHeadTitle([title, subTitle]);
  }, [pr.stepsCount, pr.subStepsCount])


  const titlesAndSubTitle = [{
    title: 'Intro & Personal Details',
    subTitle: [
      { title: 'Introduction about you' },
      { title: 'Languages your speak' },
      { title: 'Emergency contact details' },
      { title: 'Some More About You' }]
  }, {
    title: 'Your Work and Experience',
    subTitle: [
      { title: 'Work Status' },
      { title: 'Availability in a week' },
      { title: 'Support willing to provide' },
      { title: 'Working Experience' },
      { title: 'Other Experience' },
      { title: 'You\'re Gender Preferences' }
    ]
  }, {
    title: ['Travel arrangement', 'Car with valid driver license']
  }];
  return (
    //@ Don't Show on Modal with Edit mode
    //@ It will just return heading data on modal
    !pr.withinModal &&
    <Steps
      direction="vertical"
      current={pr.stepsCount - 1}
      size='small'
      items={[{
        title: titlesAndSubTitle[0].title,
        description:
          <Steps
            progressDot
            current={pr.subStepsCount[0] - 1}
            size='small'
            direction="vertical"
            className='sub-step h-[120px]'
            items={titlesAndSubTitle[0].subTitle}
          />
      }, {
        title: titlesAndSubTitle[1].title,
        description:
          <Steps
            progressDot
            current={pr.subStepsCount[1] - 1}
            size='small'
            direction="vertical"
            className='sub-step h-[180px]'
            items={titlesAndSubTitle[1].subTitle}
          />
      }, { title: titlesAndSubTitle[2].title[0] }]}
    />
  )//End return
}//End function

export default StepList;