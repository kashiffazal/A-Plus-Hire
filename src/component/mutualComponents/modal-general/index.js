import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import ScreenLoader from '../screen-loader';
import './styles.css';

export default function ModalGeneral(pr) {
  //@ Setting States
  const [showCloseBtn, setShowCloseBtn] = useState(true);
  const [allowKeyboardEsc, setAllowKeyboardEsc] = useState(false)

  const title = pr.title ? pr.title : 'View Detailed File';
  const subTitle = pr.subTitle ? pr.subTitle : 'Detailed PDF view'
  const width = pr.width ? pr.width : window.gjModalWidth;
  const isPDF = ('pdfPath' in pr) ? true : false;//@Check if pdfPath is available in Props or not
  // const showHeaderHrOnLoading = (isPDF && pr.loading) ? true : false;//@ Show hr on Pdf View While Loader
  const hideHeaderHr = isPDF ? (pr.loading ? false : true) : pr.hideHeaderHr;
  // hideHeaderHr = isPDF ? 



  useEffect(() => {
    if (('allowClose' in pr) && !pr.allowClose) {
      setAllowKeyboardEsc(false);
      setShowCloseBtn(false);
    } else {
      let allowEscKey = pr.loading ? false : pr.allowEscKey;//On Loading avoid Esc key, then set by props
      setAllowKeyboardEsc(allowEscKey);
      setShowCloseBtn(true);
    }//End if condition
  }, [pr])


  return (
    <Modal
      width={width}
      maskClosable={false}
      className={`custom-modal-container my-5 ${pr.className ? pr.className : ''}`}
      centered={true}
      // title={title}
      open={pr.show}
      onOk={() => pr.close()}
      onCancel={() => pr.close()}
      keyboard={allowKeyboardEsc}//Esc button will not work
      destroyOnClose={true}
    >
      <div className="custom-modal-container">
        {showCloseBtn && <button type="button" className="hide-header-close-btn btnToLink" onClick={() => pr.close()}><i className="las la-times" /></button>}
        {/* <div className={(!pr.hideHeaderHr || (pr.hideHeaderHr && !showHeaderHrOnLoading)) ? "modal-modern-title-for-view-details" : "modal-modern-title"}> */}
        <div className={pr.noTitle ? '' : (hideHeaderHr ? "modal-modern-title-for-view-details" : "modal-modern-title")}>
          {!pr.noTitle &&
            <div>
              <span className="title">{title}</span>
              <span className="sub-title">{subTitle}</span>
            </div>
          }
          {pr.headerRightRender && <div>{pr.headerRightRender}</div>}
        </div>
        <ScreenLoader active={pr.loading} tip={pr.loadingTitle}>
          {pr.loading && <div className="h-200" />}
          {pr.render && pr.render}
          {/* {pr.pdfPath ? <iframe title={title} src={window.googleDocViewerPDF + pr.pdfPath} className="pdfIframe" allow="autoplay; encrypted-media" allowtransparency="true" allowFullScreen /> : 'No PDF Found'} */}
          {/* https://docs.google.com/viewerng/viewer?url=https://blockims.horizonstradingcorporation.com/server/report_files/1/general_journal_report_1.pdf?k=ac0f */}
          {isPDF && //@If pdfPath is available then execute farther
            (pr.pdfPath ? <iframe title={title} src={window.googleDocViewerPDF + pr.pdfPath} className="pdfIframe" allow="autoplay; encrypted-media" allowtransparency="true" allowFullScreen /> :
              //@If loading is True then no Message other on Missing Link show message
              (pr.loading ? '' : 'No PDF Found')
            )
          }
        </ScreenLoader>
      </div>
    </Modal>
  )//End return
}//End function
