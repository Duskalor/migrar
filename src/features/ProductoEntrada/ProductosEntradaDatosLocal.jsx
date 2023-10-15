import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ProductosEntrada from './ProductosEntrada';

export default function ProductosEntradaDatosLocal() {
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  // console.log(productoEntrada);
  return (
    <div>
      {productoEntrada && (
        <TableContainer component={Paper} style={{ maxHeight: 700 }}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow sx={{ '& th': { textAlign: 'center' } }}>
                <TableCell>Codigo</TableCell>
                <TableCell>Producto</TableCell>
                {/* <TableCell>Precio de Compra</TableCell> */}
                <TableCell>Cantidad</TableCell>
                {/* <TableCell>SubTotal</TableCell> */}
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productoEntrada.map((producto, id) => (
                <ProductosEntrada key={id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
