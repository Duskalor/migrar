import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titulos } from '../style';
import Usuarios from './Usuarios';
import { ChildModal } from './LayoutUsuarios';
import { useResponsive } from '../../utils/responsive';
import { getUsuarios } from './userThunks';

export default function ListaUsuarios() {
  const maxwidth = useResponsive();
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { permisos } = useSelector((state) => state.Permisos);
  const { almacenes } = useSelector((state) => state.Almacenes);

  //console.log(permisos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);
  return (
    <div>
      <Typography
        sx={{ ...titulos, fontSize: maxwidth ? '30px' : '35px' }}
        variant='h4'
        component='h2'
      >
        USUARIOS
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          m: '1rem',
        }}
      >
        <ChildModal />
      </Box>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow
              sx={{
                '&>th>div': { textAlign: 'center' },
              }}
            >
              <TableCell> Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>
                <Box>Usuario</Box>
              </TableCell>
              <TableCell>
                <Box>Permisos</Box>
              </TableCell>
              <TableCell>
                <Box>Almacen</Box>
              </TableCell>
              <TableCell>
                <Box>Acciones</Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, id) => (
              <Usuarios
                key={id}
                usuarios={usuario}
                permisos={permisos}
                almacenes={almacenes}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
