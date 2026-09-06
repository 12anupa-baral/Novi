import { BrowserRouter, Routes, Route } from "react-router-dom";
import { C } from "./theme/color";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Product from "./pages/Product";

export default function App() {
  return (
    <div style={{ background: C.bg, color: C.fg, minHeight: "100%" }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
