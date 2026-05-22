import React, { Component } from 'react';
import { Upload, Progress, Form, Button, Modal } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';
import './styles.css';

const { Dragger } = Upload;

class UploadFile extends Component {
  state = {
    fileList: [],
    extensionError: false,
    sizeError: false,
    uploadedFileView: null,
    valuePropsArr: [],
    filesCount: 0,
    hasFile: false,
    openViewModal: false,
    vieImageInModal: null
  };

  readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  };

  convertFileIntoBase64 = async (fileArr) => {
    let fileBase64 = [];
    for (const item of fileArr) {
      const base64Url = await this.readFileAsBase64(item);
      fileBase64.push(base64Url);
    }//End for loop
    return fileBase64;
    // console.log(fileBase64);
  }//End function

  checkFileTypes = (selectedFile) => {
    var fileTypeProvided = this.props.restrictExtension;
    if (fileTypeProvided) {
      //Split all types into array
      fileTypeProvided = fileTypeProvided.split(',');
      fileTypeProvided.unshift("-");//For cover 0 index for indexOf method
      //Getting selected file type
      var selectedExtension = selectedFile.name.split('.').pop();
      return (fileTypeProvided.indexOf(selectedExtension) >= 0 ? true : false);
    } else { return true }//End if condition
  }//End function

  setFile = (file) => {
    // console.log(file);
    var files = [...this.state.fileList];
    files = [...new Set(files.map(data => data))];//Remove duplicate
    if (this.props.multiple) {
      files.push(file);
    } else {
      files = [file];
    }//End if condition
    // console.log(files);
    // console.log(file);
    this.setFieldValue(files);
    this.setState({ fileList: files }, async () => {
      let fileList = await this.convertFileIntoBase64(this.state.fileList);
      this.props.onChange && this.props.onChange(this.props.multiple ? fileList : fileList[0]);
    });
  }//End if condition

  setFieldValue = async (files) => {
    // let formObj = {};
    // formObj[this.props.name] = files;
    // let fileList = await this.convertFileIntoBase64(files);
    this.props.formProps.setFieldsValue({ [this.props.name]: files });
  }//End if condition

  render() {
    const pr = this.props;
    const fileSize = (pr.fileSize ? pr.fileSize : 1);
    let currentValue = (pr.value && (typeof pr.value === 'object') && pr.value[0] && pr.value[0].name) ? pr.value : false;
    // console.log(currentValue);
    //const { fileList } = this.state;
    // const fp = this.props.formProps;
    const props = {
      multiple: pr.multiple ? true : false,
      accept: pr.accept,
      onRemove: (file, errorType = false) => {
        this.setState(state => {
          state.fileList = [...new Set(state.fileList.map(data => data))];//Remove duplicate
          state.hasFile = false;
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          this.setFieldValue(newFileList);
          this.props.onChange && this.props.onChange(this.props.multiple ? newFileList : newFileList[0]);
          return { fileList: newFileList };
        });
      },
      beforeUpload: file => {
        //Checking for provided types
        let checkFileType = this.checkFileTypes(file);
        let checkFileSize = (file.size / 1024 / 1024 <= parseInt(fileSize));

        if (checkFileType) {
          this.setState({ extensionError: false, hasFile: true });
          this.setFile(file);
        } else {
          this.setState({ extensionError: true, hasFile: false }, () => {
            setTimeout(() => {
              props.onRemove(file, true);
              this.props.onChange && this.props.onChange(null);
            }, 500);
          });
        }//End if condition
        if (checkFileSize) {
          this.setState({ sizeError: false, hasFile: true });
          this.setFile(file);
        } else {
          this.setState({ sizeError: true, hasFile: false }, () => {
            setTimeout(() => {
              props.onRemove(file, true);
              this.props.onChange && this.props.onChange(null);
            }, 500);
          });
        }//End if condition
        return false;
      },
      // multiple: pr.multiple ? pr.multiple : false,
      defaultFileList: currentValue ? currentValue : []
    };
    const normFile = e => {
      let files = [...e.fileList];
      if (!pr.multiple && files.length > 1) { files.shift(); }
      this.props.onChange && this.props.onChange(pr.multiple ? files : files[0]);
      if (files.length > 1) {
        this.setState({ filesCount: (files.length * 22) })
      } else {
        this.setState({ filesCount: 0 });
      }//End if condition
      return files;
    };
    const st = this.state;
    const name = pr.name ? pr.name : 'uploadedfile';
    const type = pr.type ? pr.type : '1';
    // console.log(this.props.value)
    return (
      <div className="c_fileUploaderContainer">
        <div className={pr.name + ' ' + (pr.loader ? "dragDropContainer fileNameAfterLoader " + pr.className : "dragDropContainer " + pr.className + (type === '2.1' ? ' btn-mode' : ''))}>
          <Form.Item
            name={name}
            label={pr.label ? pr.label : ''}
            help={pr.help ? pr.help : undefined}
            style={pr.containerStyle ? pr.containerStyle : {}}
            className={pr.containerClassName ? pr.containerClassName : ''}
            rules={[{ required: ((pr.noRequired || st.uploadedFileView) ? false : true), message: (pr.reqMsg ? pr.reqMsg : 'Required') }]}
            initialValue={st.valuePropsArr}
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            {type === '1' &&
              <>
                <Dragger {...props} disabled={pr.disabled ? true : false}>
                  <div className="dragDropContentContainer">
                    <div className="bg_img"></div>
                    <div className="content" style={{ paddingBottom: st.filesCount }}>
                      <h3 style={{ paddingTop: (st.filesCount > 0 ? '15px' : '0px') }}>{pr.title ? pr.title : 'Click or, drag and drop a file containing them here'}</h3>
                      <p className={
                        // (this.props.value && (typeof this.props.value === 'object') && this.props.value.length > 0)
                        st.hasFile ? "hidePara" : ""}>{pr.msg ? pr.msg : 'Select it from your computer instead...'}</p>
                      {pr.loader && <Progress percent={pr.progress} size="small" status={pr.progress < 100 ? 'active' : 'success'} />}
                      {st.extensionError && <p className="extensionError">Required file format ({pr.restrictExtension})</p>}
                      {st.sizeError && <p className="extensionError">Can not upload more then {pr.fileSize}MB</p>}
                    </div>
                  </div>
                </Dragger>
              </>
            }
            {type === '1.2' &&
              <>
                {/*//@ TailwindCSS is used for this type */}
                <Dragger {...props} disabled={pr.disabled ? true : false} className="_1_2_container">
                  <div className={`dragDropContentContainer !block !float-none`}>
                    <div className="bg_img !float-none !m-auto relative left-[10px]"></div>
                    <div>
                      <h3 className='font-semibold'>{pr.title ? pr.title : 'Click or, drag and drop a file containing them here'}</h3>
                      <p>{(pr.msg ? pr.msg : 'Select it from your computer instead...')}</p>
                      {pr.loader && <Progress percent={pr.progress} size="small" status={pr.progress < 100 ? 'active' : 'success'} />}
                      {st.extensionError && <p className="text-red-600 text-[11px]">Required file format ({pr.restrictExtension})</p>}
                      {st.sizeError && <p className="text-red-600 text-[11px]">Can not upload more then {pr.fileSize}MB</p>}
                    </div>
                  </div>
                </Dragger>
              </>
            }
            {type === '2.1' &&
              <>
                <Upload {...props} disabled={pr.disabled ? true : false} >
                  {/* <Tooltip placement="top" title={st.fileList[0] ? st.fileList[0].name : (pr.title ? pr.title : '')}> */}
                  <Button className={pr.btnClassName} icon={<UploadOutlined />} type={st.hasFile ? "primary" : ''}>{(pr.title ? pr.title : '')}</Button>
                  {/* </Tooltip> */}
                </Upload>
                {/* {st.fileList[0] && JSON.stringify(st.fileList[0].name)} === */}
                {/* {st.hasFile ? 'hasFile - True' : 'hasFile - False'} */}
                {(st.fileList[0] || st.hasFile) && <Button className={pr.closeClassName} icon={<CloseOutlined />} onClick={() => {
                  props.onRemove(st.fileList[0], true);
                  this.setState({ hasFile: false });
                  pr.onRemove && pr.onRemove();
                }}></Button>}
              </>
            }
          </Form.Item>

          {type === '1' &&
            st.uploadedFileView && st.uploadedFileView.map((item, i) => {
              return (<a href={(pr.filePath ? pr.filePath : '') + item} key={i} target="_blank" rel="noopener noreferrer" className="viewFileLink">{item}</a>)
            })}
          {type === '1.2' &&
            st.uploadedFileView && st.uploadedFileView.map((item, i) => {
              return (
                pr.viewImageOnModal ?
                  <button type="button" key={i} onClick={() => this.setState({ openViewModal: true, vieImageInModal: ((pr.filePath ? pr.filePath : '') + item) })} className="viewFileLink">View Uploaded File</button> :
                  <a href={(pr.filePath ? pr.filePath : '') + item} key={i} target="_blank" rel="noopener noreferrer" className="viewFileLink">View Uploaded File</a>
              )
            })}
          {type === '2.1' &&
            st.uploadedFileView && st.uploadedFileView.map((item, i) => {
              return (<a href={(pr.filePath ? pr.filePath : '') + item} key={i} target="_blank" rel="noopener noreferrer" className="viewFileLink">View</a>)
            })}


          <Modal width={pr.viewImageOnModalWidth ? pr.viewImageOnModalWidth : undefined} open={st.openViewModal} onCancel={() => this.setState({ openViewModal: false })} footer={[]}>
            <img src={st.vieImageInModal} alt="Preview" className='m-auto' />
          </Modal>


        </div>
      </div>
    );//End return
  }//End render

  componentDidMount() {
    var value = this.props.value;
    if (value && (typeof value === 'object') && value[0] && value[0].name) {
      this.setState({ valuePropsArr: value, filesCount: (value.length * 22) });
    }//End if condition
    // console.log(value, ((typeof value === 'object' && value.length > 0) ? 't' : 'f'));
    if (value && (typeof value === 'object' && value.length > 0)) { this.setState({ hasFile: true }); }
    if (this.props.uploadedDocuments) { this.setState({ uploadedFileView: this.props.uploadedDocuments.split(',') }) };
  }//End componentDidMount

  componentDidUpdate(prevProps) {
    if (prevProps.uploadedDocuments !== this.props.uploadedDocuments) {
      this.setState({ uploadedFileView: this.props.uploadedDocuments.split(',') });
    }
  }//End componentDidUpdate


}//End class

export default UploadFile;