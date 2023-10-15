import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import ItemsForPrint from './ItemsForPrint';
import { getDetalleSalida } from '../ProductoSalidas/productosSalidaSlice';
import { titulos } from '../style';

export default function ForPrint({ ToPrint }) {
  //console.log(ToPrint);
  const { id, fecha, usuario, CantidadProductos } = ToPrint;
  const Datos = useSelector((state) => state.Datos);
  const dispatch = useDispatch();
  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const Productos = productoSalidaBD.filter((pro) => pro.IdSalida === id);
  // console.log(Productos);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `F-${fecha ? fecha.substr(0, 10) : new Date()}-NB00${id}`,
    bodyClass: 'print',
    // onAfterPrint: () => alert('print success'),
  });
  useEffect(() => {
    dispatch(getDetalleSalida());
  }, [dispatch]);

  return (
    <>
      <Box ref={componentRef} sx={{}}>
        <Typography sx={titulos} variant='h4' component='h2' color='black'>
          {Datos.RazonSocial}
        </Typography>
        <Box
          mx={2}
          borderTop={1}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            <h3>Usuario : {usuario}</h3>
          </Box>
          <Box sx={{ pl: 3 }}>
            <h3>
              Salida creada :&nbsp;
              {fecha
                ? fecha.substr(0, 10)
                : new Date().getFullYear() +
                  '-' +
                  new Date().getMonth() +
                  '-' +
                  new Date().getDay()}
            </h3>
          </Box>
        </Box>
        <Box>
          <Typography
            variant='h2'
            textAlign='center'
            fontWeight={600}
            py={1}
            mt={2}
            borderBottom={1}
            borderTop={1}
          >
            PRODUCTOS
          </Typography>
        </Box>
        <TableContainer component={Paper} style={{ backgroundColor: 'white' }}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: '600',
                    fontSize: 15,
                  },
                }}
              >
                <TableCell>CODIGO</TableCell>
                <TableCell>DESCRIPCIÓN</TableCell>
                <TableCell>CATEGORIA</TableCell>
                <TableCell>CANT.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Productos.map((producto, id) => (
                <ItemsForPrint key={id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          py={2}
          fontWeight={600}
          display='flex'
          justifyContent='flex-end'
          px={2}
          borderBottom={1}
        >
          Cantidad Total : {CantidadProductos}
        </Box>
      </Box>

      <Box display='flex' justifyContent='center' mt={1}>
        <Button variant='contained' onClick={handlePrint}>
          Imprimir
        </Button>
      </Box>
    </>
  );
}
