import ModalGeneral from '../../../../mutualComponents/modal-general';
import PackageListForm from './form';
const FormModal = (pr) => {
  return (
    <ModalGeneral
      width={800}
      show={pr.open}
      close={pr.onClose}
      title={`${pr.id ? 'Update' : 'Add New'} Package`}
      subTitle={pr.id ? 'Update the existing package' : 'Create a new price plan'}
      // hideHeaderHr={true}
      // loading={st.getGJLoader}
      allowEscKey={false}
      render={<PackageListForm close={pr.onClose} appendData={pr.appendData} updateData={pr.updateData} id={pr.id} />} />
  )//End return
}//End function

export default FormModal