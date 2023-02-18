const SETMAPDATA = "saveData/SAVEMAPDATA";
const DETAILID = "saveData/DETAILID";
const SETDETAILDATDA = "saveData/SETDETAILDATA";
const SETBOOKMARKDATA = "saveData/SETBOOKMARKDATA";

export const setMapData = (mapData) => ({
  type: SETMAPDATA,
  mapData: mapData,
});

export const setBookmarkData = (BookmarkData) => ({
  type: SETBOOKMARKDATA,
  mapData: BookmarkData,
});

export const setDetailID = (detailID) => ({
  type: DETAILID,
  detailID: detailID,
});

export const setDetailData = (detailData) => ({
  type: SETDETAILDATDA,
  detailData: detailData,
});

const initialState = {
  mapData: null,
  detailID: null,
  detailData: null,
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
    default:
      return state;
  }
}

export default saveData;
