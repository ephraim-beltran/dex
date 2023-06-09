import Navbar from "./Navbar";
import { createHashRouter, RouterProvider, BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Home/Home";
import TypeCalculator from "./TypeCalculator/TypeCalculator";
import NotFound from "./NotFound";
import PokemonPage from "./PokemonPage/PokemonPage";
import SearchPage from "./SearchPage/SearchPage";

function App() {
  const { dexId } = useParams();
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-centered">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/type-calculator" element={<TypeCalculator />} />
          <Route path="/pokemon/:dexId/*" element={<PokemonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
