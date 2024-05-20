import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import RegisterParkingSpacesModal from "../components/RegisterParkingSpacesModal";

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
});

const ListParkingSpaces = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const cancelRef = useRef();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = () => {
    const newArray = data.filter((item) => item.vehiclePlate !== itemToDelete);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));

    setIsAlertOpen(false);
  };

  const openAlertDialog = (vehiclePlate) => {
    setItemToDelete(vehiclePlate);
    setIsAlertOpen(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        h="100vh"
        align="center"
        justify="center"
        fontSize="20px"
        fontFamily="poppins"
        bg="gray.50"
        p={4}
      >
        <Box maxW={1500} w="100%" h="100vh" py={10} px={4}>
          <Button
            colorScheme="blue"
            onClick={() => [setDataEdit({}), onOpen()]}
          >
            NOVO CADASTRO
          </Button>

          <Box overflowY="auto" height="100%" mt={4}>
            <Table mt="6" variant="striped" colorScheme="gray">
              <Thead bg="gray.200">
                <Tr>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Placa do veículo
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Nome do proprietário
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Número do apartamento
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Bloco do apartamento
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Modelo do veículo
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Cor do veículo
                  </Th>
                  <Th maxW={isMobile ? 5 : 100} fontSize="16px">
                    Número da vaga de estacionamento
                  </Th>
                  <Th p={0}></Th>
                  <Th p={0}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.vehiclePlate}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.ownerName}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.apartmentNumber}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.block}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.vehicleModel}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.vehicleColor}
                    </Td>
                    <Td maxW={isMobile ? 5 : 100} fontSize="14px">
                      {item.parkingSpotNumber}
                    </Td>
                    <Td p={0}>
                      <EditIcon
                        fontSize={20}
                        onClick={() => [
                          setDataEdit({ ...item, index }),
                          onOpen(),
                        ]}
                        mx={2}
                        _hover={{ color: "blue.500" }}
                      />
                    </Td>
                    <Td p={0}>
                      <DeleteIcon
                        fontSize={20}
                        onClick={() => openAlertDialog(item.vehiclePlate)}
                        mx={2}
                        _hover={{ color: "red.500" }}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        {isOpen && (
          <RegisterParkingSpacesModal
            isOpen={isOpen}
            onClose={onClose}
            data={data}
            setData={setData}
            dataEdit={dataEdit}
            setDataEdit={setDataEdit}
          />
        )}

        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirmar Exclusão
              </AlertDialogHeader>

              <AlertDialogBody>
                Você tem certeza que quer excluir este registro? Esta ação não
                pode ser desfeita.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsAlertOpen(false)}>
                  Cancelar
                </Button>
                <Button colorScheme="red" onClick={handleRemove} ml={3}>
                  Excluir
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Flex>
    </ChakraProvider>
  );
};

export default ListParkingSpaces;
