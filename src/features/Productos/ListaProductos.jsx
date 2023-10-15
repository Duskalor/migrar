import Productos from './Productos';
import {
  Box,
  CircularProgress,
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
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from './productosSlice';
import SearchIcon from '@mui/icons-material/Search';
import { titulos } from '../style';
import { ChildModal } from './LayoutProducto';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { useProducts } from '../../utils/useProducts';
import { useHandlePAge } from '../../utils/useHandlePage';
import { BoxError } from '../../components/BoxError';
import { useResponsive } from '../../utils/responsive';
export default function ListaProductos() {
  const maxwidth = useResponsive();
  const { loading } = useSelector((state) => state.Productos);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { categorias } = useSelector((state) => state.categoria);

  const { IdPermisos, IdAlmacenes } = useUserLogin();
  const productos = useProducts();
  // console.log(productos);
  const [Busqueda, setBusqueda] = useState('');
  const [CategoriaFilter, setCategoriaFilter] = useState('Todos');
  const [BusquedaDescription, setBusquedaDescription] = useState('Codigo');
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
    dispatch(getProductos());
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleCat = (e) => {
    setCategoriaFilter(e.target.value);
  };

  const productosFiltradosAlmacen = useMemo(() => {
    setPage(0);
    return filterAlmacen !== 'All' && Busqueda !== null
      ? productos.filter((pro) => {
          return pro.IdAlmacenes === +filterAlmacen;
        })
      : [...productos].sort((a, b) => a.id - b.id);
  }, [productos, filterAlmacen, Busqueda]);

  const categoriaFilter = useMemo(() => {
    return CategoriaFilter !== 'Todos'
      ? productosFiltradosAlmacen.filter(
          (cat) => +cat.Categoria === CategoriaFilter
        )
      : productosFiltradosAlmacen;
  }, [CategoriaFilter, productosFiltradosAlmacen]);

  const productosFiltrados = useMemo(() => {
    setPage(0);
    return Busqueda !== '' && Busqueda !== null
      ? categoriaFilter.filter((pro) =>
          pro[BusquedaDescription].toLowerCase().includes(
            Busqueda.toLowerCase()
          )
        )
      : categoriaFilter;
  }, [categoriaFilter, Busqueda, BusquedaDescription]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - productosFiltrados.length)
      : 0;

  return (
    <Box>
      <Box sx={{ justifyContent: 'space-evenly ' }}>
        <Typography
          sx={{
            ...titulos,
            padding: '0px',
            fontSize: maxwidth ? '30px' : '35px',
          }}
          variant='h4'
          component='h2'
        >
          PRODUCTOS
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            '&>button': { m: '1rem' },
          }}
        >
          <Box justifyContent='center' alignItems='center' display='flex'>
            <Box
              sx={{
                display: 'flex',
                gap: '2rem',
              }}
            >
              {/* ubicacion  */}
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
              {/* filter */}
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={BusquedaDescription}
                label='filter'
                onChange={handleOnchangeFilterName}
                // sx={{ height: maxwidth ? '2px' : '16px' }}
              >
                <MenuItem value='Codigo'>Codigo</MenuItem>
                <MenuItem value='Descripcion'>Descripcion</MenuItem>
                {/* <MenuItem value='Categoria'>Categoria</MenuItem> */}
              </Select>

              {/* Categoria  */}
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={CategoriaFilter}
                label='filterCat'
                onChange={handleCat}
              >
                <MenuItem value='Todos'>Todos</MenuItem>
                {categorias.map((cat) => {
                  return (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.categoria}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Box>
          <ChildModal />
        </Box>
        <TextField
          sx={{
            display: 'flex',
            my: '1rem',
            // color: 'white',
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
      </Box>

      {productos.length !== 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            display: 'block',
            maxHeight: '510px',
          }}
        >
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': {
                    textAlign: 'center',
                    color: 'white',
                    fontSize: maxwidth ? '12px' : '16px',
                    padding: maxwidth ? '7px' : '16px',
                  },
                }}
              >
                <TableCell sx={{ width: '70px' }}>Código</TableCell>
                <TableCell sx={{ width: '420px' }}>Descripción</TableCell>
                <TableCell sx={{ width: '140px' }}>Categoría</TableCell>
                <TableCell>Ubicación</TableCell>
                {roles.admin === IdPermisos && (
                  <TableCell sx={{ width: '70px' }}>Status </TableCell>
                )}
                <TableCell>Stock </TableCell>
                <TableCell>Acciones </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productosFiltrados.length > 0 ? (
                (rowsPerPage > 0
                  ? [...productosFiltrados]
                      .sort((a, b) => b.Stock - a.Stock)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : productosFiltrados
                ).map((producto, i) => (
                  <Productos key={i} productos={producto} />
                ))
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ textAlign: 'center', fontSize: '2rem' }}
                    colSpan={7}
                  >
                    El codigo no existe
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && productosFiltrados.length > 0 && (
                <TableRow
                  style={{
                    //66
                    height: (maxwidth ? 48 : 66) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {productosFiltrados.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      6,
                      10,
                      // 25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={7}
                    count={productosFiltrados.length}
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
          {loading ? (
            <CircularProgress sx={{ fontSize: 70 }} />
          ) : (
            <BoxError>No hay productos ingresados</BoxError>
          )}
        </Typography>
      )}
    </Box>
  );
}
