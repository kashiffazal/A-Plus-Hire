import React from 'react';
import ModalGeneral from '../../../../mutualComponents/modal-general';
import ProfileForm from '../index';

const FormModal = (pr) => {
  return (
    <ModalGeneral
      show={pr.open}
      close={pr.close}
      width={950}
      title='User Profile'
      subTitle='Edit user profile data'
      // hideHeaderHr={true}
      allowEscKey={false}
      render={<ProfileForm updateData={pr.updateData} modal={true} editMode={pr.editMode} close={pr.close}/>}//End render
    />
  )//End return
}//End function

export default FormModal;