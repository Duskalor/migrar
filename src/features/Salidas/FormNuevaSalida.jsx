import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormNuevoProductoSalida from '../ProductoSalidas/FormNuevoProductoSalida';
import { createSalida } from './salidasSlice';
import { BoxError } from '../../components/BoxError';
import { useState } from 'react';
import EmptyTextarea from '../../components/TextArea';
import { useUserLogin } from '../../utils/useUserLogin';

export default function FormNuevaSalida({ handleClose }) {
  const { productoSalida, productoSalidaBD } = useSelector(
    (state) => state.ProductoSalida
  );
  const { empleados } = useSelector((state) => state.Empleados);

  const [errorsItems, setErrorsItems] = useState(null);
  const TextArea = EmptyTextarea();
  const [errorText, setErrorText] = useState(null);
  const { id, IdAlmacenes, Usuario } = useUserLogin();

  // USE STATE

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const newCodigo = `SALID-${productoSalidaBD.length + 20}`;
  const onSubmit = (datos) => {
    if (productoSalida.length === 0)
      return setErrorsItems('Agregue algún producto');

    let total = 0;
    productoSalida.forEach(function (a) {
      total += parseInt(a.Cantidad);
    });

    datos = { ...datos, CantidadProductos: total, IdUsuario: id };
    // console.log(datos);
    dispatch(
      createSalida({
        datos: { ...datos, NumeroDocumento: newCodigo },
        productoSalida,
        IdAlmacenes,
      })
    );
    handleClose();
  };

  const handleControlText = (e) => {
    setErrorText(null);
    e.target.value.length > 255 && setErrorText('Máximo 255 caracteres');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' textAlign='center'>
        Nueva Salida
      </Typography>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Codigo Documento
        </InputLabel>

        <Input
          disabled={true}
          value={newCodigo}
          type='text'
          // {...register('NumeroDocumento', { required: true })}
          name='NumeroDocumento'
        />
        {/* {errors.NumeroDocumento?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )} */}
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel>
        <Input
          // {...register('IdUsuario', {
          //   required: true,
          // })}
          value={Usuario}
          disabled={true}
        />
        {/* <NativeSelect {...register('IdUsuario', { required: true })}>
          <option aria-label='None' value='' />
          {usuarios.map(({ id, FullName }) => (
            <option key={id} value={id}>
              {FullName}
            </option>
          ))}
        </NativeSelect>
        {errors.IdUsuario?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )} */}
      </Box>
      <Box>
        <NativeSelect
          {...register('IdEmpleados', {
            required: true,
          })}
        >
          <option aria-label='None' value='' />
          {empleados.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.FullName}
            </option>
          ))}
        </NativeSelect>
        {errors.IdEmpleados?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>
      <Box>
        <TextArea
          sx={{ my: '2rem' }}
          aria-label='empty textarea'
          placeholder='Razón del salida'
          type='input'
          maxRows={3}
          {...register('razonSalida', {
            required: 'true',
            onChange: handleControlText,
          })}
        />
        {errors.razonSalida?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errorText && <BoxError>{errorText}</BoxError>}
      </Box>
      <hr />
      <FormNuevoProductoSalida
        errorsItems={errorsItems}
        setErrorsItems={setErrorsItems}
      />
      <hr />
      <Button type='submit'>Crear</Button>
    </form>
  );
}
