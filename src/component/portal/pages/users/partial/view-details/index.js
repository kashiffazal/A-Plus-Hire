import loadable from '@loadable/component';
import ModalGeneral from '../../../../../mutualComponents/modal-general';
import ScreenLoader from '../../../../../mutualComponents/screen-loader';

const loaderWebsite = <div className='text-center'><ScreenLoader active={true} inline={true} /></div>;
const SWProfile = loadable(() => import('./sw'), { fallback: loaderWebsite });
const NDISProfile = loadable(() => import('./ndis'), { fallback: loaderWebsite });
const SMProfile = loadable(() => import('./sm'), { fallback: loaderWebsite });


const ViewModal = (pr) => {
  return (
    <ModalGeneral
      show={pr.open}
      close={() => pr.close()}
      width={1300}
      title=' '
      subTitle=' '
      hideHeaderHr={true}
      allowEscKey={false}
      render={
        <>
          {pr.type === 'sw' && <SWProfile withinModal={true} id={pr.id} closeModal={pr.close} allowMessage={pr.allowMessage} />}
          {pr.type === 'ndis' && <NDISProfile withinModal={true} id={pr.id} closeModal={pr.close} />}
          {pr.type === 'sm' && <SMProfile withinModal={true} id={pr.id} closeModal={pr.close} />}
        </>
      }//End render
    />
  )//End return
}//End function

export default ViewModal;