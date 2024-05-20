import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const RegisterParkingSpacesModal = ({
  data,
  setData,
  dataEdit,
  isOpen,
  onClose,
}) => {
  const [vehiclePlate, setVehiclePlate] = useState(dataEdit.vehiclePlate || "");
  const [ownerName, setOwnerName] = useState(dataEdit.ownerName || "");
  const [apartmentNumber, setApartmentNumber] = useState(
    dataEdit.apartmentNumber || ""
  );
  const [block, setBlock] = useState(dataEdit.block || "");
  const [vehicleModel, setVehicleModel] = useState(dataEdit.vehicleModel || "");
  const [vehicleColor, setVehicleColor] = useState(dataEdit.vehicleColor || "");
  const [parkingSpotNumber, setParkingSpotNumber] = useState(
    dataEdit.parkingSpotNumber || ""
  );

  const toast = useToast();

  const handleSave = () => {
    if (
      !vehiclePlate ||
      !ownerName ||
      !apartmentNumber ||
      !block ||
      !vehicleModel ||
      !vehicleColor ||
      !parkingSpotNumber
    ) {
      return;
    }

    const updatedData = {
      vehiclePlate,
      ownerName,
      apartmentNumber,
      block,
      vehicleModel,
      vehicleColor,
      parkingSpotNumber,
    };

    let newDataArray;
    if (Object.keys(dataEdit).length) {
      newDataArray = data.map((item, index) =>
        index === dataEdit.index ? updatedData : item
      );
    } else {
      newDataArray = data ? [...data, updatedData] : [updatedData];
    }

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();

    console.log(newDataArray[newDataArray.length - 1])

    toast({
      title: "Informações salvas com sucesso.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>PLACA DO VEÍCULO</FormLabel>
                <Input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>NOME DO PROPRIETÁRIO</FormLabel>
                <Input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>NÚMERO DO APARTAMENTO</FormLabel>
                <Input
                  type="text"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>BLOCO DO APARTAMENTO</FormLabel>
                <Input
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>MODELO DO VEÍCULO</FormLabel>
                <Input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>COR DO VEÍCULO</FormLabel>
                <Input
                  type="text"
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>NÚMERO DA VAGA DE ESTACIONAMENTO</FormLabel>
                <Input
                  type="text"
                  value={parkingSpotNumber}
                  onChange={(e) => setParkingSpotNumber(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RegisterParkingSpacesModal;
