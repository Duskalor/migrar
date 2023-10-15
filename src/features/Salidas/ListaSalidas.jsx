import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetalleSalida } from '../ProductoSalidas/productosSalidaSlice';
import Salidas from './Salidas';
import { getSalidas } from './salidasSlice';
import { getProductos } from '../Productos/productosSlice';
import { titulos } from '../style';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ChildModal } from './LayoutSalida';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { useResponsive } from '../../utils/responsive';

export default function ListaSalidas() {
  const maxwidth = useResponsive();
  const { IdAlmacenes, IdPermisos } = useUserLogin();
  const { salidas } = useSelector((state) => state.Salidas);
  const [filterAlmacen, setFilterAlmacen] = useState(IdAlmacenes);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const [Busqueda, setBusqueda] = useState('');
  const [BusquedaDescription, setBusquedaDescription] =
    useState('NumeroDocumento');
  const handleOnchangeFilterName = (e) => {
    setBusquedaDescription(e.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalidas());
    dispatch(getProductos());
    dispatch(getDetalleSalida());
  }, [dispatch]);

  const handleChange = (e) => setBusqueda(e.target.value);
  const handleOnchangeUbicacion = (e) => setFilterAlmacen(e.target.value);

  // const SalidasAlmacenAsignado = useMemo(
  //   () => salidas.filter((pro) => pro.IdAlmacenes === IdAlmacenes),
  //   [salidas]
  // );
  const salidasFiltradosAlmacen = useMemo(() => {
    return filterAlmacen !== 'All' && Busqueda !== null
      ? salidas.filter((entra) => {
          return entra.IdAlmacenes === +filterAlmacen;
        })
      : [...salidas].sort((a, b) => a.id - b.id);
  }, [filterAlmacen, Busqueda, salidas]);

  const salidasFiltradas = useMemo(
    () =>
      Busqueda !== '' && Busqueda !== null
        ? salidasFiltradosAlmacen.filter((prod) =>
            prod[BusquedaDescription].toLowerCase().includes(
              Busqueda.toLowerCase()
            )
          )
        : salidasFiltradosAlmacen,
    [Busqueda, BusquedaDescription, salidasFiltradosAlmacen]
  );

  return (
    <Box>
      <Typography
        sx={{ ...titulos, fontSize: maxwidth ? '30px' : '35px' }}
        variant='h4'
        component='h2'
      >
        SALIDAS
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          '&>button': { m: '.5rem' },
          py: '0.5rem',
        }}
      >
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          {IdPermisos === roles.admin && (
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filterAlmacen}
              label='ubicacion'
              onChange={handleOnchangeUbicacion}
            >
              {almacenes.map((almacen) => {
                return (
                  <MenuItem key={almacen.id} value={almacen.id}>
                    {almacen.ubicacion}
                  </MenuItem>
                );
              })}
              <MenuItem value='All'>Todos</MenuItem>
            </Select>
          )}
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={BusquedaDescription}
            label='filter'
            onChange={handleOnchangeFilterName}
          >
            <MenuItem value='NumeroDocumento'>Codigo</MenuItem>
            <MenuItem value='razonSalida'>Razón</MenuItem>
          </Select>
        </Box>

        <ChildModal />
      </Box>

      <TextField
        sx={{
          display: 'flex',
        }}
        id='input-with-icon-textfield'
        value={Busqueda}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant='standard'
      />

      {salidasFiltradosAlmacen.length !== 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table stickyHeader arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': { textAlign: 'center' },
                }}
              >
                <TableCell>Codigo Documento</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Empleado</TableCell>
                <TableCell>Razón Salida</TableCell>
                {IdPermisos === roles.admin && <TableCell>Active</TableCell>}
                <TableCell>Cantidad de Productos</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salidasFiltradas.length > 0 ? (
                [...salidasFiltradas]
                  .reverse()
                  .map((salida, id) => <Salidas key={id} salida={salida} />)
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ textAlign: 'center', fontSize: '2rem' }}
                    colSpan={7}
                  >
                    No existe codigo o razón de Salida
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '15px',
            fontSize: 25,
          }}
          variant='h4'
          component='h2'
        >
          No hay salidas existentes
        </Typography>
      )}
    </Box>
  );
}
