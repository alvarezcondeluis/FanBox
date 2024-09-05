// src/pages/LandingPage.tsx
import React, { useState, useEffect } from "react";
import Banner from "../components/specific/LandingPage/Banner";
import Features from "../components/specific/LandingPage/Features";
import ProductSection from "../components/specific/LandingPage/ProductSection";
import "./LandingPage.css";
import { ProductService } from "../services/productService";
import { Product } from "../interfaces/Product";
import Layout from "../components/common/Layout";
import { CSSTransition } from "react-transition-group";
import "../assets/styles/Transition.css";

const LandingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [transition, setTransition] = useState(false);

  // useEffect para ejecutar la función cuando el componente se monta
  useEffect(() => {
    setTransition(true);
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await ProductService.getAllProducts();
        setProducts(fetchedProducts); // Aquí actualizas el estado con los productos obtenidos
        console.log(fetchedProducts); // Aquí los productos deberían aparecer correctamente
      } catch (error) {
        console.log(error);
        throw new Error("Error al obtener los productos");
      }
    };

    fetchProducts();

    return () => {
      setTransition(false); // Esto activará la transición de salida
    };
  }, []);

  return (
    <CSSTransition
      in={transition}
      timeout={300}
      classNames="fade"
      unmountOnExit
      appear
    >
      <Layout>
        <div className="landing-page-container">
          <div className="page-container">
            <Banner />
            <Features />
          </div>
          <div className="product-container">
            <ProductSection title="Recomendados para ti" products={products} />
            <ProductSection title="Productos destacados" products={products} />
            <ProductSection title="Últimos lanzamientos" products={products} />
          </div>
        </div>
      </Layout>
    </CSSTransition>
  );
};

export default LandingPage;
