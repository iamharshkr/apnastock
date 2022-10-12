import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./screens/About";
import Details from "./screens/Details";
import Disclaimer from "./screens/Disclaimer";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound";
import Privacy from "./screens/Privacy";
import SearchPage from "./screens/SearchPage";
import Terms from "./screens/Terms";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:symbol" element={<Details />} />
        <Route path="/search/:key" element={<SearchPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
