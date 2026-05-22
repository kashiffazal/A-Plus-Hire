/*eslint-disable no-useless-escape*/
/*eslint-disable no-unreachable*/

//import React from 'react';
//import { Link } from 'react-router-dom';

import axios from 'axios';
import { notification, message, Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';
import IMask from 'imask';

message.config({ top: 62 });

export const HTTP = (method, url, data, raffData, hideErrorMsg = false, uploadProgressFunction = false) => {
  // url = window.domainPath + '/apis/index.php' + url;
  url = process.env.REACT_APP_API_URL + url;

  // const postObj = new FormData();
  // if (data) {
  //   let fileArr = [];//After separating files delete files object from main object
  //   Object.keys(data).forEach(function (key) {
  //     data[key] = data[key] ? data[key] : '';//Reset null to empty string
  //     //If it's found uploadable file object then set file upload array
  //     if (typeof (data[key]) === 'object') {
  //       Object.keys(data[key]).map(item => {
  //         // console.log(data[key][item]);
  //         if (data[key][item] && data[key][item]['uid']) {
  //           fileArr.push(key);
  //           var colName = (data[key].length > 1) ? key + '_' + item : key;
  //           // console.log(data[key][item],colName);
  //           postObj.append(colName, data[key][item].originFileObj ? data[key][item].originFileObj : data[key][item], data[key][item]['name']);
  //         }//End if condition
  //         return false;
  //       });
  //     }//End if condition
  //     //Delete file object from main content object              
  //     fileArr.filter((x, i, a) => a.indexOf(x) === i); //Make array unique
  //     fileArr.forEach(item => { delete data[item]; })
  //     //If it's get undefined type then set value as empty string
  //     if (typeof (data[key]) === 'undefined') { data[key] = ''; }
  //     // console.log(data);

  //     postObj.append(key, data[key]);
  //     // console.log(key, data[key]);
  //     // console.log(postObj)

  //   });//Appending data in postObj
  //   data = postObj;
  // }//End if condition for post with files if available

  return axios({
    method, url, data,
    //Send browser cookies created by php session (withCredentials: true)
    //If you remove this then php session will not be pass to another php page
    onUploadProgress: (e) => uploadProgressFunction ? uploadProgressFunction(Math.round((e.loaded * 100) / e.total), e) : '',
    withCredentials: true,
    headers: { Authorization: GetUserCookie() ? GetUserCookie().token : undefined }
  }).then(res => {
    //console.log(res.data);
    res = res.data;
    if (raffData) { console.log(res); }//Show raff data in console
    if (res.consoleLog) {
      console.log(url);
      console.log(res);
    }//End if condition
    if (res.status) {
      return HandelRequest(res, 200, url);
    } else {
      return hideErrorMsg ? false : HandelRequest(res, 400, url);
    }//End if condition
  }).catch(error => {
    return hideErrorMsg ? false : HandelRequest(error, 404, url);
  });
}//End function

export const HandelRequest = (res, statusCode, url = '') => {
  if (statusCode === 200) {
    if (res.duplicateData) {
      notification['info']({ message: res.infoTitle || 'Info', description: res.infoMsg || 'Data already exists', duration: res.infoDuration || 5 });
      return false;
    } else {
      /** If it's allow to show message/notification */
      if (res.successNotify) {
        if (res.successNotifyType === 'notify') {
          notification['success']({ message: res.successTitle || 'Success', description: res.successMsg || 'Request has been completed.', duration: res.successDuration || 5 });
        } else {
          message.success(res.successMsg || 'Request has been completed.', res.successDuration || 5);
        }//End if condition
      }//End if condition
      return res;
    }//End if condition
  }//End if condition for statusCode 200

  if (statusCode === 400) {
    console.log(url);
    console.log(res);
    /** If it has database error then redirect to Error page*/
    if (res.errorType === 'db-error') {
      // window.dbErrorModal = true;
      // window.dbErrorJSON = res;
      notification['error']({ message: res.errorTitle, description: res.errorMsg, duration: res.errorDuration || 10 });
      /** If it has session error then popup login screen*/
    } else if (res.errorType === 'session-error') {
      window.sessionExpire = true;
      return false;
    } else {
      /** Define the notify type as message/notification */
      if (res.errorNotifyType && res.errorNotifyType === 'message') {
        message[res.errorNotifyIcon ? res.errorNotifyIcon : 'error'](res.errorMsg || 'There are some error.', res.errorDuration || 10);
      } else {
        notification[res.errorNotifyIcon ? res.errorNotifyIcon : 'error']({ message: res.errorTitle || 'Error', description: res.errorMsg || 'There are some error', duration: res.errorDuration || 10 });
      }//End if condition
      return false;
    }//End if condition
  }//End if condition for statusCode 400

  if (statusCode === 404) {
    //console.log(res);
    //console.log(url);
    notification['error']({
      message: 'Error: Could not connect to Host',
      description: 'Please check your internet connection and try again',
      duration: 10,
      style: { width: 450, marginLeft: 335 - 400 },
    });
    return false;
  }//End if condition for statusCode 404
}//End function

export const RandomAlphaNumber = (count = 5, upperCase) => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < count; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
  if (upperCase) {
    return text.toUpperCase();
  } else {
    return text;
  }//End if condition
}//End function

