import { Button, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProveedor } from './ProveedorSlice';

export default function FormEditProveedor({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { proveedores } = useSelector((state) => state.Proveedor);
  const { FullName, Ruc } = proveedores.find(
    (proveedor) => proveedor.id === id
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      FullName: FullName,
      Ruc: Ruc,
    },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    const { FullName, Ruc } = dato;
    dispatch(updateProveedor({ id, FullName, Ruc }));
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <Input
          type='text'
          name='FullName'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>Ruc</label>
        <Input
          name='Ruc'
          type='number'
          {...register('Ruc', { required: true, maxLength: 8, minLength: 8 })}
        />
        {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
        {errors.Ruc?.type === 'maxLength' && <p>El debe tener 8 digitos </p>}
        {errors.Ruc?.type === 'minLength' && <p>El debe tener 8 digitos </p>}
      </div>
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
