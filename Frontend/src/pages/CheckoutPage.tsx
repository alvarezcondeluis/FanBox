import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";

import Layout from "../components/common/Layout";

import { CSSTransition } from "react-transition-group";
import "../assets/styles/Transition.css";
import { ErrorModal } from "../components/common/ErrorModal.tsx";
import LoadingModal from "../components/common/LoadingModal.tsx";
import CartItems from "../components/specific/CheckoutPage/CartItems.tsx";
import PriceSummary from "../components/specific/CheckoutPage/PriceSummary.tsx";
import CouponMenu from "../components/common/CouponMenu.tsx";
const CheckoutPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [transition, setTransition] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTransition(true);
    setLoading(true);
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
        <Container
          sx={{ marginTop: "35px", display: "flex", alignItems: "end" }}
        >
          <CartItems />
          <PriceSummary isAddress={false} />
        </Container>
      </Layout>
    </CSSTransition>
  );
};

export default CheckoutPage;
