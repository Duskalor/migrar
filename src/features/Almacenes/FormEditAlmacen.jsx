import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAlmacenes } from './almacenesSlice';

export default function FormEditAlmacen({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { name, Direccion, active, ubicacion } = almacenes.find(
    (almacen) => almacen.id === id
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: name,
      Direccion: Direccion,
      active: active,
      ubicacion: ubicacion,
    },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    dispatch(updateAlmacenes({ ...dato, id }));
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('name', {
            required: true,
          })}
          label='name'
          variant='outlined'
        />
        {errors.name?.type === 'required' && <p>El Campo es requirido </p>}
      </Box>
      <Box>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Direccion', {
            required: true,
          })}
          label='Direccion'
          variant='outlined'
        />
        {errors.Direccion?.type === 'required' && <p>El Campo es requirido </p>}
      </Box>
      <Box>
        <label htmlFor=''>active</label>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='checkbox'
          {...register('active')}
          label='active'
          variant='outlined'
        />
      </Box>
      <Box>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('ubicacion', {
            required: true,
          })}
          label='ubicacion'
          variant='outlined'
        />
        {errors.ubicacion?.type === 'required' && <p>El Campo es requirido </p>}
      </Box>
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
