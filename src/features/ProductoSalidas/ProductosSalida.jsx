import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { borrarItem } from './productosSalidaSlice';
import { BoxContainer } from '../../components/BoxContainer';

export default function ProductosSalida({ producto }) {
  const { IdProducto, Cantidad } = producto;

  const { productos } = useSelector((state) => state.Productos);
  //console.log(producto, productos);
  const ListaProductos = productos.find((pro) => pro.id === +IdProducto);
  //console.log(ListaProductos);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Salida ?')) {
      dispatch(borrarItem(id));
    }
  };

  return (
    <TableRow>
      <TableCell>
        <BoxContainer> {ListaProductos.Codigo}</BoxContainer>
      </TableCell>
      <TableCell>
        <BoxContainer> {ListaProductos.Descripcion}</BoxContainer>
      </TableCell>
      {/* <TableCell>{PrecioCompra}</TableCell> */}
      <TableCell>
        <BoxContainer>{Cantidad}</BoxContainer>
      </TableCell>
      {/* <TableCell>{SubTotal}</TableCell> */}
      <TableCell>
        <BoxContainer>
          <Button onClick={() => deleteItem(IdProducto)}>Eliminar</Button>
        </BoxContainer>
      </TableCell>
    </TableRow>
  );
}
