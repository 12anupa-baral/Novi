import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Product from "../pages/Product";

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;

