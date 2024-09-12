import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddressCard from "./AddressCard"; // Ajusta la ruta según tu estructura de archivos

import Address from "../../../interfaces/Address"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";
interface AddressListProps {
  addresses: Address[];
  onDelete: (addressID: number) => void;
}
const AddressList: React.FC<AddressListProps> = ({ addresses, onDelete }) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
  const navigate = useNavigate();
  const handleSelectAddress = (id: number) => {
    setSelectedAddressId(id);
  };
  const handleDeleteAddress = (id: number) => {
    onDelete(id);
  };
  const handleEditAddress = (id: number) => {
    navigate({ pathname: `/address/edit/${id}` });
  };

  const handleAddAddress = () => {
    navigate({ pathname: "/checkout/address/new" });
  };

  return (
    <Box>
      {addresses.length > 0
        ? addresses.map((address) => (
            <AddressCard
              key={address.addressID}
              isSelected={address.addressID === selectedAddressId}
              address={address}
              onSelect={() => handleSelectAddress(address.addressID)}
              onEdit={() => handleEditAddress(address.addressID)}
              onDelete={() => handleDeleteAddress(address.addressID)}
            />
          ))
        : ""}
      <Button
        variant="text"
        onClick={handleAddAddress}
        className="add-address-button"
      >
        + Agregar otro domicilio
      </Button>
    </Box>
  );
};

export default AddressList;
