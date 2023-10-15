import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteProveedor } from './ProveedorSlice';

export default function Proveedor({ proveedores }) {
  const { FullName, Ruc, id } = proveedores;
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteProveedor(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{FullName}</TableCell>
      <TableCell>{Ruc}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
