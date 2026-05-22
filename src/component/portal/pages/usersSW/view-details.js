import React from 'react';
import ModalGeneral from '../../../mutualComponents/modal-general';
import SWProfile from '../users/partial/view-details/sw';

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
        <SWProfile withinModal={true} id={pr.id} closeModal={pr.close} allowMessage={pr.allowMessage}/>
      }//End render
    />
  )//End return
}//End function

export default ViewModal;