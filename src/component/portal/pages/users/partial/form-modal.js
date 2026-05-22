import React from 'react';
import ModalGeneral from '../../../../mutualComponents/modal-general';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const FormModal = (pr) => {

  const SWForm = React.lazy(() => import('../../../login-and-registration/account/support-worker/form'));
  const NDISForm = React.lazy(() => import('../../../login-and-registration/account/ndis-provider/form'));
  const SMForm = React.lazy(() => import('../../../login-and-registration/account/self-managed-participant/form'));

  const loading = <div className='h-[350px]'><ScreenLoader active={true} /></div>
  return (
    <ModalGeneral
      show={pr.open}
      close={pr.close}
      width={900}
      title=' '
      subTitle=' '
      hideHeaderHr={true}
      allowEscKey={false}
      className="[&>div+.ant-modal-content]:!px-[12px] [&>div+.ant-modal-content]:!py-[20px]"
      render={
        <div className='bg-white m-[-25px] mt-[-42px] sm:mt-[-32px] border-2 border-solid border-[var(--colorPrimary)] rounded-lg'>
          {pr.type === 'sw' && (
            <React.Suspense fallback={loading}>
              <SWForm withinModal={true} id={pr.id} updateData={pr.updateData} callBack={pr.callBack} closeModal={pr.close} />
            </React.Suspense>
          )}
          {pr.type === 'ndis' && (
            <React.Suspense fallback={loading}>
              <NDISForm withinModal={true} id={pr.id} updateData={pr.updateData} callBack={pr.callBack} closeModal={pr.close} />
            </React.Suspense>
          )}
          {pr.type === 'sm' && (
            <React.Suspense fallback={loading}>
              <SMForm withinModal={true} id={pr.id} updateData={pr.updateData} callBack={pr.callBack} closeModal={pr.close} />
            </React.Suspense>
          )}
        </div>
      }//End render
    />
  )//End return
}//End function

export default FormModal;