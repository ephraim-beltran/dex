import Navbar from "./Navbar";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import PokemonList from "./PokemonList/PokemonList";
import TypeCalculator from "./TypeCalculator/TypeCalculator";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<PokemonList />} />
            <Route path="/type-calculator" element={<TypeCalculator />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
