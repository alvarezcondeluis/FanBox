import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Button, Link, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Layout from "../components/common/Layout";
import AuthContainer from "../components/common/AuthContainer";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "./LoginPage.css";
import "../assets/styles/Transition.css";

import { useNavigate } from "react-router-dom";
import LoadingModal from "../components/common/LoadingModal";
import { ErrorModal } from "../components/common/ErrorModal";
import { CSSTransition } from "react-transition-group";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const navigate = useNavigate();
  const { login, getUser } = useAuth();
  const { getCartItems } = useCart();
  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
  };

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      login(values.email, values.password);

      setLoading(false);
      setInProp(false);
      getCartItems(getUser());
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
      setIsErrorModalOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    setInProp(true);

    return () => {
      setInProp(false); // Esto activará la transición de salida
    };
  }, []);

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
          variant="login"
          icon={<PermIdentityIcon className="auth-avatar-icon" />}
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, handleChange, values, errors, touched }) => (
              <Form>
                <div className="form-container-login">
                  <div className="auth-form-field">
                    <label htmlFor="email" className="auth-form-label">
                      Correo electrónico:
                    </label>
                    <Field
                      name="email"
                      type="email"
                      aria-label="Correo electrónico"
                      className="auth-form-input"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div className="auth-error-message">{errors.email}</div>
                    )}
                  </div>

                  <div className="auth-form-field">
                    <label htmlFor="password" className="auth-form-label">
                      Contraseña:
                    </label>
                    <Field name="password">
                      {({ field }: FieldProps<string>) => (
                        <>
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="auth-form-input"
                          />

                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseUp={handleMouseUpPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="password-field-icon-container"
                          >
                            {showPassword ? (
                              <VisibilityOff className="password-field-icon" />
                            ) : (
                              <Visibility className="password-field-icon" />
                            )}
                          </IconButton>
                        </>
                      )}
                    </Field>
                    {errors.password && touched.password && (
                      <div className="auth-error-message password">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className="auth-button"
                    disabled={isSubmitting}
                  >
                    Iniciar Sesión
                  </Button>

                  <Link href="#" className="auth-links" variant="body2">
                    ¿Has olvidado la contraseña?
                  </Link>
                  <Link href="/register" className="auth-links" variant="body2">
                    ¿Eres nuevo en FanBox? Crea tu cuenta aquí
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          <LoadingModal open={loading} />
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

export default LoginPage;
