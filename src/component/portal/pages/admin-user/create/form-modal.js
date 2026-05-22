import ModalGeneral from '../../../../mutualComponents/modal-general';
import CreateAdminUserForm from './form';
const FormModal = (pr) => {
  return (
    <ModalGeneral
      width={960}
      show={pr.open}
      close={pr.onClose}
      title={`${pr.id ? 'Update' : 'Add New'} User`}
      subTitle={pr.id ? 'Update the selected admin user' : 'Create a new admin user'}
      // hideHeaderHr={true}
      // loading={st.getGJLoader}
      allowEscKey={false}
      render={<CreateAdminUserForm close={pr.onClose} appendData={pr.appendData} updateData={pr.updateData} id={pr.id} />} />
  )//End return
}//End function

export default FormModal;