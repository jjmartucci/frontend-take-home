import { NPM_API } from "../../constants";
import { useSearch, useSearchDispatch } from "../../state/Search";

import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const { searchQuery } = useSearch();
  const dispatch = useSearchDispatch();

  const searchNPM = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "loading" });

    const response = await fetch(`${NPM_API}${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "results", value: data.map((item) => item.package) });
    } else {
      dispatch({ type: "error" });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        searchNPM(e);
      }}
      className={styles.SearchForm}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) =>
          dispatch({ type: "searchQuery", value: e.target.value })
        } //setSearchQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
