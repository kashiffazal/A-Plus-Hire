<UploadFile
className="m-b-10"
title=""
msg=""
//multiple={true}
accept=".csv, .jpg, .jpeg, .png"
restrictExtension="csv,jpg,pdf"
loader={st.loader}
progress={st.uploadProgress}
disabled={st.textAreaValue}
onChange={(files) => this.setState({uploadableFile : files, textAreaValue : ''})}
containerClassName=""
containerStyle=""
type={1 // 2.1}
btnClassName="mr-2" // for 2.1
closeClassName="mr-2" // for 2.1
viewImageOnModal={false} //view uploaded image on modal
viewImageOnModalWidth={400}
/>
