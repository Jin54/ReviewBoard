const SAVEMAP = "setMap/SAVEMAP";

export const saveMap = (_map) => ({
  type: SAVEMAP,
  _map: _map,
});

const initialState = {
  _map: null,
};

function setMap(state = initialState, action) {
  switch (action.type) {
    case SAVEMAP:
      return {
        ...state,
        _map: action._map,
      };
    default:
      return state;
  }
}

export default setMap;
