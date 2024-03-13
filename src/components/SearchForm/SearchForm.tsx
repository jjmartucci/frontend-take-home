import { NPM_API } from "../../constants";
import { useSearch, useSearchDispatch } from "../../state/Search";

import styles from "./SearchForm.module.css";

const SearchForm = () => {
  const { searchQuery, isIntentionalFailure } = useSearch();
  const dispatch = useSearchDispatch();

  const searchNPM = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "loading" });

    if (isIntentionalFailure) {
      dispatch({ type: "error" });
      return false;
    }
    const response = await fetch(`${NPM_API}${searchQuery}`);

    if (response.ok) {
      const data = await response.json();

      dispatch({ type: "results", value: data.map((item) => item.package) });
    } else {
      dispatch({ type: "error" });
    }
  };
  return (
    <div className={styles.SearchForm}>
      <form
        onSubmit={(e) => {
          searchNPM(e);
        }}
        className={styles.SearchForm__Form}
      >
        <input
          type="text"
          value={searchQuery}
          placeholder="Search packages"
          onChange={(e) =>
            dispatch({ type: "searchQuery", value: e.target.value })
          }
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
