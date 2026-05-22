import ModalGeneral from '../../../../mutualComponents/modal-general';
import PackageBox from './package-box';
const PackageModal = (pr) => {
  return (
    <ModalGeneral
      width={1200}
      show={pr.open}
      close={pr.onClose}
      title={' '}
      subTitle={' '}
      hideHeaderHr={true}
      // loading={st.getGJLoader}
      // allowEscKey={false}
      allowClose={pr.allowClose}
      render={<PackageBox closeModal={pr.onClose} />} />
  )//End return
}//End function

export default PackageModal;