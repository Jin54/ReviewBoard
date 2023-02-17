
export const BOOKMARK = 'BOOKMARK'

export const bookmark = (id) => ({
  type: BOOKMARK,
  id: id,
});


const initialState = [];

function bookmarkFuc(state = initialState, action) {
    console.log(state)

  switch (action.type) {
    case BOOKMARK:
        if(state.includes(action.id)){
            console.log('if문 실행')
            return state.filter((id) => id !== action.id)
        }else{
            return [...state, action.id];
        }
    default:
      return state;
  }
}

export default bookmarkFuc;
