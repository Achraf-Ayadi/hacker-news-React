import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true }
    case SET_STORIES:
      return {
        ...state,
        loading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
        page: action.payload.page,
      }
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      }
    case HANDLE_SEARCH:
      return {
        ...state,
        query: action.payload,
      }

    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nextPage = state.page + 1
        if (nextPage > state.nbPages - 1) {
          nextPage = 0
        }
        return { ...state, page: nextPage }
      }
      if (action.payload === 'dec') {
        let nextPage = state.page - 1
        if (nextPage < 0) {
          nextPage = state.nbPages - 1
        }
        return { ...state, page: nextPage }
      }

    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer