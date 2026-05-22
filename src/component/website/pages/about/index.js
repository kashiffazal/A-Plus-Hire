import React, { useContext } from 'react';
import { useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';

const AboutUs = () => {
  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();
  // console.log(context)

  const documentList = [
    { name: 'NDIS Workers Screening Check' },
    { name: 'COVID - 19 Vaccinations Proof' },
    { name: 'Resume' },
    { name: 'Driving License' },
    { name: 'Car Insurance details' },
    { name: 'Car Registration details' },
    { name: 'Passport copy (if you are a foreigner)' },
    { name: 'Current Police Check' },
    { name: 'Working with Children\'s Card' },
    { name: 'First Aid Certificate' },
    { name: 'Manual Handling Certificate' },
    { name: 'Food Handling Certificate' },
    { name: 'Visa details along with working rights' },
    { name: 'NDIS Worker Orientation Completion Certificate' },
    { name: 'Supporting Effective Communication' },
    { name: 'COVID-19 Infection Control Training Certificate' },
    { name: 'Diploma of Nursing' },
    { name: 'Certificate 4 in Aged Care' },
    { name: 'Certificate 3 in Disability or Individual Support' },
    { name: 'Certificate 4 in Disability or Individual Support' },
    { name: 'Certificate 4 or Diploma in Mental Health' },
    { name: 'Any other relevant qualifications' },
  ];

  return (
    <div>

      <PageTitle
        outletContext={outletContext}
        context={context}
        title="About Us"
        sub_title="Know about us, Who we are"
      />

      <div className={`${outletContext.sectionPadding}`}>
        <div className={outletContext.containerWidth}>

          <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${outletContext.gridGap}`}>
            <div className='lg:col-span-6 text-center md:text-left [&>*]:mb-3'>
              <h2 className={context.data.h2}>Know About Us</h2>
              <div className="border-divider-right !my-4"></div>
              <p>A Plus Hire's objective is to connect the experienced and skilled NDIS support staff and the NDIS participants looking for daily/weekly/fortnightly, or monthly support.</p>
              <p>You can search our web portal for the relevant best support worker from the list of available staff.</p>
              <p>We offer Support Workers of the highest calibre throughout Australia. We look for trustworthy employees to join our team as we provide care and support to our customers at home and in the community.</p>
              <p>Enjoy career advancement opportunities, flexible shifts that fit your schedule, and helpful and welcoming staff.</p>
            </div>
            <div className="lg:col-span-6 relative w-full sm:w-9/12 lg:w-full mx-auto">
              <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask-3-3.jpg`} alt="" className="hero-img-mask-3 w-auto" />
            </div>
          </div>

        </div>
      </div>




      <div className={`${outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
        <div className={outletContext.containerWidth}>
          <div className='text-center max-w-3xl mx-auto [&>*]:mb-3'>
            <h2 className={context.data.h2}>What makes A-Plus Hire a unique platform?</h2>
            <div className="border-divider-left-right !my-4 mx-auto !left-0"></div>
            <p>A-Plus Hire ensures that all our staff is competent and qualified; therefore, we always collect the basic info and the required documents while they apply with us.</p>
            <p>The most common list of the documents our staff have is as follows:</p>
          </div>
          <div className={`grid grid-cols-1 lg:grid-cols-3 items-center gap-2 mt-5`}>
            {documentList.map((item, key) =>
              <div className='
              flex items-center border border-solid border-[var(--borderColor)] py-3 px-4 leading-3 text-sm bg-white rounded
                  transition hover:bg-[var(--bgColor)] hover:border-[var(--colorPrimary)] hover:shadow-lg
              '>
                <i className='las la-check-double text-lg mr-3 text-[var(--colorPrimary)]' />
                <span className='leading-4'>{item.name}</span>
              </div>
            )}


          </div>
        </div>
      </div>


    </div>
  )//End return
}//End function

export default AboutUs