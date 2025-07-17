import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import RQSuperHeroesPage from "./components/RQSuperHeroesPage";
import HomePage from "./components/HomePage";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/super-heroes">Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to="/rq-super-heroes">RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/super-heroes" element={<SuperHeroesPage />} />
            <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
