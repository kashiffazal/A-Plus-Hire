import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';

const TermOfUse = () => {
  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();
  return (
    <div>
      <PageTitle
        outletContext={outletContext}
        context={context}
        title="Terms of Use"
        sub_title="Please read terms and condition carefully"
      />
      <div className={`${outletContext.sectionPadding}`}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Introduction</h2>

          <div className="border-divider-right !my-4"></div>
          <h3 className={context.data.h3}>Platform and "{context.data.app_data.company_name}"</h3>
          <p>People with disabilities may identify, employ, and manage a variety of disability assistance services via the web portal "{context.data.app_data.company_name}".</p>

          <h3 className={context.data.h3}>The purpose of these Terms of Use</h3>
          <p>These rules apply to your use of the Platform, access to it, and communications with "{context.data.app_data.company_name}" and its representatives through the Platform. Before using the Platform, please read them thoroughly.</p>
          <p>You accept and agree that you will abide by and be governed by these Terms of Use and the collection and use of your information as described in our Privacy Policy by accessing or using the Platform. You must not use the Platform if you disagree with any part or all of these terms.</p>

          <h3 className={context.data.h3}>Modifications to the Terms of Use</h3>
          <p>According to this clause, we retain the right to change these Terms of Use at any moment. If we update the Terms of Use, we'll post the new version of them on the Platform.</p>
          <p>Any modifications to the Terms of Use will take effect as soon as they are submitted to the Platform. You will be deemed to have accepted such modifications if you continue to use the Platform after such an upload. You must cancel any contract you might have with "{context.data.app_data.company_name}", stop using the Platform, and deactivate all of your Accounts if you disagree with the updated Terms of Use.</p>
          <p>By providing a notice of the changes online, we will let you know if we make any significant modifications to the Terms of Use.</p>

          <h3 className={context.data.h3}>Privacy Principles</h3>
          <p>Our Privacy Policy governs how we gather, use, store, and disclose your personal information in connection with your access to and use of the Platform.</p>

          <h3 className={context.data.h3}>Restriction on age</h3>
          <p>Unless "{context.data.app_data.company_name}" and you have specifically permitted and agreed otherwise:</p>
          <ol className="list-outside list-decimal ml-[18px] [&>*]:mb-1">
            <li>To access and use the Platform, you must be 18 years of age or older and be able to enter into legally binding contracts.</li>
            <li>By doing so, you represent and warrant that you are at least 18 years old and have the legal ability and power to enter into this contract.</li>
          </ol>
        </div>
      </div>

      <div className={`${outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>

          <h2 className={context.data.h2}>Employing the Platform</h2>
          <div className="border-divider-right !my-4"></div>

          <h3 className={context.data.h3}>How to Use the Platform</h3>
          <p>In line with these Terms of Use, "{context.data.app_data.company_name}" hereby provides you a non-exclusive, fee-free, and revocable license to use the Platform.</p>
          <p>On the Platform, access to some locations and information is restricted. To access and utilise some services and data on the Platform, you must be an Approved User. You must finish the registration procedure.</p>
          <p>You may be denied access to the Platform at any moment, according to "{context.data.app_data.company_name}". This is contingent upon the provisions of paragraph 3 below and any applicable agreements between you and "{context.data.app_data.company_name}".</p>

          <h3 className={context.data.h3}>Using the Platform</h3>
          <p>You must conduct yourself ethically and sensibly when using the Platform. You may not, without restricting the "{context.data.app_data.company_name}" Policies and Procedures:</p>
          <p>Include any offensive, defamatory, derogatory, or inappropriate material on your Profile or in communications with "{context.data.app_data.company_name}", its representatives, or any User; use the Platform or communicate with "{context.data.app_data.company_name}", its representatives, or any User for a purpose that is unrelated to the provision or receipt of services; or provide any information that is incorrect, misleading, or deceptive.</p>
          <p>None of your Accounts may be transferred in any other way, including by assignment. Any and all actions taken on or via any of your Accounts are your responsibility.</p>

          <h3 className={context.data.h3}>Security and discretion</h3>
          <p>You are in charge of protecting the privacy and security of your account login information, and you are not permitted to share it with anyone else (apart from an Account Manager, if necessary).</p>
          <p>If you know or have any reason to believe that your account login information has been lost, stolen, misused, or otherwise compromised, or if there has been any real or suspected unauthorized access to or use of your accounts, you must tell "{context.data.app_data.company_name}" right away.</p>

          <h3 className={context.data.h3}>The Platform will no longer allow you access</h3>
          <p>Without giving you prior notice, "{context.data.app_data.company_name}" retains the right to suspend or terminate your access to the Platform or particular Platform sections for any reason, including, but not limited to:</p>
          <p>If you use the Platform for any activity that "{context.data.app_data.company_name}", in its sole discretion, deems inappropriate, such as the storage or transmission of inappropriate, offensive, defamatory, or false and misleading information, you will be subject to prosecution. If there is an interruption, fault, virus, or unauthorized access on the Platform or the "{context.data.app_data.company_name}" systems. If you violate these Terms of Use.</p>

          <h3 className={context.data.h3}>Informational property</h3>
          <p>You understand and agree that by using the Platform or any materials or information on the Platform, you will not acquire any rights, including but not limited to intellectual property rights.</p>
          <p>You recognise and accept that "{context.data.app_data.company_name}", its licensors, or permitted third parties are the exclusive owners of the Platform and all content thereon, including all related intellectual property rights.</p>
          <p>You acknowledge that any Intellectual Property Rights contained into or accompanying the Platform or the content on the Platform may not be removed, altered, or obscured. You will not make use of the Platform or any of the materials or content on the Platform, nor will you duplicate, alter, adapt, distribute, sell, transfer, publicly perform, transmit, broadcast, or in any other way exploit them.</p>
          <p>Except for the licenses and rights expressly granted in these Terms of Use (subject to the terms of the applicable agreements between you and "{context.data.app_data.company_name}"), no license or rights are implicitly or otherwise granted to you under any Intellectual Property Rights owned or controlled by "{context.data.app_data.company_name}" or its licensors.</p>

          <h3 className={context.data.h3}>Links from third parties and cookies</h3>
          <p>Links to websites operated by third parties and not within "{context.data.app_data.company_name}"'s control may be found on the Platform. The content of the websites run by third parties is not the responsibility of "{context.data.app_data.company_name}". You agree that using the Platform to access third-party websites is at your own risk.</p>
          <p>When you access and use the Platform, you agree that cookies are used and that the Platform automatically gathers log data and device information. You give "{context.data.app_data.company_name}" permission to use cookies and collect data in line with our Privacy Policy by visiting the Platform and accepting these Terms of Use.</p>

          <h3 className={context.data.h3}>Liability Exclusion and Limitation</h3>
          <p>The Platform is offered "as is" and without any express or implied claims or guarantees. Except where prohibited by law, "{context.data.app_data.company_name}" will not be responsible for any direct or indirect, consequential, exemplary, incidental, or punitive damages arising out of or in connection with the contents of, use of, or other dealings with, the Platform, whether based on contract, statute, or common law.</p>

          <h3 className={context.data.h3}>Indemnity</h3>
          <p>You consent to hold harmless "{context.data.app_data.company_name}" and its officers, employees, and agents from and against any and all liabilities, costs, or claims, including but not limited to personal injury, wrongful death, property loss or damage, right infringement, and related expenses, that may come from any violation by you of the Terms of Use; any infraction by you of the law; or any carelessness or infringement by you of the rights of any third party.</p>


        </div>
      </div>

      <div className={`${outletContext.sectionPadding}`}>
        <div className={`${outletContext.containerWidth} [&>*]:mb-3`}>



          <h2 className={context.data.h2}>General</h2>
          <div className="border-divider-right !my-4"></div>
          <h3 className={context.data.h3}>Enforcement</h3>
          <p>The enforceability of the other sections of these Terms of Use will not be impacted if any provision of them is or becomes unenforceable.</p>

          <h3 className={context.data.h3}>Rule of Law</h3>
          <p>You absolutely and irrevocably consent to submit to the exclusive jurisdiction of the courts of Melbourne Victoria, including, without limitation, the Federal Court of Australia sitting in Victoria. These Terms are governed by Victorian law.</p>

          <h3 className={context.data.h3}>Definition</h3>
          <p>Any account that you register on the Platform is referred to as an "Account."</p>
          <p>"Account Manager" refers to a client's authorized attorney, decision-maker, custodial parent, or guardian.</p>
          <p>"Approved User" refers to a User who has registered with "{context.data.app_data.company_name}", been given the go-ahead to create a Profile, and is currently logged into their Account in order to access and utilize the Platform.</p>
          <p>"Booking" refers to an engagement or request for a Home Care and Support Worker to provide Support Services made by a Client (or a Client's Account Manager) on the Platform and accepted by the Home Care and Support Worker.</p>
          <p>"Client" refers to a person with a handicap who has registered with "{context.data.app_data.company_name}" and been given the go-ahead to use the Platform to access services.</p>
          <p>"Confidential Information" is any information that "{context.data.app_data.company_name}" owns, has in its possession, or that you have access to as a result of your relationship or engagement with "{context.data.app_data.company_name}" and which "{context.data.app_data.company_name}" regards as confidential. This includes, but is not limited to, any personal, medical, health, private, or sensitive information (including your opinions) about "{context.data.app_data.company_name}", another User, a Representative, or their families that is not publicly available (other than through a breech of confidentiality).</p>

          <p>The term "{context.data.app_data.company_name}" refers to "{context.data.app_data.company_name_full_name}" ({context.data.app_data.abn_number}), also known as "we," "us," and "our," and located at {context.data.app_data.company_address}.</p>
          <p>"{context.data.app_data.company_name}" Policies and Procedures" refers to the standards, policies, statements, and practises of "{context.data.app_data.company_name}" made available on the Platform, such as the Terms of Use, Privacy Policy, and codes of conduct, as they may be updated from time to time.</p>
          <p>The term "Home Care and Support Worker" refers to a person who is engaged by "{context.data.app_data.company_name}" pursuant to an employment contract to offer Support Services to Clients via the Platform.</p>
          <p>Patents, copyrights, circuit layout rights, registered designs, trademarks, the right to have confidential information kept private, and any application or right to apply for registration of all current and future rights conferred by statute, common law, or equity, whether registered or unregistered, are all examples of intellectual property rights.</p>
          <p>"Platform" refers to the "{context.data.app_data.company_name}" website (currently located at www."{context.data.app_data.company_name}".com.au), as well as all sections and pages of the "{context.data.app_data.company_name}" web app, iPhone, iPad, and Android apps.</p>
          <p>"Privacy Policy" refers to "{context.data.app_data.company_name}" (accessible on the Platform) guidelines for the gathering, handling, and dissemination of personal data.</p>
          <p>"Profile" refers to the details you've submitted that are shown on the Platform.</p>
          <p>The home care and support services that Home Care and Support Workers deliver to Clients during a Booking are referred to as "Support Services" and must adhere to the conditions of the appropriate employment and services agreement between you and "{context.data.app_data.company_name}" (as applicable).</p>
          <p>Anyone who accesses or utilizes the Platform is referred to as a "User."</p>
          <p>The term "you" refers to the individual who accesses or utilizes the Platform, and it shall be construed as such.</p>


        </div>
      </div>
    </div>
  )//End return
}//End function

export default TermOfUse;