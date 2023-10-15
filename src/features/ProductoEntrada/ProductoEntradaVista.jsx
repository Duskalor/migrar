import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProductoEntradaVista({ producto }) {
  const { IdProducto, Cantidad } = producto;

  const { productos } = useSelector((state) => state.Productos);
  const ListaProductos = productos.find((pro) => pro.id === +IdProducto);

  return (
    producto && (
      <TableRow sx={{ '&>td': { textAlign: 'center' } }}>
        <TableCell>{ListaProductos.Codigo}</TableCell>
        <TableCell>{ListaProductos.Descripcion}</TableCell>
        <TableCell>{Cantidad}</TableCell>
      </TableRow>
    )
  );
}
