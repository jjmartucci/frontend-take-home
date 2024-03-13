import { createContext, useContext, useReducer } from "react";
import { Result } from "../components/ResultsList/ResultsList";

type SearchState = {
  searchQuery: string;
  results: Array<Result>;
  isLoading: boolean;
  isError: boolean;
  isIntentionalFailure: boolean;
};

type SearchQueryAction = {
  type: "searchQuery";
  value: string;
};

type ResultsAction = {
  type: "results";
  value: Result[];
};

type Action = { type: "loading" | "error" | "toggleIntentionalFailure" };

type DipatchActions = SearchQueryAction | ResultsAction | Action;

type SearchProviderProps = {
  children: React.ReactNode;
};

export const SearchContext = createContext<SearchState>({} as SearchState);
export const SearchDispatchContext = createContext(
  {} as React.Dispatch<DipatchActions>,
);

export const initialSearchState: SearchState = {
  searchQuery: "",
  results: [],
  isLoading: false,
  isError: false,
  isIntentionalFailure: false,
};

function searchReducer(
  searchState: SearchState,
  action: DipatchActions,
): SearchState {
  switch (action.type) {
    case "loading": {
      return { ...searchState, isLoading: true };
    }
    case "searchQuery": {
      return { ...searchState, searchQuery: action.value };
    }
    case "results": {
      return {
        ...searchState,
        results: action.value,
        isError: false,
        isLoading: false,
      };
    }
    case "error": {
      return { ...searchState, isError: true, isLoading: false };
    }
    case "toggleIntentionalFailure": {
      return {
        ...searchState,
        isIntentionalFailure: !searchState.isIntentionalFailure,
      };
    }
    default: {
      return searchState;
    }
  }
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [search, dispatch] = useReducer(searchReducer, initialSearchState);

  return (
    <SearchContext.Provider value={search}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext<SearchState>(SearchContext);
export const useSearchDispatch = () => useContext(SearchDispatchContext);
