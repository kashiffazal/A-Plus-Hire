import ModalGeneral from '../../../../mutualComponents/modal-general';
import ViewDetails from './view-details';

const ViewModal = (pr) => {
  return (
    <ModalGeneral
      show={pr.open}
      close={() => pr.close()}
      width={740}
      title="Package Details"
      subTitle={'View the package details below'}
      hideHeaderHr={true}
      // allowEscKey={false}
      render={
        <ViewDetails id={pr.id} />
      }//End render
    />
  )//End render
}//End function

export default ViewModal;