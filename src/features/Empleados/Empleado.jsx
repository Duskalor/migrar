import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteEmpleados } from './empleadosSlice';
import { BoxStatus } from '../../components/BoxStatus';

export default function Empleado({ empleados }) {
  const { FullName, Cargo, active, id } = empleados;
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este empleado ?')) {
      dispatch(deleteEmpleados(id));
    }
  };

  return (
    <TableRow sx={{ '& td': { textAlign: 'center' } }}>
      <TableCell>{FullName}</TableCell>
      <TableCell>{Cargo}</TableCell>
      <TableCell>
        <BoxStatus active={active}>
          {active ? <Box>Active</Box> : <Box>No active</Box>}
        </BoxStatus>
      </TableCell>
      <TableCell>
        <Box>
          <ModalEdit id={id} />
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
