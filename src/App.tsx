import { SearchProvider } from "./state/Search";
import SearchPage from "./pages/Search";
import "./styles/globals.css";

function App() {
  return (
    <SearchProvider>
      <SearchPage />
    </SearchProvider>
  );
}

export default App;
