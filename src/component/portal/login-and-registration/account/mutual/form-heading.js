import { theme, Progress } from 'antd';

const FormHeading = (pr) => {
  const { token } = theme.useToken();//Getting colors rom Antd

  let title = (typeof pr.headTitle[0] === 'object') ? pr.headTitle[0][0] : pr.headTitle[0];
  let subTitle = (typeof pr.headTitle[0] === 'object') ? pr.headTitle[0][1] : pr.headTitle[1];
  if (pr.showSuccess) {
    title = pr.successMsg[0];
    subTitle = pr.successMsg[1];
  }//End if condition

  return (
    // sticky top-0 z-10
    <div className="
      form-header-gradient grid grid-cols-1 md:grid-cols-6 items-center rounded-t
      !bg-white text-center md:text-left p-0 md:px-8 md:py-4
      ">
      <div className="col-span-5 text-white bg-[var(--colorPrimary)] md:!bg-transparent p-2 md:p-0 rounded-t">
        <h3 className={`${pr.context.data.h3} drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)]`}>{title}</h3>
        <h4 className={`${pr.context.data.h4} font-semibold drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)]`}>{subTitle}</h4>
      </div>
      <div className="col-span-1 text-center md:text-right px-6 py-2 md:p-0">
        <h3 className='text-md font-semibold'>Completed {pr.progressStatus}%</h3>
        <Progress percent={pr.progressStatus} status="active" showInfo={false} className="m-0" strokeColor={{ '0%': token.colorPrimary, '100%': token.colorSecondary }} />
      </div>
    </div>
  )//End return
}//End function

export default FormHeading;