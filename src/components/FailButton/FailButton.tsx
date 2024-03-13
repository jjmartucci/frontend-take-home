import { useSearch, useSearchDispatch } from "../../state/Search";
import styles from "./FailButton.module.css";

const FailButton = () => {
  const { isIntentionalFailure } = useSearch();
  const dispatch = useSearchDispatch();

  return (
    <div className={styles.FailButton}>
      <input
        id="fail"
        type="checkbox"
        checked={isIntentionalFailure}
        onChange={(e) => dispatch({ type: "toggleIntentionalFailure" })}
      />
      <label htmlFor="fail">Intentional Failure Mode</label>
    </div>
  );
};

export default FailButton;