export const Encode64 = (input) => {
  input = escape(input);
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return output;
}//End function

export const Decode64 = (input) => {
  if (!input) { return false; }
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  var base64test = /[^A-Za-z0-9\+\/\=]/g;
  if (base64test.exec(input)) {
    alert("There were invalid base64 characters in the input text.\n" +
      "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
      "Expect errors in decoding.");
  }
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  } while (i < input.length);
  return unescape(output);
}//End function

export const SaveArrLocalStorage = (arr, redirect = false, storageName = false, rootRedirection = false) => {
  let storageData = CheckStorageOrCreate();
  //If storageName is available then use is otherwise create it.
  if (!storageName) { storageName = RandomAlphaNumber(6, true); }
  storageData[storageName] = arr;
  localStorage.setItem(window.appLocalStorage, Encode64(JSON.stringify(storageData)));
  if (redirect) {
    if (rootRedirection) {
      window.location.href = "/#/" + redirect + "/" + storageName;
    } else {
      window.location.href = "/#/e/" + redirect + "/" + storageName;
    }//End if condition
  } else {
    return storageName;
  }//End if condition
}//End function

export const LoadArrLocalStorage = (storageName, redirect = true, routeName = false) => {
  let storageData = CheckStorageOrCreate();
  if (!storageData[storageName]) {
    if (redirect) {
      routeName ? window.location.href = "/#" + routeName : window.history.go(-2);
    }//End if condition
    return false;
  }
  return storageData[storageName];
}//End function

export const SetUserData = (userData) => {
  let storageData = CheckStorageOrCreate();
  storageData.ud = userData;
  storageData = Encode64(JSON.stringify(storageData));
  localStorage.setItem(window.appLocalStorage, storageData);
}//End function

export const GetUserData = () => {
  return JSON.parse(Decode64(localStorage.getItem(window.appLocalStorage))).ud;
}//End function

export const SetUserSetting = (userSetting) => {
  let storageData = CheckStorageOrCreate();
  storageData.ud.st = userSetting;
  storageData = Encode64(JSON.stringify(storageData));
  localStorage.setItem(window.appLocalStorage, storageData);
}//End function

export const GetUserSetting = () => {
  return JSON.parse(Decode64(localStorage.getItem(window.appLocalStorage))).ud.st;
}//End function

/*Check Storage is just inner function for services to check main app storage is created or not
If is not created the create it with empty object*/
export const CheckStorageOrCreate = () => {
  let storageData = Decode64(localStorage.getItem(window.appLocalStorage));
  storageData = (storageData ? JSON.parse(storageData) : {});
  return storageData;
}//End function

export const AccessControl = (ubac_id, keyword = 'OR') => {
  // console.log(GetUserData());
  var permissions = GetUserData() ? GetUserData().pc : false;
  if (!permissions) { return false; }
  if (permissions.trim() === 'all') { return true }
  permissions = permissions.split(',');

  ubac_id = ubac_id.toString().split(',');
  if (keyword === 'OR') {
    // ubac_id.forEach((id) => {
    for (var k = 0; k < ubac_id.length; k++) {
      for (var i = 0; i < permissions.length; i++) {
        if (ubac_id[k].toString() === permissions[i].toString()) { return true; break; }//end if condition
      }//End for loop
    }

    // });
  }//End if condition


  return false;
}//end function

export const GetCurrentYear = () => {
  const dt = new Date();
  return dt.getFullYear();
}//End function

