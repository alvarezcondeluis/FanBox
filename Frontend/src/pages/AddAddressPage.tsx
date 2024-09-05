import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Layout from "../components/common/Layout";
import AuthContainer from "../components/common/AuthContainer";

import AddressForm from "../components/specific/AddAddressPage/AddressForm";
import LoadingModal from "../components/common/LoadingModal";
import { MessageModal } from "../components/common/MessageModal";
import { ErrorModal } from "../components/common/ErrorModal";
import { UserService } from "../services/userService";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
const AddAddressPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { getUser } = useAuth();
  const navigate = useNavigate();

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

  const handleAddAddress = async (address: {
    country: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    number: string;
    instructions?: string;
  }) => {
    setLoading(true);

    try {
      const response = await UserService.addUserAddress(getUser(), address);

      if (!response) {
        throw new Error("La respuesta de registro es nula o indefinida");
      }

      setLoading(false);

      setModalContent({
        title: "Domicilio añadido",
        message:
          "Su domicilio ha sido añadido correctamente, serás redirigido a la página para proceder con el pago",
      });
      setIsMessageModalOpen(true);
    } catch (error: any) {
      setError(error.message);
      setIsErrorModalOpen(true);
      setLoading(false);
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
          <AddressForm onSubmit={handleAddAddress} />
          <LoadingModal open={loading} />
          <MessageModal
            open={isMessageModalOpen}
            title={modalContent.title}
            message={modalContent.message}
            handleClose={handleCloseModal}
          />
          <ErrorModal
            open={error.length > 0 && isErrorModalOpen}
            handleClose={() => setIsErrorModalOpen(false)}
            errorMessage={error}
          />
        </AuthContainer>
      </Layout>
    </CSSTransition>
  );
};

export default AddAddressPage;
