import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material";

import Layout from "../components/common/Layout";

import { CSSTransition } from "react-transition-group";
import "../assets/styles/Transition.css";
import { ErrorModal } from "../components/common/ErrorModal.tsx";
import LoadingModal from "../components/common/LoadingModal.tsx";
import { UserService } from "../services/userService.ts";

import AddressList from "../components/specific/OrderAdress/AddressList.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import Address from "../interfaces/Address.ts";
import PriceSummary from "../components/specific/CheckoutPage/PriceSummary.tsx";
const OrderAddressPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [transition, setTransition] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { getUser, userID } = useAuth();
  useEffect(() => {
    const getAddresses = async () => {
      try {
        setTransition(true);
        setLoading(true);
        if (!userID) {
          console.log("User ID is not available yet.");
          return; // Salir si el userID aún no está disponible
        }

        const addresses = await UserService.getUserAddresses(userID);
        setAddresses(addresses);
      } catch (error: any) {
        setError(error.message);
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      getAddresses(); // Solo intentar obtener direcciones si userID está disponible
    }
  }, [userID]); // Dependencia de userID

  const handleDeleteAddress = async (addressID: number) => {
    try {
      setLoading(true);
      const deleted = await UserService.deleteUserAddress(userID, addressID);
      if (!deleted) {
        setError("No se pudo eliminar la dirección");
        setIsErrorModalOpen(true);
        return;
      }
      const addresses = await UserService.getUserAddresses(userID);
      setAddresses(addresses);
    } catch (error: any) {
      setError(error.message);
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CSSTransition
      in={transition}
      timeout={300}
      classNames="fade"
      unmountOnExit
      appear
    >
      <Layout>
        <Container sx={{ marginTop: "35px", display: "flex", gap: "50px" }}>
          <AddressList addresses={addresses} onDelete={handleDeleteAddress} />

          <PriceSummary isAddress={true} />
        </Container>
      </Layout>
    </CSSTransition>
  );
};

export default OrderAddressPage;
