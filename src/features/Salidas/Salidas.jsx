import { Box, Button, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from '../Productos/productosSlice';
import { LayoutProductosSalida } from '../ProductoSalidas/LayoutProductosSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { centrar } from '../style';
// import ModalPrint from './ModalPrint';
import { deleteSalidas } from './salidasSlice';
import { BoxStatus } from '../../components/BoxStatus';
import { useProducts } from '../../utils/useProducts';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import ModalPrint from './ModalPrint';
import { useResponsive } from '../../utils/responsive';
export default function Salidas({ salida }) {
  const maxwidth = useResponsive();
  const { IdPermisos } = useUserLogin();
  const {
    NumeroDocumento,
    CantidadProductos,
    IdAlmacenes,
    IdUsuario,
    id,
    razonSalida,
    active,
    IdEmpleados,
    updated_at: fecha,
  } = salida;

  const { usuarios } = useSelector((state) => state.Usuarios);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { empleados } = useSelector((state) => state.Empleados);

  const Almacen = almacenes.find((alma) => alma.id === IdAlmacenes);
  const UsuarioSalida = usuarios.find((user) => user.id === IdUsuario);
  const empleado = empleados.find((emple) => emple.id === IdEmpleados);

  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const productos = useProducts();
  const ParaEliminar = productoSalidaBD.filter((pro) => pro.IdSalida === id);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Entrada ?')) {
      ParaEliminar.forEach((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id === +pe.IdProducto
        );
        const pro = structuredClone(productoAeditar);
        pro.Stock = pro.Stock + pe.Cantidad;
        dispatch(updateProductos(pro));
      });

      dispatch(deleteSalidas(id));
      dispatch(borrarEstado());
    }
  };
  // console.log(UsuarioSalida);
  const ToPrint = {
    id,
    usuario: UsuarioSalida.FullName,
    fecha,
    CantidadProductos,
  };

  return (
    <TableRow
      sx={{
        ...centrar,
        '&>td': { padding: maxwidth ? '7px' : '16px', textAlign: 'center' },
      }}
    >
      <TableCell>
        <LayoutProductosSalida NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell>{UsuarioSalida?.FullName}</TableCell>
      <TableCell>
        {empleado?.FullName}
        <Box>{empleado?.Cargo}</Box>
      </TableCell>
      <TableCell>{razonSalida}</TableCell>
      {IdPermisos === roles.admin && (
        <TableCell>
          <BoxStatus active={active}>
            {active ? <Box>Active</Box> : <Box>No active</Box>}
          </BoxStatus>
        </TableCell>
      )}
      <TableCell>{CantidadProductos}</TableCell>
      <TableCell>{Almacen.ubicacion}</TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <ModalPrint ToPrint={ToPrint} />
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