export const UpdateRowInList = (row, listArr, idName = 'id') => {
  listArr = [...listArr];
  var dataIndex = listArr.findIndex(x => x[idName] === row[idName]);
  listArr[dataIndex] = { ...listArr[dataIndex], ...row };
  return listArr;
}//End function

export const InsertRowInList = (row, listArr) => {
  if (listArr) {
    listArr = [...listArr];
    row.key = (listArr.length + 1);//Total key of list +1
    listArr.unshift(row);
  } else {
    listArr = [row];
  }//End if condition
  return listArr;
}//End function

export const DeleteRowFromList = (listArr, idValue, idKey = 'id') => {
  listArr = [...listArr];
  var dataIndex = listArr.findIndex(x => x[idKey] === idValue);
  delete listArr[dataIndex];
  listArr = RemoveEmptyFromArray(listArr);
  listArr.reverse();
  listArr.forEach((item, i) => { listArr[i].key = (i + 1); })
  listArr.reverse();
  return listArr;
}//End function

export const GetIndexFromArray = (arr, colName, colValue) => {
  arr = [...arr];
  return arr.findIndex(x => x[colName] === colValue);
}//End function

export const RemoveEmptyFromArray = (arr) => {
  return arr.filter((el) => { return el != null });
}//End function

export const SortArrayById = (arr) => {
  return arr.sort((a, b) => {
    return a.id - b.id
  });
}//End function

export const SetDatePicker = (date, format = 'DD-MM-YYYY', addDays = false) => {
  if (!date) { return false; }
  if (addDays) {
    return dayjs(date, format).add(parseInt(addDays, 0), 'days')
  } else {
    return dayjs(date, format);
  }//End if condition
}//End function

export const SortableDateInTableData = (date) => {
  return (a, b) => {
    if (dayjs(a[date]).isBefore(dayjs(b[date]))) {
      return -1;
    } else { return 1; }
  }//End if condition
}//End function

//@Filter on each field - Start ---------------------------------------------------------------//
let searchInput = '';
export const TableColumnFilter = (appSetting = false, dataIndex, colValeArr = false) => {
  let select = false;
  let typeFilterRunTime = false;
  if (appSetting && !appSetting.allow) {
    return false;
  } else {
    select = (appSetting.filterByTypeOrSelect === 'select') ? true : false;
    typeFilterRunTime = appSetting.filterByTypeRunTime ? true : false;
  }//End if condition
  // console.log(typeFilterRunTime);
  let list = [];
  if (colValeArr && colValeArr[dataIndex] && colValeArr[dataIndex].length > 0) {
    colValeArr[dataIndex].forEach((element, i) => { list.push({ label: element, value: element, key: i }); });
  }//End if condition
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
        {select ?
          <Select
            ref={node => { searchInput = node }}
            value={selectedKeys[0]}
            onChange={e => {
              setSelectedKeys(e ? [e] : []);
              TableColumnFilterHandleSearch(selectedKeys, confirm, dataIndex)
            }}
            style={{ width: '200px', marginBottom: 8, display: 'block' }}
            showSearch
            placeholder="Select here"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={list}
          />
          :
          <Input ref={node => { searchInput = node }} placeholder={`Search here`} value={selectedKeys[0]}
            onChange={e => {
              setSelectedKeys(e.target.value ? [e.target.value] : [])
              // TableColumnFilterHandleSearch(selectedKeys, confirm, dataIndex)
              typeFilterRunTime && TableColumnFilterBtnAction(confirm, e.target.value ? e.target.value : '', dataIndex)
            }}
            onPressEnter={() =>
              TableColumnFilterHandleSearch(selectedKeys, confirm, dataIndex)
            } style={{ marginBottom: 8, display: 'block' }} />
        }
        {(!select && !typeFilterRunTime) &&
          <Button type="primary" size="small" onClick={() => TableColumnFilterBtnAction(confirm, selectedKeys[0], dataIndex, true)} style={{ width: '48%', marginRight: '4%' }}>Filter</Button>
        }
        <Button onClick={() =>
          TableColumnFilterHandleReset(clearFilters, confirm)
        } size="small" style={{ width: ((select || typeFilterRunTime) ? '100%' : '48%') }}>Reset</Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#e96b28' : undefined }} />,
    onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()) : '',
    onFilterDropdownOpenChange: visible => { if (visible && !select) { setTimeout(() => { searchInput.select(); }, 100); } },
    render: text =>
      sessionStorage.getItem('searchedColumn') === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[sessionStorage.getItem('searchText')]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  }//End return
};
const TableColumnFilterBtnAction = (confirm, selectedKeys, dataIndex, close = false) => {
  confirm({ closeDropdown: close });
  sessionStorage.setItem('searchText', selectedKeys);
  sessionStorage.setItem('searchedColumn', dataIndex);
}
const TableColumnFilterHandleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  sessionStorage.setItem('searchText', selectedKeys[0]);
  sessionStorage.setItem('searchedColumn', dataIndex);
};
const TableColumnFilterHandleReset = (clearFilters, confirm) => {
  clearFilters();
  // sessionStorage.setItem('searchText', '');
  TableColumnFilterBtnAction(confirm, '', '', true);
};
export const TableColumnListForSelectFilter = (data) => {
  data = multidimensionalArraySeparateInstance(data);
  let filterIndividualColArr = {};
  data.forEach(obj => {
    Object.keys(obj).forEach(label => {
      if (typeof obj[label] === 'string') { obj[label] = UCFirst(obj[label]) };
      if (!filterIndividualColArr[label]) { filterIndividualColArr[label] = []; }
      filterIndividualColArr[label].push(obj[label]);
    });
  });
  data[0] && Object.keys(data[0]).forEach(label => {
    filterIndividualColArr[label] = [...new Set(filterIndividualColArr[label])];//@ Array Unique
  });
  // console.log(filterIndividualColArr);
  return filterIndividualColArr;
};//End function
//@Filter on each field - End -----------------------------------------------------------------//

export const GetCurrentDate = (format = false) => {
  if (!format) { format = 2; }
  if (format === 1 || format === '1') { format = 'YYYY-MM-DD'; }
  if (format === 2 || format === '2') { format = 'MMM Do YYYY'; }
  return dayjs().format(format);
}//End function

export const GetCurrentTime = (format = 'hh:mm:ss A') => {
  return dayjs().format(format);
}//End function

export const GetCurrentDateTime = (Dateformat = false) => {
  return GetCurrentDate(Dateformat) + ', ' + GetCurrentTime();
}//End function

export const GetHourAndMinuteFromTowTime = (startTime, endTime) => {
  startTime = dayjs(startTime, "HH:mm:ss a");
  endTime = dayjs(endTime, "HH:mm:ss a");
  var hour = endTime.diff(startTime, 'hours');
  var min = (endTime.diff(startTime, 'minutes') % 60);
  var sec = ((endTime.diff(startTime, 'seconds') % 60) % 60);
  if (hour < 10) { hour = '0' + hour; }
  if (min < 10) { min = '0' + min; }
  if (sec < 10) { sec = '0' + sec; }
  return hour + ':' + min + ':' + sec;
}

export const GetDaysFromTowDate = (startDate, endDate = GetCurrentDate("DD-MM-YYYY")) => {
  if (!startDate) { return false; }
  startDate = dayjs(startDate, "DD-MM-YYYY");
  // console.log(startDate);
  endDate = dayjs(endDate, "DD-MM-YYYY");
  return startDate.diff(endDate, 'days');
}

export const GetObjectFromArr = (value, equalTo, arr) => {
  if (!arr) return {};
  let ret = arr.find((data) => data[equalTo] === value);
  if (ret) {
    return ret
  } else {
    return {};
  }//End if condition
}//End function

export const GetObjectIndexFromArr = (value, equalTo, arr) => {
  if (!arr) return {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][equalTo] === value) {
      return i;
    }//End if condition
  }//end for loop
  return false;
}//End function

export const SortObjectAscending = (object) => {
  return Object.entries(object).sort().reduce((_sortedObj, [k, v]) => ({ ..._sortedObj, [k]: v }), {});
}//End function

export const FormatDate = (date, format = 'DD-MM-YYYY') => {
  if (!date) { return false; }
  return dayjs(date).format(format);
}//End function

export const FormatNumber = (value, float = false) => {
  if (value) {
    value = value.toString().replace(/[,]/g, "");//Remove comma(s) if available
    value = parseFloat(value);//Convert number to float
    var attr = {};
    if (value.toString().indexOf('.') === -1) {
      attr = float ? { minimumFractionDigits: 2 } : {};
    }//End if condition
    // , { maximumFractionDigits: 2 }
    return value ? value.toLocaleString(navigator.language, attr) : '';
  } else {
    return false;
  }//End if condition
}//End function

export const arraySum = (arr) => {
  return arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
}//End function

export const arraySumByProperty = (arr, property, decimalCount = false, isJSONStringify = false) => {
  if (!arr) { return false }
  //console.log(arr);
  if (isJSONStringify) { arr = JSON.parse(arr); }
  let res = arr.reduce(function (sum, current) { return sum + (current[property] ? parseFloat(current[property]) : 0); }, 0);
  //console.log(res);
  if (decimalCount) { res = Number(res.toFixed(decimalCount)) }
  return res;
}//End function

export const multidimensionalArraySeparateInstance = (arr) => {
  const res = [];
  if (!arr) { return []; }
  arr.forEach(e => { res.push({ ...e }) })
  return res;
}//End function

export const multidimensionalObjectSeparateInstance = (object) => {
  const res = {};
  if (!object) { return {}; }
  // console.log(Object.keys(object));
  Object.keys(object).forEach(item =>
    res[item] = { ...object[item] }
  );
  // object.forEach(e => { res.push({ ...e }) })
  return res;
}//End function

export const arrayResetIndex = (arr) => {
  return arr.filter((_, index) => arr.hasOwnProperty(index));
}//End function

export const isJSON = (data) => {
  try {
    JSON.parse(data);
  } catch (e) { return false; }
  return true;
}//End function

export const contractItemFieldValueSet = (id, itemObj, originObj, oldVariety, varietyCallBack) => {
  var dataIndex = itemObj.item.findIndex(x => x.id === id);
  let varietyFieldValue = '';
  let originFieldValue = '';
  let res = {
    disableVarietyField: false,
    disableOriginField: false
  };
  //Set Variety Field
  if (itemObj.variety[dataIndex].variety_title !== '-') {
    varietyFieldValue = itemObj.variety[dataIndex].id;
    oldVariety = null;
    res = { ...res, disableVarietyField: true }
  } else {
    !oldVariety && varietyCallBack(id.split('%')[0], true);
    varietyFieldValue = '';
  }//Ed if condition
  //Set Origin Field
  if (itemObj.origin_hold[dataIndex].origin !== '-') {
    itemObj.origin = itemObj.origin_hold;
    originFieldValue = itemObj.origin[dataIndex].id;
    res = { ...res, disableOriginField: true }
  } else {
    itemObj.origin = originObj
    originFieldValue = '';
  }//End if condition
  res = { ...res, itemObj, originFieldValue, varietyFieldValue, oldVariety }
  return res;
}//End function

export const setFormStateValues = (state, fieldName, fieldValue) => {
  if (fieldValue === 'deleted') {
    delete state[fieldName];
  } else {
    state[fieldName] = fieldValue;
  }
  return state;
}//End function

export const FileDownload = (path, fileName) => {
  var element = document.createElement('a');
  element.setAttribute('href', path);
  element.setAttribute('target', '_blank');
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  //console.log(element);
  element.click();
  document.body.removeChild(element);
}//End function


export const LogResetRow = (data, listData) => {
  listData = [...listData];
  var dataIndex = listData.findIndex(x => x.id === data.id);
  listData[dataIndex] = { ...listData[dataIndex], ...data };
  return listData;
}//End function

export const LogResetList = (data, listData) => {
  listData = [...listData];
  data.key = (listData.length + 1);//Total key of list +1
  listData.unshift(data);
  return listData;
}//End function

export const LogDeleteRow = (data, listData) => {
  listData = [...listData];
  var dataIndex = listData.findIndex(x => x.id === data.id);
  delete listData[dataIndex];
  listData = listData.filter(item => item);
  listData.reverse();
  listData.forEach((item, i) => { listData[i].key = (i + 1); })
  listData.reverse();
  return listData;
}//End function

