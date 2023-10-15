import { Box, Button, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { useResponsive } from '../../utils/responsive';
import { deleteUsuarios } from './userThunks';

export default function Usuarios({ usuarios, permisos, almacenes }) {
  const maxwidth = useResponsive();
  const { FullName, Email, Usuario, IdPermisos, id, IdAlmacenes } = usuarios;

  const { Descripcion: permiso } = permisos.find(
    (permiso) => permiso.id === IdPermisos
  );
  const { ubicacion } = almacenes.find((almacen) => almacen.id === IdAlmacenes);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteUsuarios(id));
    }
  };

  return (
    <TableRow
      sx={{
        '&>td': { padding: maxwidth ? '7px' : '16px' },
        '&>td>div': { textAlign: 'center' },
      }}
    >
      <TableCell>{FullName}</TableCell>
      <TableCell>{Email}</TableCell>
      <TableCell>
        <Box>{Usuario}</Box>
      </TableCell>
      <TableCell>
        <Box>{permiso}</Box>
      </TableCell>

      <TableCell>
        <Box>{ubicacion}</Box>
      </TableCell>
      <TableCell>
        <Box display='flex' justifyContent='center'>
          <ModalEdit id={id} />
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
