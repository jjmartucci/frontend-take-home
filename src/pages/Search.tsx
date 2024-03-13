import FailButton from "../components/FailButton/FailButton";
import ResultsList from "../components/ResultsList/ResultsList";
import SearchForm from "../components/SearchForm/SearchForm";
import { useSearch } from "../state/Search";

const SearchPage = () => {
  const { results, isLoading, isError } = useSearch();

  return (
    <>
      <SearchForm />
      {isLoading && <p>Loading...</p>}
      {results && !isLoading && <ResultsList />}
      {isError && <p>Something went wrong!</p>}
      <FailButton />
    </>
  );
};

export default SearchPage;
