import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  loading: true,
  hits: [],
  page: 0,
  nbPages: 50,
  query: 'react',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchStories = async () => {
    dispatch({ type: SET_LOADING })
    const response = await fetch(
      `${API_ENDPOINT}query=${state.query}&page=${state.page}`
    )
    const data = await response.json()
    console.log(data)
    dispatch({
      type: SET_STORIES,
      payload: { hits: data.hits, page: data.page, nbPages: data.nbPages },
    })
  }
  const remove = (id) => {
    dispatch({
      type: REMOVE_STORY,
      payload: id,
    })
  }
  const handleSearch = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }
  const handlePage = (value) => {
    dispatch({ type: HANDLE_PAGE, payload: value })
  }

  useEffect(() => {
    fetchStories()
  }, [state.query, state.page])
  return (
    <AppContext.Provider
      value={{
        ...state,
        remove,
        handleSearch,
        handlePage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }