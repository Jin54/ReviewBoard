const SETMAPDATA = "saveData/SAVEMAPDATA";
const SETDETAILDATDA = "saveData/SETDETAILDATA";
const SETBOOKMARKDATA = "saveData/SETBOOKMARKDATA";
const DETAILID = "saveData/DETAILID";

export const setMapData = (mapData) => ({
  type: SETMAPDATA,
  mapData: mapData,
});

export const setBookmarkData = (bookmarkData) => ({
  type: SETBOOKMARKDATA,
  bookmarkData: bookmarkData,
});

export const setDetailData = (detailData) => ({
  type: SETDETAILDATDA,
  detailData: detailData,
});
export const setDetailID = (detailID) => ({
  type: DETAILID,
  detailID: detailID,
});

const initialState = {
  mapData: null,
  detailID: null,
  detailData: null,
  bookmarkData: null,
};

function saveData(state = initialState, action) {
  switch (action.type) {
    case SETMAPDATA:
      return {
        ...state,
        mapData: action.mapData,
      };
    case DETAILID:
      return {
        ...state,
        detailID: action.detailID,
      };
    case SETDETAILDATDA:
      return {
        ...state,
        detailData: action.detailData,
      };
    case SETBOOKMARKDATA:
      return {
        ...state,
        bookmarkData: action.bookmarkData,
      };
    default:
      return state;
  }
}

export default saveData;
