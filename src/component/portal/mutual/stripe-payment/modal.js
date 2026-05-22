import StripePaymentForm from './index';
import ModalGeneral from '../../../mutualComponents/modal-general';

const StripePaymentModal = (pr) => {
  return (
    <ModalGeneral
      width={800}
      show={pr.open}
      close={pr.onClose}
      title='Payment'
      subTitle='Accept all kind of cards'
      // hideHeaderHr={true}
      // loading={st.getGJLoader}
      allowEscKey={false}
      render={<StripePaymentForm {...pr} modal={true} onClose={pr.onClose} />} />
  )//End return
}//End function

export default StripePaymentModal;