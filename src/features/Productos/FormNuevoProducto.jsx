import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createProducto } from './productosSlice';
import { BoxError } from '../../components/BoxError';
import { useState } from 'react';
import { createCategorias } from '../Categorias/categoriaSlice';

export default function FormNuevoProducto({ handleClose }) {
  const dispatch = useDispatch();
  const { categorias } = useSelector((state) => state.categoria);
  const [text, setText] = useState('');
  const [CategoriaFilter, setCategoriaFilter] = useState('');
  const [open, setOpen] = useState(false);
  const handleCat = (e) => {
    setCategoriaFilter(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createProducto({ ...dato, Categoria: CategoriaFilter }));
    handleClose();
    reset();
  };

  const handlecreate = () => {
    console.log(text);
    if (text !== '') {
      dispatch(createCategorias({ Categoria: text }));
      setOpen(false);
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' py={2}>
        Nuevo Producto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
        }}
      >
        {open && (
          <Box
            sx={{
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bgcolor: 'rgba(0,0,0,1)',
              bottom: 0,
              top: 0,
              right: 0,
              left: 0,
              borderRadius: '10px',
            }}
          >
            <Box
              sx={{
                display: ' flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField
                sx={{ margin: '10px 0 0 0' }}
                type='text'
                label='Categoria'
                variant='outlined'
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  variant='contained'
                  sx={{ fontWeight: 600 }}
                  onClick={handlecreate}
                >
                  Crear
                </Button>
                <Button variant='outlined' onClick={() => setOpen(false)}>
                  Cerrar
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        <Box>
          <TextField
            sx={{ margin: '10px 0 0 0' }}
            type='text'
            {...register('Codigo', { required: true })}
            label='Codigo'
            variant='outlined'
          />

          {errors.Codigo?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </Box>
        <Box>
          <TextField
            sx={{ margin: '10px 0 0 0' }}
            type='text'
            {...register('Descripcion', { required: true })}
            label='Descripción'
            variant='outlined'
          />
          {errors.Descripcion?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={CategoriaFilter}
            label='filterCat'
            onChange={handleCat}
          >
            <MenuItem value=''></MenuItem>
            {categorias.map((cat) => {
              return (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoria}
                </MenuItem>
              );
            })}
          </Select>
          <Button onClick={() => setOpen(true)} variant='contained'>
            New
          </Button>
        </Box>
      </Box>

      <Button sx={{ mt: '1rem' }} type='submit' variant='contained'>
        Crear
      </Button>
    </form>
  );
}
