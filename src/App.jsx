import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Home/Home";
import PokemonList from "./PokemonList/PokemonList";
import TypeCalculator from "./TypeCalculator/TypeCalculator";
import NotFound from "./NotFound";
import PokemonPage from "./PokemonPage/PokemonPage";

function App() {
  const { dexId } = useParams();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<PokemonList />} />
            <Route path="/type-calculator" element={<TypeCalculator />} />
            <Route path="/pokemon/:dexId" element={<PokemonPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
