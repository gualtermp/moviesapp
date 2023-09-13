import { Provider } from "react-redux";
import { Header } from "./components/Header/Header";
import { MoviesListPage } from "./components/MoviesListPage/MoviesListPage";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <MoviesListPage />
      </Provider>
    </>
  );
}

export default App;
