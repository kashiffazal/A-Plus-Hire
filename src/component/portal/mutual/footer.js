import { useContext } from "react";
import { GetCurrentYear } from '../../services';
import ContextAPI from '../../../context';

const FooterApp = () => {
  const context = useContext(ContextAPI);
  return (
    <footer className="h-12 relative z-10 shadow-[0px_-2px_8px_#d9d5d5]  bg-white flex items-center">
      <div className="container mx-auto">


        <div className='grid grid-cols-1 md:grid-cols-12 text-sm text-[var(--colorPrimary)]'>
          <div className="text-center md:text-left md:col-span-8">
            &copy; {GetCurrentYear()} {context.data.app_data.company_name_full_name}. {context.data.app_data.abn_number}
          </div>
          <div className="text-center md:text-right md:col-span-4">
            <a href={context.data.developer.webLink} target="blank" className="no-underline">
              <button type="button" className="btn-to-link-color">
                <i className="las la-code relative top-px" /> Powered By {context.data.developer.company_name}
              </button>
            </a>
          </div>
        </div>



      </div>
    </footer>
  )//End return
}//End function

export default FooterApp