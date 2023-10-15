import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deletepermisos } from './permisosSlice';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearIcon from '@mui/icons-material/Clear';
export default function Permiso({ permisos }) {
  const {
    Descripcion,
    Salidas,
    Usuarios,
    Entradas,
    Productos,
    Almacenes,
    Proveedores,
    Permisos,
    Configuracion,
    id,
  } = permisos;
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deletepermisos(id));
    }
  };

  return (
    <TableRow
      sx={{
        '&>td>div': {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        },
      }}
    >
      <TableCell>{Descripcion}</TableCell>
      <TableCell>
        <Box>{Salidas === 1 ? <CheckRoundedIcon /> : <ClearIcon />} </Box>
      </TableCell>
      <TableCell>
        <Box>{Usuarios === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Entradas === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Productos === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Almacenes === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Proveedores === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Permisos === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <Box>{Configuracion === 1 ? <CheckRoundedIcon /> : <ClearIcon />}</Box>
      </TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
