import React from "react";
import { Box, Typography, Radio, Link } from "@mui/material";
import "./AddressCard.css";
import Address from "../../../interfaces/Address";
interface AddressCardProps {
  address: Address;
  isSelected: boolean; // Cambia el nombre de la función a isSelected
  onSelect: (addresId: number) => void;
  onEdit: (addresId: number) => void;
  onDelete: (addresId: number) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({
  isSelected,
  address,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (addressID: number) => {
    onDelete(addressID);
  };
  return (
    <Box
      className={`address-card ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(address.addressID)}
    >
      <Box display="flex" alignItems="center">
        <Radio
          checked={isSelected}
          value={1}
          name="address-radio"
          className="address-card-radio"
          onClick={(e) => {}}
        />
        <Box className="address-card-details">
          <Typography className="address-card-text" variant="body1">
            {address.city}, {address.country}
          </Typography>
          <Typography className="address-card-text" variant="body2">
            {address.street}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Link
          color="#B6DEFA"
          marginRight={2}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address.addressID);
          }}
          className="address-card-edit-link"
        >
          Editar
        </Link>
        <Link
          color="#B6DEFA"
          mr={0}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(address.addressID);
          }}
          className="address-card-edit-link"
        >
          Eliminar
        </Link>
      </Box>
    </Box>
  );
};

export default AddressCard;
