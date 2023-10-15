import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { BoxStatus } from '../../components/BoxStatus';
import { deleteAlmacenes } from './almacenesSlice';
import { BoxContainer } from '../../components/BoxContainer';

export default function Almacen({ almacen }) {
  const { id, name, ubicacion, Direccion, active } = almacen;
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteAlmacenes(id));
    }
  };

  return (
    <TableRow
      sx={{
        '&>td': { textAlign: 'center' },
      }}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{ubicacion}</TableCell>
      <TableCell>
        <BoxStatus active={active}>
          {active ? <Box>Active</Box> : <Box>No active</Box>}
        </BoxStatus>
      </TableCell>
      <TableCell>{Direccion}</TableCell>
      <TableCell>
        <BoxContainer>
          <ModalEdit id={id} />
          <Box>
            <Button onClick={() => deleteItem(id)}>Eliminar</Button>
          </Box>
        </BoxContainer>
      </TableCell>
    </TableRow>
  );
}
