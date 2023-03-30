const SAVEMAP = "setMap/SAVEMAP" as const;

export const saveMap = (_map: any) => ({
  type: SAVEMAP,
  _map: _map,
});

type MapAction = ReturnType<typeof saveMap>;

const initialState = {
  _map: null,
};

type MapState = {
  _map: null | any;
};

function setMap(state: MapState = initialState, action: MapAction) {
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
