const SETMAPDATA = "saveData/SAVEMAPDATA" as const;
const SETDETAILDATDA = "saveData/SETDETAILDATA" as const;
const SETBOOKMARKDATA = "saveData/SETBOOKMARKDATA" as const;
const DETAILID = "saveData/DETAILID" as const;

// any로 한 이유 : mapData.setMap(null / _map) 함수를 사용해야 하는데 object로 설정하면 setMap가 객체에 없다고 뜸
export const setMapData = (mapData: any | null) => ({
  type: SETMAPDATA,
  mapData: mapData,
});

export const setBookmarkData = (bookmarkData: object | null) => ({
  type: SETBOOKMARKDATA,
  bookmarkData: bookmarkData,
});

export const setDetailData = (detailData: DetailDataType | null) => ({
  type: SETDETAILDATDA,
  detailData: detailData,
});

export const setDetailID = (detailID: number | null) => ({
  type: DETAILID,
  detailID: detailID,
});

type DataAction =
  | ReturnType<typeof setMapData>
  | ReturnType<typeof setBookmarkData>
  | ReturnType<typeof setDetailData>
  | ReturnType<typeof setDetailID>;

const initialState = {
  mapData: null,
  detailID: null,
  detailData: null,
  bookmarkData: null,
};

type DataState = {
  mapData: null | object;
  detailData: null | DetailDataType;
  bookmarkData: null | object;
  detailID: null | number;
};

interface DetailDataType {
  id: number;
  thumbnail: string;
  name: string;
  numberAddress: string;
  roadAddress: string;
  review_rating: number;
  review_number: number;
  time: string;
  number: string;
  sort: string;
}

function saveData(state: DataState = initialState, action: DataAction) {
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
