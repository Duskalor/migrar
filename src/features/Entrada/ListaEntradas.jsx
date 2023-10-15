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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetalleEntradas } from '../ProductoEntrada/productoEntradaSlice';
import { getProductos } from '../Productos/productosSlice';
import { titulos } from '../style';
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { ChildModal } from './LayoutEntrada';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { useHandlePAge } from '../../utils/useHandlePage';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useResponsive } from '../../utils/responsive';

export default function ListaEntradas() {
  const maxwidth = useResponsive();
  const { IdPermisos, IdAlmacenes } = useUserLogin();
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { entradas } = useSelector(
    (state) => state.Entradas,
    (prevData, nextData) => prevData.entradas === nextData.entradas
  );
  const { productos } = useSelector(
    (state) => state.Productos,
    (prevData, nextData) => prevData.productos === nextData.productos
  );

  const [Busqueda, setBusqueda] = useState('');
  const [BusquedaDescription, setBusquedaDescription] =
    useState('NumeroDocumento');
  const [filterAlmacen, setFilterAlmacen] = useState(IdAlmacenes);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleOnchangeUbicacion,
    handleOnchangeFilterName,
  } = useHandlePAge(
    setPage,
    setRowsPerPage,
    setFilterAlmacen,
    setBusquedaDescription
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEntradas());
    if (productos.length === 0) dispatch(getProductos());
    dispatch(getDetalleEntradas());
  }, [dispatch]);

  // const handleOnchangeUbicacion = (e) => setFilterAlmacen(e.target.value);
  const handleChange = (e) => setBusqueda(e.target.value);

  const entradasFiltradosAlmacen = useMemo(() => {
    return filterAlmacen !== 'All' && Busqueda !== null
      ? entradas.filter((entra) => {
          return entra.IdAlmacenes === +filterAlmacen;
        })
      : [...entradas].sort((a, b) => a.id - b.id);
  }, [entradas, filterAlmacen]);

  // console.log(productos);
  const entradasFiltradas = useMemo(() => {
    return (Busqueda !== '') & (Busqueda !== null)
      ? entradasFiltradosAlmacen.filter((entra) => {
          return entra[BusquedaDescription].toLowerCase().includes(
            Busqueda.toLowerCase()
          );
        })
      : entradasFiltradosAlmacen;
  }, [Busqueda, entradasFiltradosAlmacen]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - entradasFiltradas.length)
      : 0;

  // console.log(rowsPerPage, emptyRows);

  return (
    <Box>
      <Box
        sx={{
          justifyContent: 'space-evenly ',
        }}
      >
        <Typography
          sx={{ ...titulos, fontSize: maxwidth ? '30px' : '35px' }}
          variant='h4'
          component='h2'
        >
          ENTRADAS
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            py: '0.5rem',
            '&>button': { m: '.5rem' },
          }}
        >
          <Box sx={{ display: 'flex', gap: '1rem' }}>
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
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={BusquedaDescription}
              label='filter'
              onChange={handleOnchangeFilterName}
            >
              <MenuItem value='NumeroDocumento'>Codigo</MenuItem>
              <MenuItem value='razonEntrada'>Razón</MenuItem>
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
              <InputAdornment
                position='start'
                sx={{
                  my: '1.2rem',
                }}
              >
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant='standard'
        />
      </Box>

      {entradas.length !== 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table stickyHeader arial-label='simple tables'>
            <TableHead>
              <TableRow sx={{ '& th': { textAlign: 'center' } }}>
                <TableCell>Codigo Documento</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Empleado</TableCell>
                {IdPermisos === roles.admin && <TableCell>Status</TableCell>}
                <TableCell>Razón Entrada</TableCell>
                <TableCell>Cantidad de Productos</TableCell>
                <TableCell>Almancén</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entradasFiltradas.length > 0 ? (
                [...entradasFiltradas]
                  .reverse()
                  .map((entrada, id) => <Entradas key={id} entrada={entrada} />)
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ textAlign: 'center', fontSize: '2rem' }}
                    colSpan={7}
                  >
                    No existe codigo o razón de Entrada
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && entradasFiltradas.length > 0 && (
                <TableRow style={{ height: 66 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {entradasFiltradas.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      6,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={8}
                    count={entradasFiltradas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'filas por paginas',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '15px',
          }}
          variant='h4'
          component='h2'
        >
          No hay entradas existentes
        </Typography>
      )}
    </Box>
  );
}
