import { Routes, Route } from "react-router-dom";
import Footer from "./pages/Footer.jsx";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <nav className="brown lighten-1">
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">Your Bakery Admin</a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="/site">View Site</a></li>
                    </ul>
                </div>
            </nav>
    
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />

            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}

export default App
