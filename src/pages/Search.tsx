import ResultsList from "../components/ResultsList/ResultsList";
import SearchForm from "../components/SearchForm/SearchForm";
import { useSearch } from "../state/Search";

const SearchPage = () => {
  const { results, isLoading } = useSearch();

  return (
    <>
      <SearchForm />
      {isLoading && <p>Loading...</p>}
      {results && <ResultsList />}
    </>
  );
};

export default SearchPage;
