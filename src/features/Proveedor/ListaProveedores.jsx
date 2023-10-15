import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titulos } from '../style';
import Proveedor from './Proveedor';
import { getProveedor } from './ProveedorSlice';

export default function ListaProveedores() {
  const { proveedores } = useSelector((state) => state.Proveedor);
  // console.log(proveedores);
  const dispatch = useDispatch();
  useEffect(() => {
    if (proveedores.length === 0) dispatch(getProveedor());
  }, [dispatch]);

  return (
    <div>
      <Typography sx={titulos} variant='h4' component='h2'>
        PROVEEDORES
      </Typography>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Full Nombre</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((proveedor, id) => (
              <Proveedor key={id} proveedores={proveedor} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
