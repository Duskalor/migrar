import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LayoutProductoEntradaEdit from '../ProductoEntrada/LayoutProductoEntradaEdit';
import {
  DeleteProductoEntrada,
  EditProductoEntrada,
  updateProductoEntrada,
} from '../ProductoEntrada/productoEntradaSlice';
import { updateProductos } from '../Productos/productosSlice';
import { updateEntradas } from './entradaSlice';
import EmptyTextarea from '../../components/TextArea';
import { BoxError } from '../../components/BoxError';
import { useState } from 'react';

export default function FormEditEntrada({ handleClose, id }) {
  const dispatch = useDispatch();

  const { entradas } = useSelector((state) => state.Entradas);

  const {
    NumeroDocumento,
    CantidadProductos,
    razonEntrada,
    IdUsuario,
    // MontoTotal,
    id: identrada,
    active,
  } = entradas.find((entra) => entra.id === id);

  // const { usuarios } = useSelector((state) => state.Usuarios);
  // const { proveedores } = useSelector((state) => state.Proveedor);
  const { productoEntradaBD } = useSelector((state) => state.ProductoEntrada);
  const { productoEntradaEdit } = useSelector((state) => state.ProductoEntrada);
  const { productos } = useSelector((state) => state.Productos);
  const ProDucEntra = productoEntradaBD.filter((pro) => pro.IdEntrada === id);
  const TextArea = EmptyTextarea();
  const [errorsItems, setErrorsItems] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NumeroDocumento: NumeroDocumento,
      IdUsuario: IdUsuario,
      razonEntrada: razonEntrada,
      CantidadProductos: CantidadProductos,
      // MontoTotal: MontoTotal,
    },
  });
  const onSubmit = (datos) => {
    // verifica si hay productos para agregar
    if (productoEntradaEdit.length !== 0) {
      // verifica existencia si los productos ya existen
      productoEntradaEdit.forEach((pe) => {
        const Existencia = ProDucEntra.find(
          (pro) => pro.IdProducto === pe.IdProducto
        );
        // si el producto existe antes de editar se tiene q editar el productoEntrada
        if (Existencia) {
          dispatch(updateProductoEntrada({ Existencia, pe }));
          // si la cantidad previa es menor resta el Stock del productos
          if (Existencia.Cantidad < pe.Cantidad) {
            const productoAeditar = productos.find(
              (pro) => pro.id === +pe.IdProducto
            );
            const pro = { ...productoAeditar };
            pro.Stock = pro.Stock + (pe.Cantidad - Existencia.Cantidad);

            dispatch(updateProductos(pro));
          }
          // si la cantidad previa es mayor suma el Stock del productos

          if (Existencia.Cantidad > pe.Cantidad) {
            const productoAeditar = productos.find(
              (pro) => pro.id === +pe.IdProducto
            );
            const pro = { ...productoAeditar };
            pro.Stock = pro.Stock - (Existencia.Cantidad - pe.Cantidad);

            dispatch(updateProductos(pro));
          }
          // si el no producto existe se tiene q agregar el productoEntrada
        } else {
          dispatch(EditProductoEntrada({ pe }));
          const productoAeditar = productos.find(
            (pro) => pro.id === +pe.IdProducto
          );
          const pro = { ...productoAeditar };
          pro.Stock = pro.Stock + parseInt(pe.Cantidad);
          // console.log(pro);
          dispatch(updateProductos(pro));
        }
      });
      // verifica existencia comparando el nuevo conjunto de productos con el anterior
      // los q no existe se procede a eliminar y actualizar el stock
      ProDucEntra.forEach((pe) => {
        const Existencia = productoEntradaEdit.find(
          (pro) => pro.IdProducto === +pe.IdProducto
        );

        if (!Existencia) {
          const productoAeditar = productos.find(
            (pro) => pro.id === +pe.IdProducto
          );
          const pro = { ...productoAeditar };
          pro.Stock = pro.Stock - pe.Cantidad;
          dispatch(updateProductos(pro));
          dispatch(DeleteProductoEntrada(pe.id));
        }
      });

      // después de terminar con los productos ahora toca calular la cantidad y precio  total
      // de los productos para agregarlos
      // datos.id = id;
      let total = 0;
      productoEntradaEdit.forEach((a) => (total += parseInt(a.Cantidad)));

      datos = {
        ...datos,
        id,
        CantidadProductos: total,
        active,
      };
      // console.log(datos);
      dispatch(updateEntradas(datos));

      handleClose();
    }
  };

  const handleMax = (e) => {
    e.target.value.length > 255 && setErrorsItems('Maximo 255 caracteres');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Typography variant='h1' textAlign='center'>
          Codigo : <b>{NumeroDocumento}</b>
        </Typography>
      </div>
      <>
        {/* <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel>
        <NativeSelect
          {...register('IdUsuario', {
            required: true,
          })}
        >
          {usuarios.map((usuario) => {
            return (
              <option key={usuario.id} value={usuario.id}>
                {usuario.FullName}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdUsuario?.type === 'required' && <p>El Campo es requirido </p>}
      </div> */}

        {/* <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Proveedor
        </InputLabel>
        <NativeSelect
          {...register('IdProveedor', {
            required: true,
          })}
        > */}
        {/* {proveedores.map((Proveedor) => {
            return (
              <option key={Proveedor.id} value={Proveedor.id}>
                {Proveedor.FullName}
              </option>
            );
          })} */}
        {/* </NativeSelect>
        {errors.IdProveedor?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div> */}
        {/* <hr /> */}
      </>
      <Box>
        <TextArea
          sx={{ my: '2rem' }}
          aria-label='empty textarea'
          placeholder='Razón del ingreso'
          type='input'
          maxRows={3}
          {...register('razonEntrada', {
            required: 'true',
            onChange: handleMax,
          })}
        />
        {errors.razonEntrada?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errorsItems && <BoxError>{errorsItems}</BoxError>}
      </Box>

      <hr />
      <LayoutProductoEntradaEdit
        id={identrada}
        errorsItems={errorsItems}
        setErrorsItems={setErrorsItems}
      />
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
