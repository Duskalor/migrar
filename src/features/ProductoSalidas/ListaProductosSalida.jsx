import {
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
import ProductoSalidaVista from './ProductoSalidaVista';
import { getDetalleSalida } from './productosSalidaSlice';

export default function ListaProductosSalida({ codigo = null, montoTotal }) {
  // console.log(codigo);
  const dispatch = useDispatch();

  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const { salidas } = useSelector((state) => state.Salidas);

  const codigoDocumento = salidas.find(
    (salida) => salida.NumeroDocumento === codigo
  );

  const listaProductosSalida = productoSalidaBD.filter(
    (proSalida) => proSalida.IdSalida === codigoDocumento.id
  );

  useEffect(() => {
    dispatch(getDetalleSalida());
  }, [dispatch]);

  return (
    <div>
      {/* <h1>PERMISOS</h1> */}
      <TableContainer component={Paper} style={{ maxHeight: 700 }}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow sx={{ '& th': { textAlign: 'center' } }}>
              <TableCell>Codigo</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProductosSalida.map((producto, id) => (
              <ProductoSalidaVista key={id} producto={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
