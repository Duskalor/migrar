import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetalleEntradas } from './productoEntradaSlice';
import ProductoEntradaVista from './ProductoEntradaVista';
// import { getpermisos } from './permisosSlice';

export default function ListaProductosEntrada({ codigo }) {
  const dispatch = useDispatch();

  const { productoEntradaBD } = useSelector((state) => state.ProductoEntrada);
  const { entradas } = useSelector((state) => state.Entradas);

  const codigoDocumento = entradas.find(
    (entrada) => entrada.NumeroDocumento === codigo
  );
  const listaProductosEntrada = productoEntradaBD.filter(
    (proEntrada) => proEntrada.IdEntrada === codigoDocumento.id
  );
  useEffect(() => {
    dispatch(getDetalleEntradas());
  }, [dispatch]);
  return (
    <Box>
      {/* <h1>PERMISOS</h1> */}
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow
              sx={{
                '& th': { textAlign: 'center' },
              }}
            >
              <TableCell>Codigo</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProductosEntrada.map((producto, id) => (
              <ProductoEntradaVista key={id} producto={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
