'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface SearchContextValue {
  searchRequested: boolean
  requestSearch: () => void
  clearSearchRequest: () => void
}

const SearchContext = createContext<SearchContextValue>({
  searchRequested: false,
  requestSearch: () => {},
  clearSearchRequest: () => {},
})

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchRequested, setSearchRequested] = useState(false)

  const requestSearch = useCallback(() => setSearchRequested(true), [])
  const clearSearchRequest = useCallback(() => setSearchRequested(false), [])

  return (
    <SearchContext.Provider value={{ searchRequested, requestSearch, clearSearchRequest }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearchContext() {
  return useContext(SearchContext)
}
