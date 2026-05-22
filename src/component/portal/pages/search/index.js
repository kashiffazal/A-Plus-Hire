import { useState, useContext, useEffect } from "react";
import { message } from 'antd';
import ContextAPI from '../../../../context';
import { HTTP, setFormStateValues } from '../../../services';
import SearchFormPortal from './partial/form';
import DataTable from './partial/data-list';

const Search = () => {
  const context = useContext(ContextAPI);
  const [loader, setLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(true);
  const [listData, setListData] = useState({});

  const [formValues, setFormValues] = useState({});
  const [data, setData] = useState([]);
  //@ Pagination Settings
  const [paginationLimit, setPaginationLimit] = useState(10);
  const [paginationObj, setPaginationObj] = useState(null);
  const [totalCountPagination, setTotalCountPagination] = useState(0);
  const [tagsData, setTagsData] = useState({});
  const [closeTag, setCloseTag] = useState({});


  const ocf = (fieldValue, fieldName) => {
    if (fieldName === 'userCondition') { fieldValue = { ...formValues.userCondition, ...fieldValue }; }
    if (fieldName === 'swCondition') { fieldValue = { ...formValues.swCondition, ...fieldValue }; }
    setFormValues(setFormStateValues({ ...formValues }, fieldName, fieldValue));
  }//End function

  const Submit = (values) => {
    let limitData = paginationObj ? paginationObj : { offset: 0, limit: paginationLimit };
    setLoader(true);
    // console.log(formValues);
    HTTP('post', '/searchSW', { ...formValues, pagination: limitData }).then(res => {
      setLoader(false);
      if (!res) { return false; }
      setData(res.data);
      // console.log(res);
      setTagsData(formValues);
      setTotalCountPagination(res.count);
      if (res.noData) {
        message.config({ top: 20, duration: (res.duration ? res.duration : 2), maxCount: 1 });
        message.info(<span><span className="font-bold">{res.errorTitle}:</span> {res.errorMsg}</span>);
      }
    });
  }//End function

  const GetData = () => {
    setGetLoader(true)
    HTTP('get', '/getSearchFormData').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      setListData(res.data);
      // console.log(res);
    });
  }//End function

  useEffect(() => { GetData(); }, []);
  useEffect(() => { paginationObj && Submit(); }, [paginationObj]);

  return (
    <div className={`grid grid-cols-12 ${context.data.portal_grid_gap}`}>
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <SearchFormPortal onFinish={Submit} ocf={ocf} loader={loader}
          context={context}
          listData={listData}
          getLoader={getLoader}
          resetAll={() => {
            setData([]);
            setPaginationObj(null);
            setFormValues({});
            setTagsData({});
          }}
          closeTag={closeTag}
        />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        {/* {JSON.stringify(formValues)} */}
        {/* <div className="portal-container"> */}
        <DataTable
          data={data}
          loader={loader}
          context={context}
          paginationLimit={paginationLimit}
          setPaginationObj={setPaginationObj}
          setPaginationLimit={setPaginationLimit}
          totalCountPagination={totalCountPagination}
          tagsData={tagsData}
          listData={listData}
          onCloseTag={(objName, fieldName) => {
            //@ Delete data from 'formValues' by closing tags of filter.
            delete formValues[objName][fieldName];
            setFormValues(formValues);
            setCloseTag({ objName, fieldName });
            Submit();
          }}
          updateLastMessageSent={(lastDate, index) => {
            let dt = [...data];
            if (!dt[index].messageData[0]) { dt[index].messageData = [{ updatedAt: '' }]; }
            dt[index].messageData[0].updatedAt = lastDate;
            setData(dt);
          }}
        />
        {/* </div> */}
      </div>
    </div>
  )//End return
}//End function

export default Search;