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
import Almacen from './Almacen';
import { getAlmacenes } from './almacenesSlice';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { ChildModal } from './LayoutAlmacenes';

export default function ListaAlmacenes() {
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { IdPermisos } = useUserLogin();

  const dispatch = useDispatch();
  useEffect(() => {
    if (almacenes.length === 0) dispatch(getAlmacenes());
  }, [dispatch]);

  return (
    <div>
      {/* <h1>Almacenes</h1> */}
      <Typography sx={titulos} variant='h4' component='h2'>
        Almacenes
      </Typography>
      <ChildModal />
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow
              sx={{
                '&>th': { textAlign: 'center' },
              }}
            >
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              {roles.admin === IdPermisos && <TableCell>Status </TableCell>}
              <TableCell>Ubicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {almacenes.map((almacen) => (
              <Almacen key={almacen.id} almacen={almacen} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
