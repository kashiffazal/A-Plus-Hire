import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';

const PrivacyPolicy = () => {
  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();
  return (
    <div>
      <PageTitle
        outletContext={outletContext}
        context={context}
        title="Privacy Policy"
        sub_title="Please read carefully"
      />

      <div className={`${outletContext.sectionPadding}`}>
        <div className={`${outletContext.containerWidth}  [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Regarding This Policy</h2>
          <div className="border-divider-right !my-4"></div>

          <h3 className={context.data.h3}>Objects of this Policy</h3>
          <p>When you interact with "{context.data.app_data.company_name}", particularly when you access and utilize the Platform, we are dedicated to respecting and safeguarding your privacy. The Privacy Act of 1988 (Cth), the Australian Privacy Principles (APPs), and other pertinent privacy regulations are binding on "{context.data.app_data.company_name}", and it complies with them.</p>
          <p>As it relates to your interactions and engagement with "{context.data.app_data.company_name}" as well as your access to and use of the Platform, this Policy explains how we gather, use, keep, and disclose your personal information.</p>
          <p>If a phrase in this Policy is capitalized but not otherwise defined</p>
          <p>If a phrase is capitalized but left undefined in this Policy, it has the same meaning as it does in our Terms of Use.</p>

          <h3 className={context.data.h3}>Acceptance of this Policy</h3>
          <p>By using the Platform, you acknowledge that you have read, understood, and agreed to the terms of this Policy and that you consent to the collection, storage, use, and disclosure of your personal information, including any sensitive information, in the ways set out in this Policy. To understand our practices involving your personal information, please carefully read this Policy.</p>

          <h3 className={context.data.h3}>Modifications to this Policy</h3>
          <p>According to this clause, we retain the right to change this Policy at any moment. If we update this Policy, we'll post the new version of it on the Platform. Any modifications to this Policy will take effect as soon as they are submitted to the Platform. You will be deemed to have accepted such modifications if you continue to use the Platform after such an upload.</p>
          <p>By posting a notice of the changes on the Platform and/or sending an email to the address you designated in your Account, we will let you know if we make any significant changes to this Policy.</p>
          <p>You can deactivate your Account, stop using the Platform, and cancel your agreement with "{context.data.app_data.company_name}" if you don't agree with the updated Policy (in accordance with the terms of the applicable agreement)</p>
        </div>
      </div>


      <div className={`${outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Information types that we compile</h2>
          <div className="border-divider-right !my-4"></div>

          <h3 className={context.data.h3}>Your cooperation with "{context.data.app_data.company_name}"</h3>
          <p>There are many ways that you can engage with "{context.data.app_data.company_name}", its representatives or the Platform including (but not limited to) via telephone, email, post or in person.</p>
          <p>Depending on how you engage with "{context.data.app_data.company_name}" and its representatives and use the Platform, we may ask you to share, or may collect your personal information.</p>


          <h3 className={context.data.h3}>Personal details</h3>
          <p>Any information or opinion that identifies you or that may be used to identify, contact, or find you falls within the definition of "personal information" as defined in the Privacy Act. Your name, address, phone number, and birthdate are typical instances. It is entirely up to you whether or not to provide your personal information (including sensitive information), but you might not be able to use all of the Platform's features or utilize its services to their fullest extent if you withhold certain personal information from "{context.data.app_data.company_name}".</p>

          <h3 className={context.data.h3}>Different categories of personal data</h3>
          <p>Depending on how you interact with "{context.data.app_data.company_name}", we may gather different sorts of information from you. The four major kinds of data we gather are listed below in no particular order.</p>


          <h3 className={context.data.h3}>Details you provide to us</h3>
          <p>In general, we get the following personal data from you through the Platform (including if you upload data or content there), by phone, email, mail, or in person.</p>
          <p>Information about your account: We may request and gather your</p>
          <ul className="list-outside list-disc ml-[18px] [&>*]:mb-0 grid grid-cols-1 md:grid-cols-2 gap-1">
            <li>First and surname names</li>
            <li>Birth dates</li>
            <li>Postal and residential addresses</li>
            <li>Email addresses</li>
            <li>Phone numbers</li>
            <li>Profile pictures</li>
            <li>Academic credentials</li>
            <li>Certifications (if any), skills and experience, and job history.</li>
            <li>Personal interests</li>
            <li>Gender</li>
            <li>Language preferences</li>
            <li>Hourly rates</li>
            <li>Availability</li>
            <li>Support Needs</li>
            <li>Immunization history</li>
            <li>Housing circumstances</li>
            <li>Including details on those you live with and/or who provide care and assistance for you (if necessary)</li>
          </ul>
          <p>Background information about you that will be included in your profile, such as your criminal history, any regional restrictions or preferences, and lifestyle or biographical specifics.</p>

          <h3 className={context.data.h3}>Identification verification information</h3>
          <p>In order to confirm your identification, we may request and collect identity verification information (such as your Tax File Number, Australian Business Number, business name, copies of your government-issued ID, passport, or driver's license).</p>

          <h3 className={context.data.h3}>Financial Information</h3>
          <p>We may ask you for financial information, such as your credit card number, bank account information, insurance status, superannuation fund information, National Disability Insurance Scheme (NDIS) number, and information about your superannuation fund.</p>

          <h3 className={context.data.h3}>Communications with "{context.data.app_data.company_name}" and other Users</h3>
          <p>We monitor, record, and retain any communications you have with "{context.data.app_data.company_name}" and other Users through the Platform, as well as any information you choose to give them.</p>

          <h3 className={context.data.h3}>Job applications</h3>
          <p>If you submit an application for a position with "{context.data.app_data.company_name}", we will compile the data you offer about your professional background, educational background, and abilities.</p>


        </div>
      </div>


      <div className={`${outletContext.sectionPadding}`}>
        <div className={`${outletContext.containerWidth}  [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Information you provide to us automatically</h2>
          <div className="border-divider-right !my-4"></div>
          <p>We automatically gather some information from you when you use the Platform, including personal data.</p>

          <h3 className={context.data.h3}>Usage data</h3>
          <p>We track your interactions with the Platform, including the sites or content you see, the searches you conduct, the Bookings you make, the contacts you make with other Users, and other activities you perform on the Platform.</p>

          <h3 className={context.data.h3}>Records of engagements</h3>
          <p>If you contact "{context.data.app_data.company_name}", for instance, through the Platform, by phone, email, mail, or in person, we will automatically record any personal information you give us, as well as any documents you submit through the Platform.</p>

          <h3 className={context.data.h3}>Information from devices and log files</h3>
          <p>When you access and use the Platform, we automatically record log data and information about your device. This data consists of, among other things, a record of your interactions with the platform, your clicks, scrolls, and other actions thereon, as well as your IP address, access dates and times, hardware and software information, device information, device event information, unique identifiers, crash data, cookie data, and the pages you've visited or interacted with prior to or following your use of the platform. This kind of data is used by us to manage the Platform and spot trends.</p>

          <h3 className={context.data.h3}>Cookies</h3>
          <p>By placing and accessing cookies on your computer, we can gather certain anonymous information about how you use the Platform. A cookie is a little text file that enables our system to recognise and communicate with your computer or device more efficiently. These cookies keep track of things like how frequently you visit the Platform, the sites you see, and your subsequent movements. Your machine is tracked by the cookies, not you. You can restrict or disable cookies in your web browser settings, but doing so can prevent some Platform features from working properly.</p>

          <h3 className={context.data.h3}>Payment Transaction Information</h3>
          <p>Through the Platform, we may collect information about your payment transactions, such as the kind of payment method used, the dates and times of payments, the amounts of payments, your billing postcode, address, and other pertinent transaction information.</p>

          <h3 className={context.data.h3}>Information gathered from other sources</h3>
          <p>"{context.data.app_data.company_name}" may obtain sensitive information about you from third parties along with personal information about you. We have no control over, oversight over, or liability for how those third parties use your personal information. You should contact such third parties if you have any questions about their sharing of your personal information to us.</p>

          <h3 className={context.data.h3}>Information obtained from an Account Manager</h3>
          <p>Under certain conditions, an Account Manager may administer an Account on behalf of a Client. The Account Manager warrants that they have the relevant person's consent before providing us with that information and acknowledges that "{context.data.app_data.company_name}" will rely on the Account Manager's warranty when receiving the other person's personal and sensitive information. If an Account Manager intends to provide "{context.data.app_data.company_name}" with personal information (including sensitive information) about any other person.</p>

          <h3 className={context.data.h3}>Services from Third Parties</h3>
          <p>If you link, connect, or log in to the Platform or your Account using a service from a third party (such as Google or Facebook), that service may provide us information, such as details about your profile. This information varies and is managed by that service or as permitted by you through that service's privacy settings. These third-party services are able to assess how you use the Platform and other websites, serve specialized advertising content, gauge how effective their advertising is, and offer other website activity and internet usage-related services thanks to the use of these technologies.</p>

          <h3 className={context.data.h3}>Information from the NDIS Participant Portal</h3>
          <p>If you have an NDIS plan, we may be able to access your information through the NDIS Participant Portal using either your name or your NDIS number. The beginning and ending dates of your NDIS plan, your NDIS funding categories, and any other information you choose to provide through the NDIS participant portal may be accessed by us.</p>

          <h3 className={context.data.h3}>Services for advertising</h3>
          <p>If you click on an online advertisement from "{context.data.app_data.company_name}" (such as one on Google), the third party service hosting that advertisement will gather some information and give it to us so we may assess the success of our advertising.</p>

          <h3 className={context.data.h3}>Information from other Users</h3>
          <p>Other Users may provide us with personal data about you.</p>

          <h3 className={context.data.h3}>Information from organizations and service providers you interact with</h3>
          <p>Plan managers, the NDIA, support coordinators, and other organizations and service providers you interact with that offer disability support services may supply us with personal information about you.</p>

          <h3 className={context.data.h3}>Your References</h3>
          <p>"{context.data.app_data.company_name}" will hold and preserve any references that have been given to them about you. Referrals could be made public on your profile.</p>


          <h3 className={context.data.h3}>Background Checks</h3>
          <p>"{context.data.app_data.company_name}" may conduct background checks on you, including police, background, NDIS worker screening, and other checks, as necessary and authorized by relevant legislation. To get these reports, we may utilize your personal information, including your complete name and birth date.</p>


          <h3 className={context.data.h3}>Private information</h3>
          <p>One kind of personal data is "sensitive information," which comprises the following:</p>
          <p>Immunization history, racial or ethnic origins, political beliefs, union membership, professional or trade association membership, religious or philosophical affiliations, sexual orientation or practices, criminal history, and biometric data are all examples of health-related information.</p>

          <h3 className={context.data.h3}>Your sensitive information will only be gathered by "{context.data.app_data.company_name}"</h3>
          <p>If it is essential to enable you to use the Platform and for you to be able to supply or receive services, or you consent to the gathering of the information (such consent may include you submitting a document or certificate via the Platform).</p>
          <p>Depending on how you interact with "{context.data.app_data.company_name}" or use the Platform, we could ask you for some, all, or even a portion of the sensitive data listed above, or we might get it from other sources. By way of illustration</p>
          <ul className="list-outside list-disc ml-[18px] [&>*]:mb-1">
            <li>We can ask you for details about your impairment or handicap, current medicines, support needs, and previous help.</li>
            <li>In your discussions with "{context.data.app_data.company_name}" or other Users, we may gather sensitive information about your health or other issues</li>
            <li>Through the NDIS participant site, we may get sensitive information about you, including your health (see above paragraph</li>
          </ul>

          <h3 className={context.data.h3}>How we handle and keep your personal data</h3>
          <p>We generally keep your personal data electronically, in either our own or third-party infrastructure and storage service providers' secure facilities and systems. Many of our service suppliers are based abroad, including in the US.</p>
          <p>To ensure the security of your personal information, "{context.data.app_data.company_name}" and our third-party infrastructure and storage providers have put in place a number of safeguards, including:</p>
          <p>guaranteeing (as necessary) the encrypted, secure transfer of your personal information;</p>
          <p>restrictions that limit which employees and contractors have access to certain information;</p>
          <p>securing the servers that store your personal data with corporate firewalls; limiting access to certain portions of your personal data to specific categories of Users (see section 5.2 of this Policy); and other measures.</p>
          <p>To further safeguard your information against unauthorized access, loss, destruction, or alteration, we are constantly establishing and updating administrative, technological, and physical security measures.</p>
          <p>Your personal information is only kept by us for as long as is required to carry out your agreement with "{context.data.app_data.company_name}" and abide by legal requirements.</p>

          <h3 className={context.data.h3}>How we utilize the personal data you provide</h3>
          <p>Below is information about how we utilize your personal data. This list is not meant to be comprehensive, and there may be additional third parties to whom we disclose your personal information where needed or authorized by law (for example, insurers or professional advisers).</p>

          <h3 className={context.data.h3}>Use of your private data by the Platform</h3>
          <p>To create, run, and enhance the Platform and as necessary for the appropriate fulfillment of our agreement with you, we may use your personal information. An incomplete list of the uses for which we could use your personal data is provided below.</p>
          <ul className="list-outside list-disc ml-[18px] [&>*]:mb-1">
            <li>Check your identification and the accuracy of any papers or information you have submitted.</li>
            <li>carry out the appropriate background, reference, and other checks, and double-check the data you've given "{context.data.app_data.company_name}"</li>
            <li>enabling you to utilize the platform, provide services, and receive services</li>
            <li>enabling you to set up and maintain your profile and upload more content to the platform</li>
            <li>preserving and updating our records</li>
            <li>enabling communication and connection with specific other Users</li>
            <li>maintain, safeguard, enhance, and optimize the Platform and the Platform's User Experiences</li>
            <li>operating, enhancing, and optimizing linked services, for example through analytics and research</li>
            <li>aid us in offering our users good customer service</li>
            <li>Process, manage, and oversee payroll transactions, billing disputes, invoice payments, and account payments; and</li>
            <li>send you account notifications, updates, and support communications.</li>
          </ul>

          <h3 className={context.data.h3}>The use of your private data for the Utilisation of your personal data by the "{context.data.app_data.company_name}" community Employer community</h3>
          <p>Your information may be used by us to safeguard our community and the Platform, ensure a secure environment for all of our Users, and adhere to legal requirements. An incomplete list of the uses for which we could use your personal data is provided below.</p>
          <ul className="list-outside list-disc ml-[18px]">
            <li>confirm the accuracy of any data or documents submitted by Users and the identities of other Users</li>
            <li>find and stop security events, spam, abuse, exploitation, and other bad activities</li>
            <li>carry out security vettings and risk evaluations</li>
            <li>Make contact with your referees, make them inquiries, and gather your references</li>
            <li>Perform background, dealing with children and vulnerable people, NDIS worker screening, or police checks on Users (if necessary) against databases and other information sources</li>
            <li>enforce our agreements with third parties and resolve any disputes or difficulties we may have with any of our Users</li>
            <li>enforce our contract with you, our terms of service, and the policies and procedures of "{context.data.app_data.company_name}"</li>
            <li>abide with the law and safeguard our legitimate interests.</li>
          </ul>

          <h3 className={context.data.h3}>Commercial, advertising, and research uses of your personal information</h3>
          <p>We could carry out and target advertising and marketing initiatives towards you and other third parties using your personal information. An incomplete list of the uses for which we could use your personal data is provided below.</p>
          <ul className="list-outside list-disc ml-[18px] [&>*]:mb-1">
            <li>Send you marketing- and advertising-related communications as well as other information by phone, email, web, push alerts from the "{context.data.app_data.company_name}" app, and other channels</li>
            <li>to maintain communication with you and other Users</li>
            <li>If you have given us your phone number, we may occasionally call or text you about our services; however, this will only happen sporadically.</li>
            <li>Perform market and product research; Customize, evaluate, and enhance our advertising and marketing</li>
            <li>ask you to take part in a study, conduct or fund academic research, and</li>
            <li>We may get in touch with you to find out whether you're interested in taking part in campaigns or enquiries about the disability sector or other issues that concern our neighborhood.</li>
            <li>By following the unsubscribe instructions provided in our marketing emails, you can choose not to receive marketing messages from us. Go to the "Your choices" section of paragraph 8 below for further details on how to choose not to receive marketing materials.</li>
          </ul>

        </div>
      </div>

      <div className={`${outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Revealing your private details</h2>
          <div className="border-divider-right !my-4"></div>

          <h3 className={context.data.h3}>Disclosed with your permission</h3>
          <p>We will release and share those particular portions of your personal information that we now hold, where you have expressly given your approval for certain elements of your personal information to be revealed. Unless and until we are informed differently, the Account Manager that a Client has designated will have access to all of the Client's personal information (including sensitive information).</p>

          <h3 className={context.data.h3}>Sharing among Authorized Users</h3>
          <p>By utilizing search criteria that match the personal data you've given us, approved users on the Platform can find, access, and see the profiles of other approved users. Your Profile's sensitive and personal data will be accessible to all Platform users who have been approved to use it. This pertains to you, but not just you:</p>
          <p>profile picture, first name, first letter of last name or last name, age, and location;</p>
          <p>the biographical information you provided in your profile; your preferences for employment, including your availability, if you have a vehicle, and the support services you may offer as a home care support worker (where applicable); and your support needs, including any disabilities or impairments you may have.</p>
          <p>You consent to other Approved Users being able to see your personal information, including your sensitive information, and get in touch with you by becoming an Approved User. You also agree that "{context.data.app_data.company_name}" may ask your permission before disclosing your email address and phone number to other Approved Users so they may get in touch with you. Additionally, you agree that "{context.data.app_data.company_name}" may occasionally alter the fields in your profile in order to optimize and enhance the platform and users' experiences.</p>

          <h3 className={context.data.h3}>Sharing with General Members of the Public</h3>
          <p>Approved Users have the option to grant access to and viewing of their profiles to general members of the public. The Platform will be accessible to the general public, who can search it and read search results that may include all or any of the details from your Profile.</p>

          <h3 className={context.data.h3}>Adherence to judicial orders and requirements</h3>
          <p>If and to the extent authorized or required by law, we may release your personal information to courts, law enforcement, government agencies, or authorized third parties. We may also do so if it is reasonably necessary to:</p>
          <p>enforce and manage our Terms of Use or the applicable agreement with you; respond to requests relating to criminal investigations, alleged or suspected illegal activity, or any other activity that could subject us, you, or any other user to legal liability; comply with our legal obligations; address claims made against "{context.data.app_data.company_name}"; comply with requests regarding criminal investigations, alleged or suspected illegal activity, or any other activity that could expose us, you, or any other user to legal liability.</p>

          <h3 className={context.data.h3}>Your personal information could be disclosed to:</h3>
          <p>Provide, manage, and administer "{context.data.app_data.company_name}"'s insurance coverage, as well as compute, deduct, and send to the Australian Tax Office any required taxation and mandatory superannuation contributions.</p>
          <p>We reserve the right, in line with the Privacy Act, to release your personal information to credit reporting agencies if you default on your payment obligations to "{context.data.app_data.company_name}". Equifax Pty Ltd is one of the credit reporting agencies to whom we may submit your personal information.</p>

          <h3 className={context.data.h3}>sharing with connected corporate entities, affiliates, and partners of "{context.data.app_data.company_name}"</h3>
          <p>When it comes to archiving, auditing, accounting, customer relationship management, legal issues, business or growth consulting, risk management, banking, billing and payment processing, delivery, data storage, processing, and analysis, among other things, we may disclose your personal information to "{context.data.app_data.company_name}"'s affiliated bodies corporate as well as to outside service providers, consultants, and business partners. Only when it is essential to allow the services to be delivered to us, do we disclose your personal information in this way, and when we do, we take efforts to guarantee that our service providers are obligated to secure your information.</p>

          <h3 className={context.data.h3}>Sharing the following with the companies and service providers you interact with</h3>
          <p>With plan managers, the NDIA, support coordinators, and other disability support service providers you interact with, we share your personal information, including sensitive data. Before disclosing any information to plan managers, support coordinators, or other service providers, we will first get your permission.</p>

          <h3 className={context.data.h3}>Anonymous data sharing</h3>
          <p>For regulatory compliance, market and industry analysis, demographic profiling, marketing and advertising, and other commercial objectives, we also provide information about our Users that has been aggregated or merged so that it no longer identifies a specific User.</p>

          <h3 className={context.data.h3}>Gaining access to your private data:</h3>
          <p>By login into your Account, you may access and update any of your personal information that "{context.data.app_data.company_name}" has on file. As an alternative, you have the right to request access to the personal data that we may have on file for you. Our privacy officer may be reached at:</p>
          <p>Officer for Privacy</p>

          <p>Address: {context.data.app_data.company_address}</p>
          <p>Message us at <a href={`mailto:${context.data.app_data.email_support}`} className="btn-to-link-color">{context.data.app_data.email_support}</a>.</p>
          <p>Typically, your request will result in the availability of your personal information in 30 days. Before disclosing any of your personal information, we will ascertain whether there is a cost involved. In order to grant you access to your personal information, we will need to see proof of your identity.</p>
          <p>In some cases, we may refuse to provide you access to your personal data (for instance, if disclosing it would have an unreasonably negative impact on the privacy of others). Please refer to the APPs for further details.</p>

          <h3 className={context.data.h3}>Changing and updating your personal data</h3>
          <p>You may visit the "Profile" area of your "{context.data.app_data.company_name}" account after logging in, or you can send an email to <a href={`mailto:${context.data.app_data.email_support}`} className="btn-to-link-color">{context.data.app_data.email_support}</a>. to amend or rectify your personal information at any time. It is your obligation to keep your profile's contact and personal information current. "{context.data.app_data.company_name}" will hold this information.</p>

          <h3 className={context.data.h3}>Your Options</h3>
          <p>Use the link in promotional and marketing emails to opt out at any time, or get in touch with us at <a href={`mailto:${context.data.app_data.email_support}`} className="btn-to-link-color">{context.data.app_data.email_support}</a>. to stop receiving marketing communications or targeted advertising from us. In the "{context.data.app_data.company_name}" app, you may also choose not to get push alerts. Please be aware that until you terminate your Account, you cannot choose not to receive administrative and transactional communications from us. These emails concern your Account and/or your behavior on the Platform and are related to it.</p>

        </div>
      </div>



      <div className={outletContext.sectionPadding}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Contact Us</h2>
          <div className="border-divider-right !my-4"></div>

          <h3 className={context.data.h3}>Feedback</h3>
          <p>Please contact our Privacy Officer at <a href={`mailto:${context.data.app_data.email_support}`} className="btn-to-link-color">{context.data.app_data.email_support}</a>. if you have any comments or inquiries concerning our Privacy Policy or any of our privacy-related practices.</p>

          <h3 className={context.data.h3}>Complaints</h3>
          <p>Please let us know if you have any complaints regarding the way we handled your personal information so we can resolve the issue. Our privacy officer may be reached at:</p>

          <p>Officer for Privacy</p>
          <p>Address: {context.data.app_data.company_address}</p>
          <p>Message me at <a href={`mailto:${context.data.app_data.email_support}`} className="btn-to-link-color">{context.data.app_data.email_support}</a>.</p>

      </div>
    </div>


    </div>
  )//End return
}//End function

export default PrivacyPolicy;