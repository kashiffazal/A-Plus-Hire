<ModalGeneral
  show={st.viewBillModal}
  close={() => this.setState({ viewBillModal: false })}
  width={450}
  noTitle={false}
  title="aasdfaf"
  subTitle="sf asdfas df"
  render={<div>asdfasdf</div>}
  pdfPath={}
  hideHeaderHr={true/false}
  loading={st.viewBillLoader}
  loadingTitle="Loading Please sssss"
  allowEscKey={true}//Esc button will not work
  allowClose={true}
  headerRightRender={<Button type="primary" ghost><i className="las la-file-pdf pos-relative top-2 fs-17" />&nbsp;Add Some Value</Button>}
  className=""
/>
