import React from "react";
import { useFormikContext } from "formik";
import { FormControl, Autocomplete, TextField } from "@mui/material";

interface SelectComponentProps {
  name: string;
  content: string[];
  value: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  name,
  content,
  value,
  handleChange,
  disabled,
}) => {
  const { setFieldValue } = useFormikContext<{ [key: string]: string }>();

  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: "white",
        borderRadius: "5px",
      }}
      variant="outlined"
    >
      <Autocomplete
        disablePortal
        disabled={disabled}
        id={name}
        options={content}
        value={value || null}
        onChange={(event, newValue) => {
          const selectedValue = newValue || "";
          setFieldValue(name, selectedValue);
          handleChange(selectedValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            disabled={disabled}
            sx={{
              height: "40px", // Cambia la altura del campo de entrada
              "& .MuiInputBase-root": {
                backgroundColor: "#f0f0f0", // Cambia el color de fondo del campo de entrada
                height: "100%", // Asegura que la altura se aplique correctamente
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(0, 0, 0, 0.23)", // Color del borde
              },
            }}
          />
        )}
        ListboxProps={{
          sx: {
            backgroundColor: "#f9f9f9", // Cambia el color de fondo del menú desplegable
          },
        }}
        sx={{ width: "100%" }}
      />
    </FormControl>
  );
};

export default SelectComponent;
