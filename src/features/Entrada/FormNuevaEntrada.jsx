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
import FormNuevoProductoEntrada from '../ProductoEntrada/FormNuevoProductoEntrada';
import { createEntradas } from './entradaSlice';
import EmptyTextarea from '../../components/TextArea';
import { BoxError } from '../../components/BoxError';
import { useState } from 'react';
import { useUserLogin } from '../../utils/useUserLogin';
import { BoxContainer } from '../../components/BoxContainer';
export default function FormNuevaEntrada({ handleClose }) {
  const { IdAlmacenes, id, Usuario } = useUserLogin();

  // const { usuarios } = useSelector((state) => state.Usuarios);
  const TextArea = EmptyTextarea();
  // const { entradas } = useSelector((state) => state.Entradas);
  const { productoEntrada, productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada
  );
  const newCodigo = `ENTRA-${productoEntradaBD.length + 20}`;
  // const [errorCodigo, setErrorCodigo] = useState(null);
  // USE STATE
  const [errorsItems, setErrorsItems] = useState(null);
  const { empleados } = useSelector((state) => state.Empleados);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (datos) => {
    // verificando existencia de productos generar la entrada
    if (productoEntrada.length === 0)
      setErrorsItems('no hay productos agregados');
    else {
      let total = 0;
      productoEntrada.forEach((a) => (total += parseInt(a.Cantidad)));

      datos = { ...datos, CantidadProductos: total, IdUsuario: id };
      dispatch(
        createEntradas({
          datos: { ...datos, NumeroDocumento: newCodigo },
          productoEntrada,
          IdAlmacenes,
        })
      );
      handleClose();
    }
  };

  // const VerificarCorrectoCodigo = (e) => {
  //   errorCodigo !== null && setErrorCodigo(null);
  //   const exist = entradas.some(
  //     (entra) =>
  //       entra.NumeroDocumento.toLowerCase() === e.target.value.toLowerCase()
  //   );
  //   exist && setErrorCodigo('Codigo Existente');
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign='center' variant='h1' sx={{ padding: ' 15px 0' }}>
        Nueva Entrada
      </Typography>

      <BoxContainer sx={{ flexDirection: 'column', gap: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'center',
            maxWidth: '60%',
            margin: 'auto',
            width: '100%',
            position: 'relative',
          }}
        >
          <InputLabel variant='standard' htmlFor='uncontrolled-native'>
            Codigo Documento
          </InputLabel>
          <Input
            disabled={true}
            value={newCodigo}
            inputProps={{ style: { textAlign: 'center' } }}
            disableUnderline={true}
            sx={{
              border: 'solid 2px gray',
              borderRadius: '10px',
              padding: '0 10px',
            }}
            type='text'
            // {...register('NumeroDocumento', {
            //   required: true,
            //   onChange: VerificarCorrectoCodigo,
            // })}
            name='NumeroDocumento'
          />
          {/* {errors.NumeroDocumento?.type === 'required' && (
            <BoxError sx={{ position: 'absolute', top: '23px' }}>
              El Campo es requirido
            </BoxError>
          )}
          {errorCodigo && (
            <BoxError sx={{ position: 'absolute', top: '23px' }}>
              {errorCodigo}{' '}
            </BoxError>
          )} */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            alignItems: 'center',
            maxWidth: '60%',
            margin: 'auto',
            width: '100%',
          }}
        >
          <InputLabel variant='standard' htmlFor='uncontrolled-native'>
            Usuario
          </InputLabel>

          <Input
            disableUnderline={true}
            inputProps={{ style: { textAlign: 'center' } }}
            contextMenu=''
            value={Usuario}
            disabled={true}
            sx={{
              padding: '0 10px',
              border: 'solid 2px gray',
              borderRadius: '10px',
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          />
          {errors.IdUsuario?.type === 'required' && (
            <BoxError>El Campo es requirido</BoxError>
          )}
        </Box>
        <Box
          style={{
            maxWidth: '60%',
            margin: 'auto',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            position: 'relative',
            gap: '5px',
          }}
        >
          <InputLabel
            variant='standard'
            sx={{ width: '45%' }}
            htmlFor='uncontrolled-native'
          >
            Vendedor
          </InputLabel>
          <NativeSelect
            sx={{ flexGrow: 1, textAlign: 'center' }}
            {...register('IdEmpleados', {
              required: true,
            })}
          >
            <option aria-label='None' value='' />
            {empleados.map((usuario) => (
              <option
                key={usuario.id}
                style={{ textAlign: 'center' }}
                value={usuario.id}
              >
                {usuario.FullName}
              </option>
            ))}
          </NativeSelect>
          {errors.IdEmpleados?.type === 'required' && (
            <BoxError sx={{ position: 'absolute', top: '23px' }}>
              El Campo es requirido
            </BoxError>
          )}
        </Box>
        <Box
          sx={{
            justifyContent: 'center',
            display: 'flex',

            position: 'relative',
          }}
        >
          <TextArea
            sx={{ mt: '1rem', mb: '2rem' }}
            aria-label='empty textarea'
            placeholder='Razón del ingreso'
            type='input'
            maxRows={3}
            {...register('razonEntrada', {
              required: 'true',
              max: 255,
            })}
          />
          {errors.razonEntrada?.type === 'required' && (
            <BoxError sx={{ position: 'absolute', bottom: 0 }}>
              El Campo es requirido
            </BoxError>
          )}
          {errors.razonEntrada?.type === 'max' && (
            <BoxError sx={{ position: 'absolute', bottom: 0 }}>
              Maximo 255 Caracteres
            </BoxError>
          )}
        </Box>
      </BoxContainer>

      <hr />
      <FormNuevoProductoEntrada
        errorsItems={errorsItems}
        setErrorsItems={setErrorsItems}
      />
      <hr />
      {errorsItems && <BoxError>{errorsItems}</BoxError>}
      <Button type='submit'>Crear</Button>
    </form>
  );
}
