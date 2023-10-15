import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { borrarItemEdit } from './productoEntradaSlice';

export default function ProductoEntradaDatosEdit({ producto }) {
  const { IdProducto, Cantidad } = producto;
  const { productos } = useSelector((state) => state.Productos);

  const ListaProductos = productos.find((pro) => pro.id === +IdProducto);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este Producto ?')) {
      dispatch(borrarItemEdit(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{ListaProductos.Codigo}</TableCell>
      <TableCell>{ListaProductos.Descripcion}</TableCell>
      <TableCell>{Cantidad}</TableCell>
      <TableCell>
        <Button onClick={() => deleteItem(IdProducto)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
