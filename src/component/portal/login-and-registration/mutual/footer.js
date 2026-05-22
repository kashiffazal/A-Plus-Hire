import { GetCurrentYear } from '../../../services';
import { NavLink } from 'react-router-dom';
const Footer = (pr) => {
  return (
    <div className='hidden md:block'>
      <div className='h-12 flex items-center border-t border-solid border-[var(--colorPrimary)] bg-white'>
        <div className='container mx-auto md:text-sm lg:text-base [&>*]:text-[var(--colorPrimary)] '>
          <div className='grid md:grid-cols-12'>
            <div className="md:col-span-8">
              &copy; {GetCurrentYear()} {pr.context.data.app_data.company_name_full_name}. {pr.context.data.app_data.abn_number}
              &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
              <NavLink to='/term-of-use'>
                <button type="button" className="btn-to-link-color">Term Of Use</button>
              </NavLink>
              &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
              <NavLink to='/privacy-policy'>
                <button type="button" className="btn-to-link-color">Privacy Policy</button>
              </NavLink>
            </div>
            <div className="md:col-span-4 text-right">
              <a href={pr.context.data.developer.webLink} target="blank" className="no-underline">
                <button type="button" className="btn-to-link-color">
                  <i className="las la-code relative top-px" /> Developed By {pr.context.data.developer.company_name}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default Footer;