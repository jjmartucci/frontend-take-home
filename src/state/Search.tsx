import { createContext, useContext, useReducer } from "react";

export const SearchContext = createContext(null);
export const SearchDispatchContext = createContext(null);

export const initialSearchState = {
  searchQuery: "",
  results: [],
  isLoading: false,
  isError: false,
};

type Props = {
  children: React.ReactNode;
};

function searchReducer(searchState, action) {
  switch (action.type) {
    case "loading": {
      return { ...searchState, isLoading: true };
    }
    case "searchQuery": {
      return { ...searchState, searchQuery: action.value };
    }
    case "results": {
      return { ...searchState, results: action.value, isLoading: false };
    }
    case "error": {
      return { ...searchState, isError: true, isLoading: false };
    }
  }
}

export const SearchProvider = ({ children }: Props) => {
  const [search, dispatch] = useReducer(searchReducer, initialSearchState);

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
export const useSearchDispatch = () => useContext(SearchDispatchContext);
