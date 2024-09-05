import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Grid } from "@mui/material";
import "./AddressForm.css";
import { Country, Province, City } from "../../../interfaces/Address";
import SelectComponent from "./../../common/SelectComponent";
import api from "../../../api";
interface AddressFormProps {
  initialValues?: {
    country: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    number: string;
    instructions?: string;
  };
  onSubmit: (values: {
    country: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    number: string;
    instructions?: string;
  }) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    initialValues?.country || ""
  );
  const [selectedProvince, setSelectedProvince] = useState<string>(
    initialValues?.province || ""
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/geonames/countries");

        const countryData = response.data.map((country: any) => ({
          name: country.name,
          code: country.code, // Código de país alfa-2 (ej. 'US', 'FR')
        }));

        setCountries(
          countryData.sort((a: Country, b: Country) =>
            a.name.localeCompare(b.name)
          )
        );
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchProvinces = async () => {
        try {
          console.log(selectedCountry);
          const response = await api.get(
            `/geonames/countries/${selectedCountry}/provinces`
          );
          const provinceData = response.data.map((province: any) => ({
            name: province.name,
            code: province.code, // Utiliza el código correcto para la provincia
          }));
          setProvinces(provinceData);

          setSelectedProvince("");
          setCities([]); // Resetea las ciudades porque la provincia ha cambiado
        } catch (error) {
          console.error("Error fetching provinces", error);
        }
      };

      fetchProvinces();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await api.get(
            `/geonames/countries/${selectedCountry}/provinces/${selectedProvince}/cities`
          );
          const cityData = response.data.map((city: any) => ({
            name: city.name,
            code: city.geonameId, // Utiliza el código correcto para la ciudad si es necesario
          }));

          setCities(cityData);
        } catch (error) {
          console.error("Error fetching cities", error);
        }
      };

      fetchCities();
    }
  }, [selectedProvince]);

  return (
    <Formik
      initialValues={
        initialValues || {
          country: "",
          province: "",
          city: "",
          street: "",
          postalCode: "",
          number: "",
          instructions: "",
        }
      }
      validationSchema={Yup.object({
        country: Yup.string().required("El país es obligatorio"),
        province: Yup.string().required("La provincia es obligatoria"),
        city: Yup.string().required("La ciudad es obligatoria"),
        street: Yup.string().required("La calle es obligatoria"),
        postalCode: Yup.string().required("El código postal es obligatorio"),
        number: Yup.string().required("El número es obligatorio"),
        instructions: Yup.string(),
      })}
      onSubmit={onSubmit}
    >
      {({ handleChange, values, errors, touched, isSubmitting }) => (
        <Form>
          <div className="form-container">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-address-field">
                  <label htmlFor="country" className="auth-form-label">
                    País:
                  </label>
                  <SelectComponent
                    name="country"
                    content={countries.map((country) => country.name)}
                    value={values.country}
                    handleChange={(value) => {
                      const selectedCountryCode =
                        countries.find((country) => country.name === value)
                          ?.code || "";
                      console.log(selectedCountryCode);
                      setSelectedCountry(selectedCountryCode);
                      setSelectedProvince("");
                      setProvinces([]);
                      setCities([]);
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-address-field">
                  <label htmlFor="province" className="auth-form-label">
                    Provincia:
                  </label>
                  <SelectComponent
                    name="province"
                    content={provinces.map((province) => province.name)}
                    value={values.province}
                    handleChange={(value) => {
                      const selectedProvinceCode =
                        provinces.find((province) => province.name === value)
                          ?.code || "";
                      setSelectedProvince(selectedProvinceCode);
                      setCities([]);
                    }}
                    disabled={!selectedCountry}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-address-field">
                  <label htmlFor="city" className="auth-form-label">
                    Ciudad:
                  </label>
                  <SelectComponent
                    name="city"
                    content={cities.map((city) => city.name)}
                    value={values.city}
                    handleChange={(value) => {
                      handleChange(value);
                    }}
                    disabled={!selectedProvince}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-field">
                  <label htmlFor="street" className="auth-form-label">
                    Calle:
                  </label>
                  <Field
                    name="street"
                    aria-label="Calle"
                    className="address-form-input"
                    value={values.street}
                    onChange={handleChange}
                  />
                  {errors.street && touched.street && (
                    <div className="auth-error-message">{errors.street}</div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-field">
                  <label htmlFor="postalCode" className="auth-form-label">
                    Código Postal:
                  </label>
                  <Field
                    name="postalCode"
                    type="street"
                    aria-label="postalCode"
                    className="address-form-input"
                    value={values.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && touched.postalCode && (
                    <div className="auth-error-message">
                      {errors.postalCode}
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="auth-form-field">
                  <label htmlFor="number" className="auth-form-label">
                    Number:
                  </label>
                  <Field
                    name="number"
                    fullWidth
                    className="address-form-input"
                    value={values.number}
                    onChange={handleChange}
                  />
                  {errors.number && touched.number && (
                    <div className="auth-error-message">{errors.number}</div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="auth-form-field">
                  <label htmlFor="instructions" className="auth-form-label">
                    Instrucciones:
                  </label>
                  <Field
                    name="instructions"
                    fullWidth
                    className="address-form-input"
                    value={values.instructions}
                    onChange={handleChange}
                  />
                  {errors.instructions && touched.instructions && (
                    <div className="auth-error-message">
                      {errors.instructions}
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </div>

          <Button
            type="submit"
            variant="contained"
            className="auth-button-address"
            disabled={isSubmitting}
          >
            Guardar dirección
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
