import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
export default function ItemsForPrint({ producto }) {
  const { productos } = useSelector((state) => state.Productos);
  const DatoProducto = productos.find((pro) => pro.id === +producto.IdProducto);
  return (
    producto && (
      <TableRow
        sx={{
          '& td': {
            textAlign: 'center',
            color: 'black',
            fontWeight: '600',
          },
        }}
      >
        <TableCell>{DatoProducto.Codigo}</TableCell>
        <TableCell>{DatoProducto.Descripcion}</TableCell>
        <TableCell>{DatoProducto.Categoria}</TableCell>
        <TableCell>{producto.Cantidad}</TableCell>
      </TableRow>
    )
  );
}
