import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Layout from "../components/common/Layout";
import AuthContainer from "../components/common/AuthContainer";
import { useParams } from "react-router-dom";

import AddressForm from "../components/specific/AddAddressPage/AddressForm";
import LoadingModal from "../components/common/LoadingModal";
import { MessageModal } from "../components/common/MessageModal";
import { ErrorModal } from "../components/common/ErrorModal";
import { UserService } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const EditAddressPage: React.FC = () => {
  const { addressID } = useParams<{ addressID: string }>();
  const numericAddressID = addressID ? Number(addressID) : null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { getUser } = useAuth();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<any>(null);

  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    setInProp(true);

    return () => {
      setInProp(true);
    };
  }, []);

  useEffect(() => {
    const loadAddress = async () => {
      console.log("numericAddressID", numericAddressID);
      if (numericAddressID) {
        try {
          setLoading(true);
          const address = await UserService.getUserAddress(
            getUser(),
            numericAddressID
          );
          console.log("address", address);
          setInitialValues(address); // Establecemos los valores iniciales del formulario con la dirección existente
        } catch (error: any) {
          setError(error.message);
          setIsErrorModalOpen(true);
        } finally {
          setLoading(false);
        }
      }
    };

    setInProp(true);
    loadAddress();
  }, [numericAddressID]);

  const handleUpdateAddress = async (address: {
    country: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    number: string;
    instructions?: string;
  }) => {
    if (numericAddressID) {
      setLoading(true);
      try {
        const response = await UserService.updateUserAddress(
          getUser(),
          numericAddressID,
          address
        );
        if (!response) {
          throw new Error("No se pudo actualizar la dirección");
        }
        navigate("/checkout/address"); // Redirigir a la página de checkout tras la actualización
      } catch (error: any) {
        setError(error.message);
        setIsErrorModalOpen(true);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsMessageModalOpen(false);
    setInProp(false);

    setTimeout(() => {
      navigate("/checkout");
    }, 300);
  };

  return (
    <CSSTransition
      in={inProp}
      timeout={300}
      classNames="fade"
      unmountOnExit
      appear
    >
      <Layout>
        <AuthContainer
          variant="address"
          icon={<HomeOutlinedIcon className="auth-avatar-icon" />}
        >
          {initialValues ? (
            <AddressForm
              onSubmit={handleUpdateAddress}
              initialValues={initialValues}
            />
          ) : (
            <LoadingModal open={loading} />
          )}
          <ErrorModal
            open={isErrorModalOpen}
            handleClose={() => setIsErrorModalOpen(false)}
            errorMessage={error}
          />
        </AuthContainer>
      </Layout>
    </CSSTransition>
  );
};

export default EditAddressPage;
