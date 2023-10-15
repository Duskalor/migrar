import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatos } from './features/Datos/datosSlice';
import { getpermisos } from './features/Permisos/permisosSlice';
import Layout from './Layout';
import { getAlmacenes } from './features/Almacenes/almacenesSlice';
import { Box } from '@mui/material';
import { getProductos } from './features/Productos/productosSlice';
import { getEntradas } from './features/Entrada/entradaSlice';
import { getDetalleEntradas } from './features/ProductoEntrada/productoEntradaSlice';
import { getDetalleSalida } from './features/ProductoSalidas/productosSalidaSlice';
import { getSalidas } from './features/Salidas/salidasSlice';
import { getEmpleados } from './features/Empleados/empleadosSlice';
import { getCategorias } from './features/Categorias/categoriaSlice';
import { getUsuarios } from './features/Usuarios/userThunks';

export default function Peticiones() {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.Datos);
  useEffect(() => {
    dispatch(getAlmacenes());
    dispatch(getUsuarios());
    dispatch(getProductos());
    dispatch(getEntradas());
    dispatch(getEmpleados());
    dispatch(getSalidas());
    dispatch(getDetalleEntradas());
    dispatch(getDetalleSalida());
    dispatch(getpermisos());
    dispatch(getDatos());
    dispatch(getCategorias());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box>{success && <Layout />}</Box>;
}
