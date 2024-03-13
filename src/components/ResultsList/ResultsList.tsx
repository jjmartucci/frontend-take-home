import { useSearch } from "../../state/Search";
import styles from "./ResultsList.module.css";
import Markdown from "react-markdown";

export type Result = {
  links: {
    bugs: string;
    homepage: string;
    npm: string;
    repository: string;
  };
  name: string;
  version: string;
  description: string;

  maintainers: {
    name: string;
    email: string;
  }[];
};

const ResultsList = () => {
  const { results } = useSearch();
  return (
    <ul className={styles.ResultsList}>
      {results.map((result: Result) => (
        <li key={result.name} className={styles.ResultsList__Item}>
          <a href={result.links.npm}>
            <h3>{result.name}</h3>
          </a>
          <p>
            <Markdown>{result.description}</Markdown>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ResultsList;
