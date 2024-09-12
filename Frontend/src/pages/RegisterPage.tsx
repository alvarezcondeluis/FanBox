import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Button, Link, IconButton, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import Layout from "../components/common/Layout";
import AuthContainer from "../components/common/AuthContainer";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./RegisterPage.css";
import "../assets/styles/Transition.css";
import { AuthService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../components/common/LoadingModal";
import { ErrorModal } from "../components/common/ErrorModal";
import { CSSTransition } from "react-transition-group";
import { MessageModal } from "../components/common/MessageModal";
import { useAuth } from "../contexts/AuthContext";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  firstName: Yup.string().required("El primer apellido es obligatorio"),
  lastName: Yup.string(),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El correo electrónico es obligatorio"),
  dateOfBirth: Yup.date()
    .required("La fecha de nacimiento es obligatoria")
    .nullable(),
  mobile: Yup.string()
    .matches(/^[0-9]{9}$/, "El número de móvil debe tener 9 dígitos")
    .required("El móvil es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debes confirmar la contraseña"),
});

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [inProp, setInProp] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const { login } = useAuth();
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (values: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date | null;
    mobile: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);

    try {
      const response = await AuthService.register({
        name: values.name,
        firstName: values.firstName,
        lastName: values.lastName, // Combina ambos apellidos
        email: values.email,
        dateOfBirth: values.dateOfBirth,
        phone: values.mobile, // Cambia 'mobile' a 'phone' para coincidir con el backend
        passwd: values.password, // Cambia 'password' a 'passwd' para coincidir con el backend
      });

      if (!response) {
        throw new Error("La respuesta de registro es nula o indefinida");
      }
      setFormValues({ email: values.email, password: values.password });
      setLoading(false);

      setModalContent({
        title: "Registro exitoso",
        message:
          "Tu cuenta ha sido creada exitosamente. Serás redirigido a la pantalla de inicio.",
      });
      setIsMessageModalOpen(true);
    } catch (error: any) {
      setError(error.message);
      setIsErrorModalOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    setInProp(true);

    return () => {
      setInProp(true);
    };
  }, []);

  const handleCloseModal = () => {
    setIsMessageModalOpen(false);
    setInProp(false);
    login(formValues.email, formValues.password);
    setTimeout(() => {
      navigate("/");
    }, 300);
  };
  const handleMouseUpPassword = () => {
    setShowPassword(false);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
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
          variant="register"
          icon={<PermIdentityIcon className="auth-avatar-icon" />}
        >
          <Formik
            initialValues={{
              name: "",
              firstName: "",
              lastName: "",

              email: "",
              dateOfBirth: null,
              mobile: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({
              isSubmitting,
              handleChange,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form>
                <div className="form-container">
                  <div className="auth-form-register-field">
                    <label htmlFor="name" className="auth-form-label">
                      Nombre:
                    </label>
                    <Field
                      name="name"
                      type="text"
                      className="auth-form-register-input"
                      value={values.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <div className="auth-error-message">{errors.name}</div>
                    )}
                  </div>

                  <div className="auth-form-register-field">
                    <label htmlFor="firstName" className="auth-form-label">
                      Primer Apellido:
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className="auth-form-register-input"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="auth-error-message">
                        {errors.firstName}
                      </div>
                    )}
                  </div>

                  <div className="auth-form-register-field">
                    <label htmlFor="lastName" className="auth-form-label">
                      Segundo Apellido:
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className="auth-form-register-input"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="auth-error-message">
                        {errors.lastName}
                      </div>
                    )}
                  </div>

                  <div className="auth-form-register-field">
                    <label htmlFor="email" className="auth-form-label">
                      Correo electrónico:
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="auth-form-register-input"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <div className="auth-error-message">{errors.email}</div>
                    )}
                  </div>

                  <div className="auth-form-register-field">
                    <label htmlFor="dateOfBirth" className="auth-form-label">
                      Fecha de nacimiento:
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={values.dateOfBirth}
                        onChange={(value) =>
                          setFieldValue("dateOfBirth", value)
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "white",
                            height: "36px",
                            width: "100%",
                          },
                        }}
                      />
                    </LocalizationProvider>
                    {errors.dateOfBirth && touched.dateOfBirth && (
                      <div className="auth-error-message">
                        {errors.dateOfBirth}
                      </div>
                    )}
                  </div>

                  <div className="auth-form-register-field">
                    <label htmlFor="mobile" className="auth-form-label">
                      Móvil:
                    </label>
                    <Field
                      name="mobile"
                      type="text"
                      className="auth-form-register-input"
                      value={values.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="auth-error-message">{errors.mobile}</div>
                    )}
                  </div>

                  <div className="auth-form-register-field password">
                    <label htmlFor="password" className="auth-form-label">
                      Contraseña:
                    </label>
                    <Field
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    >
                      {({ field }: FieldProps<string>) => (
                        <>
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="auth-form-register-input"
                          />

                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseUp={handleMouseUpPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="password-field-icon-container-register"
                          >
                            {showPassword ? (
                              <VisibilityOff className="password-field-icon-register" />
                            ) : (
                              <Visibility className="password-field-icon-register" />
                            )}
                          </IconButton>
                        </>
                      )}
                    </Field>
                    {errors.password && touched.password && (
                      <div className="auth-error-register-message password">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <div className="auth-form-register-field password">
                    <label
                      htmlFor="confirmPassword"
                      className="auth-form-label"
                    >
                      Vuelve a introducir la contraseña:
                    </label>
                    <Field
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                    >
                      {({ field }: FieldProps<string>) => (
                        <>
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="auth-form-register-input"
                          />

                          <IconButton
                            aria-label="toggle password visibility"
                            onMouseUp={handleMouseUpPassword}
                            onMouseDown={handleMouseDownPassword}
                            className="password-field-icon-container-register"
                          >
                            {showPassword ? (
                              <VisibilityOff className="password-field-icon-register" />
                            ) : (
                              <Visibility className="password-field-icon-register" />
                            )}
                          </IconButton>
                        </>
                      )}
                    </Field>
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="auth-error-register-message password">
                        {errors.confirmPassword}
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
                    Registrarse
                  </Button>

                  <Link
                    href="/login"
                    className="auth-links-register"
                    variant="body2"
                  >
                    ¿Ya tienes cuenta? Inicia sesión aquí
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
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

export default RegisterPage;
