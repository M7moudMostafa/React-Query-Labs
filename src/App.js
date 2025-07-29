import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import RQSuperHeroesPage from "./components/RQSuperHeroesPage";
import HomePage from "./components/HomePage";
import { RQSuperHeroPage } from "./components/RQSuperHeroPage";
import ParallelQueries from "./components/ParallelQueries.page";
import DynamicParallel from "./components/DynamicParallel.page";
import DependentQueries from "./components/DependentQueries.page";
import PaginatedQueries from "./components/PaginatedQueries.page";
import InfiniteQueries from "./components/InfiniteQueries.page";

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
            <Route path="/rq-parallel" element={<ParallelQueries />} />
            <Route
              path="/rq-super-heroes/:heroId"
              element={<RQSuperHeroPage />}
            />
            <Route
              path="/rq-dynamic-parallel"
              element={<DynamicParallel heroIds={[1, 3]} />}
            />
            <Route
              path="/rq-dependent"
              element={<DependentQueries email="memo@gmail.com" />}
            />
            <Route path="/rq-paginated" element={<PaginatedQueries />} />
            <Route path="/rq-infinite" element={<InfiniteQueries />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
