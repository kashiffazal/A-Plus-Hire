import { useContext } from 'react';
// import { FacebookFilled } from '@ant-design/icons';
import { GetCurrentYear } from '../../../services';
import ContextAPI from '../../../../context';
import { NavLink } from 'react-router-dom';

const Footer = (pr) => {
  const a = useContext(ContextAPI);
  const footerMenuClass = "transition hover:text-[var(--colorPrimary)] hover:pl-2";
  return (
    <div className="border-0 border-t-2 border-solid border-[var(--colorPrimary)] bg-gradient-to-t from-white from-1% to-[var(--bgColor)] to-90%">

      <div className={`${pr.containerWidth} py-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5`}>
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 md:flex items-center">
          {/* <div> */}
          {/* <div className="text-center sm:text-left"> */}
          <NavLink to="/" className="block mr-5">
            <img src={`${process.env.PUBLIC_URL}/images/logo-v-final.png`} alt="" className="md:w-[370px] mr-5" />
          </NavLink>
          <div className="text-sm sm:text-base lg:text-sm  text-gray-700">
            Our objective is to connect the experienced & skilled NDIS support staff and participants looking for daily/weekly/fortnightly, or monthly support.

            You can search our web portal for the relevant best support worker from the list of available staff.
          </div>
          {/* </div> */}
        </div>
        <div className="[&>*]:block [&>*]:no-underline [&>*]:pb-1 [&>*]:text-gray-900">
          <NavLink to='about' className={footerMenuClass}>Know More About Us</NavLink>
          <NavLink to='search' className={footerMenuClass}>Search For Support Workers</NavLink>
          <NavLink to='pricing' className={footerMenuClass}>See Our Pricing</NavLink>
          <NavLink to='contact' className={footerMenuClass}>Feel Free To Contact Us</NavLink>
        </div>
        <div className="[&>*]:block [&>*]:no-underline [&>*]:pb-1 [&>*]:text-gray-900">
          <NavLink to='login' className={footerMenuClass}>Already A Member - Login</NavLink>
          <NavLink to='registration' className={footerMenuClass}>New Here - Registration</NavLink>
          <a href='/term-of-use' target="blank" className={footerMenuClass}>Term Of Use</a>
          <a href='privacy-policy' target="blank" className={footerMenuClass}>Privacy Policy</a>
        </div>
        <div className="[&>*]:pb-1 sm:col-span-2 md:col-span-1">
          <div className="font-medium">Address:</div>
          <div>{a.data.app_data.company_address}</div>
          <a href="https://www.facebook.com/" target="blank" className="transition block bg-[#3b5998] text-center rounded !py-[13px] mt-2 hover:shadow-lg shadow-[#3b5998]">
            {/* <FacebookFilled className="text-[#3b5998] text-3xl" /> */}
            <img src={`${process.env.PUBLIC_URL}/images/facebook-logo.jpg`} alt="" className="mx-auto w-20 md:w-1/3" />
          </a>
        </div>
      </div>

      <div className="bg-[var(--colorPrimary)] py-5">
        <div className={`sm:flex justify-between items-center ${pr.containerWidth} mx-auto text-white text-center`}>
          <div>&copy; {GetCurrentYear()} {a.data.app_data.company_name_full_name}. {a.data.app_data.abn_number}</div>
          <div>Developed By <a href={a.data.developer.webLink} target="blank" className="text-white no-underline font-medium">{a.data.developer.company_name}</a></div>
        </div>
      </div>
    </div>
  )//End returnmx-auto
}//End function

export default Footer