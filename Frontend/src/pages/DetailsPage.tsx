import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import ProductImages from "../components/specific/ProductDetail/ProductImages.tsx";
import Layout from "../components/common/Layout";
import ProductDetails from "./../components/specific/ProductDetail/ProductDetails";
import { Product } from "../interfaces/Product.ts";
import { ProductService } from "../services/productService.ts";
import { useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "../assets/styles/Transition.css";
import { ErrorModal } from "../components/common/ErrorModal.tsx";
import LoadingModal from "../components/common/LoadingModal.tsx";
import ProductInfo from "../components/specific/ProductDetail/ProductInfo.tsx";
import "./DetailsPage.css";

const DetailsPage: React.FC = () => {
  // Datos de ejemplo. Normalmente se obtendrían a través de una llamada API.
  const { productID } = useParams<{ productID: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [error, setError] = useState<string>("");
  const [transition, setTransition] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      if (!productID) {
        throw new Error("El id no puede ser nulo");
      }

      const product = await ProductService.getProductById(productID);
      const images = await ProductService.getProductImages(productID);
      const units = await ProductService.getProductUnits(productID);
      product.images = images;
      product.units = units;
      setLoading(false);
      setProduct(product);
    } catch (error: Error | any) {
      setError(error.message);
      setIsErrorModalOpen(true);
      throw new Error();
    }
  };

  useEffect(() => {
    setTransition(true);
    setLoading(true);
    fetchProduct();
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
        <Container sx={{ marginTop: "35px" }}>
          <Box height="75vh" display="flex" flexDirection="column">
            <Grid container spacing={2} flexGrow={1}>
              <Grid item xs={12} md={6}>
                {product && <ProductImages images={product.images} />}
              </Grid>
              <Grid item xs={12} md={6}>
                {product && <ProductDetails product={product} />}
              </Grid>
            </Grid>
            <Box className="footer-divider-container-details">
              <Box className="footer-divider-details" />
            </Box>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: "35px" }}>
            <Grid item xs={12}>
              <ProductInfo />
            </Grid>
          </Grid>
          <LoadingModal open={loading} />
          <ErrorModal
            open={error.length > 0 && isErrorModalOpen}
            handleClose={() => setIsErrorModalOpen(false)}
            errorMessage={error}
          />
        </Container>
      </Layout>
    </CSSTransition>
  );
};

export default DetailsPage;
