import React, { useContext } from 'react';
import { useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';
import ContactForm from './partial/form';
import RightSection from './partial/right-section';
const ContactUs = () => {
  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();
  // console.log(context)


  const containerBox = 'border-2 border-dashed border-[var(--colorPrimary)] p-4 sm:p-8 rounded bg-white shadow-lg';
  return (
    <div>
      <PageTitle
        outletContext={outletContext}
        context={context}
        title="Contact Us"
        sub_title="Need help or have any questions about A-Plus Hire?"
      />

      <div className={`${outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
        <div className={outletContext.containerWidth}>

          <div className={`grid grid-cols-1 lg:grid-cols-12  ${outletContext.gridGap}`}>
            <div className="lg:col-span-8">
              <div className={containerBox}>
                <ContactForm context={context} />
              </div>
            </div>
            <div className='lg:col-span-4'>
              <div className={containerBox}>
                <RightSection context={context} />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )//End return
}//End function

export default ContactUs;