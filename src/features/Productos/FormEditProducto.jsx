import { Box, Button, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from './productosSlice';

export default function FormEditProducto({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { productos } = useSelector((state) => state.Productos);

  const { Codigo, Categoria, Descripcion, active } = productos.find(
    (producto) => producto.id === id
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Categoria: Categoria,
      Descripcion: Descripcion,
      active: active,
      // Stock: Stock,
    },
  });
  const onSubmit = (dato) => {
    const { Categoria, Descripcion, active } = dato;
    dispatch(
      updateProductos({
        id,
        Categoria,
        Descripcion,
        active,
        // Stock,
      })
    );
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <label>Codigo</label>
        <Input type='text' value={Codigo} />
      </Box>
      <Box>
        <label>Descripcion</label>
        <Input
          type='text'
          {...register('Descripcion', {
            required: true,
          })}
        />
        {errors.Descripcion?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </Box>

      <Box>
        <label>Categoria</label>
        <Input
          type='text'
          {...register('Categoria', {
            required: true,
          })}
        />
        {errors.Categoria?.type === 'required' && <p>El Campo es requirido </p>}
      </Box>
      <Box>
        <label>Active</label>
        <Input type='checkbox' {...register('active')} />
        {errors.active?.type === 'required' && <p>El Campo es requirido </p>}
      </Box>
      {/* <Box>
        <label>Stock</label>
        <Input
          type='number'
          {...register('Stock', {
            required: true,
          })}
        />
        {errors.Stock?.type === 'required' && <p>El Campo es requirido </p>}
      </Box> */}

      <Button type='submit'>Guardar</Button>
    </form>
  );
}
