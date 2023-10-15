import {
  Box,
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
import Empleado from './Empleado';
import { getEmpleados } from './empleadosSlice';
import { ChildModal } from './LayoutEmpleados';

export default function ListaEmpleados() {
  const { empleados } = useSelector((state) => state.Empleados);
  const dispatch = useDispatch();
  useEffect(() => {
    if (empleados.length === 0) dispatch(getEmpleados());
  }, [dispatch]);

  return (
    <div>
      <Typography sx={titulos} variant='h4' component='h2'>
        EMPLEADOS
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', py: 1 }}>
        <ChildModal />
      </Box>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow sx={{ '& th': { textAlign: 'center' } }}>
              <TableCell>Full Nombre</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>active</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado, id) => (
              <Empleado key={id} empleados={empleado} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
