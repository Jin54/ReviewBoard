//지도 줌 인&줌 아웃
export const zoomIn = (_map) => {
  _map.setLevel(_map.getLevel() - 1);
};

export const zoomOut = (_map) => {
  _map.setLevel(_map.getLevel() + 1);
};
