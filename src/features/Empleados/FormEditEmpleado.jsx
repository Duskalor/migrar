import { Button, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmpleados } from './empleadosSlice';
import { BoxError } from '../../components/BoxError';

export default function FormEditEmpleado({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { empleados } = useSelector((state) => state.Empleados);
  const { FullName, Cargo } = empleados.find((empleado) => empleado.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { FullName, Cargo },
  });

  const onSubmit = (dato) => {
    dispatch(updateEmpleados({ ...dato, id }));
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
        {errors.FullName?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </div>
      <div>
        <label>Dni</label>
        <Input
          name='Cargo'
          type='text'
          {...register('Cargo', { required: true })}
        />
        {errors.Cargo?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </div>
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
