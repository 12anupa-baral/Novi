import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import About from "../pages/About";
import Blog from "../pages/Blog";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Product from "../pages/Product";
import ErrorBoundary from "../components/common/ErrorBoundary";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