export const UCFirst = (str) => {//@Upper Capital First
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export const UCAFirst = (str) => {
  return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

export const withRouter = (Children) => {
  return (props) => {
    const match = { params: useParams() };
    const navigate = useNavigate();
    return <Children {...props} navigate={navigate} match={match} />
  }
}

export const ObscureEmail = email => {
  if (!email) return false;
  const [name, domain] = email.split("@");
  return `${name[0]}${new Array(name.length - 1).join("*")}${name[name.length - 1]}@${domain[0]}${new Array(domain.length - 1).join("*")}${domain[domain.length - 1]}`;
};

export const ObscurePhone = phone => {
  if (!phone) return false;
  let p = '';
  const pt = [];
  if (phone.includes('+')) { phone = phone.substring(3); }
  if (phone.includes('-')) { p = phone.split('-'); }
  if (phone.includes(' ')) { p = phone.split(' '); }
  if (typeof p === 'object') {
    p.forEach(el => { pt.push(`${new Array(el.length + 1).join("*")}`); });
  } else {
    pt.push('', phone);
    p = [...pt];
    pt[1] = `${new Array(pt[1].length + 1).join("*")}`;
  }//End if condition

  pt[pt.length - 1] = pt[pt.length - 1].substring(2) +
    p[pt.length - 1][p[p.length - 1].length - 2] +
    p[pt.length - 1][p[p.length - 1].length - 1];
  return pt.join(' ');
};

export const SetNumberMask = (id) => {
  const element = document.getElementById(id);
  if (!element) return;
  const maskOptions = { mask: process.env.REACT_APP_MOBILE_FORMAT_NUMBER };
  IMask(element, maskOptions);
  //? Must be use in useEffect
};

export const SetUserCookie = (data) => {
  let cookieName = process.env.REACT_APP_TOKEN_COOKIE_NAME;
  return Cookies.set(cookieName, Encode64(JSON.stringify(data)));
}//End function

export const UpdateUserCookie = (data) => {
  let cookieName = process.env.REACT_APP_TOKEN_COOKIE_NAME;
  let dt = Cookies.get(cookieName) ? JSON.parse(Decode64(Cookies.get(cookieName))) : {};
  return SetUserCookie({ ...dt, ...data });
}//End function

export const GetUserCookie = () => {
  let cookieName = process.env.REACT_APP_TOKEN_COOKIE_NAME;
  return Cookies.get(cookieName) ? JSON.parse(Decode64(Cookies.get(cookieName))) : null;
}//End function

export const SetAppCookie = (data) => {
  let cookieName = process.env.REACT_APP_APP_COOKIE_NAME;
  return Cookies.set(cookieName, Encode64(JSON.stringify(data)));
}//End function

export const UpdateAppCookie = (data) => {
  let cookieName = process.env.REACT_APP_APP_COOKIE_NAME;
  let dt = Cookies.get(cookieName) ? JSON.parse(Decode64(Cookies.get(cookieName))) : {};
  return SetAppCookie({ ...dt, ...data });
}//End function

export const GetAppCookie = () => {
  let cookieName = process.env.REACT_APP_APP_COOKIE_NAME;
  return Cookies.get(cookieName) ? JSON.parse(Decode64(Cookies.get(cookieName))) : null;
}//End function

export const RedirectToDashboard = (avoidDashboard = false,userData = false) => {
  let data = userData ? userData : GetUserCookie();
  // console.log(userData,data);
  let location = '';
  //@ Navigate to dashboard
  if (!data) { location = '/login'; }
  //# Ask For Payment
  if (data.ask_payment) { return '/app/payment'; }
  //# Navigate on condition
  if (!data.complete_by_type) {
    if (data.type === 'sw') { location = '/app/support-worker'; } //@ Navigate to Support Worker Form
    if (data.type === 'ndis') { location = '/app/ndis-provider'; } //@ Navigate to NDIS Provider Form
    if (data.type === 'sm') { location = '/app/self-managed-participant'; } //@ Navigate to Self Manage Participant Form
    if (data.type === 'ua') { location = '/app'; } //@ Navigate to Admin Dashboard
  } else {
    location = avoidDashboard ? false : '/app/dashboard'; //@ Navigate to dashboard
  }//End if condition
  return location;
}//End function

export const RedirectOnLogin = () => {
  if (!GetUserCookie()) {
    return '/login';
  } else {
    return null;
  }//End if condition
};

export const Logout = () => {
  Cookies.remove(process.env.REACT_APP_TOKEN_COOKIE_NAME);//# Set user data with token in cookies
  Cookies.remove(process.env.REACT_APP_APP_COOKIE_NAME);//# Set app data in cookies
  return '/login'; //@ Navigate to dashboard
}//End function
