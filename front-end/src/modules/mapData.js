const SETMAPDATA = "mapData/SETMAPDATA";

export const setMapData = (data) => ({
  type: SETMAPDATA,
  data: data,
});

const initialState = {
  data: null,
};

function mapData(state = initialState, action) {
  switch (action.type) {
    case SETMAPDATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
}

export default mapData;
