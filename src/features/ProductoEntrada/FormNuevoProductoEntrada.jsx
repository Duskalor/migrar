import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuardarEstado } from './productoEntradaSlice';
import ProductosEntradaDatosLocal from './ProductosEntradaDatosLocal';
import { BoxError } from '../../components/BoxError';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { useProducts } from '../../utils/useProducts';

export default function FormNuevoProductoEntrada({
  errorsItems,
  setErrorsItems,
}) {
  // const { productos } = useSelector((state) => state.Productos);
  const productos = useProducts();
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const { IdAlmacenes, IdPermisos } = useUserLogin();
  const dispatch = useDispatch();
  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    Cantidad: '',
  });

  // console.log(productos);
  const [errorProductos, setErrorProductos] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState(false);
  const Guardar = (e) => {
    setProductosAgregados({
      ...productosAgregados,
      [e.target.name]: e.target.value,
    });
  };
  const onSave = () => {
    // verificando si son del almacén asignado

    // validando campos
    if (productosAgregados.IdProducto === '')
      return setErrorProductos('Seleccione un Producto');

    if (productosAgregados.Cantidad === '')
      return setErrorProductos('Ingrese Cantidad De productos');

    // Verficando existencia
    const Verificar = productoEntrada.some(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );
    if (Verificar) return setErrorProductos('Producto Existente');

    // Guardando datos
    dispatch(GuardarEstado(productosAgregados));

    // Limpiando campos
    setProductosAgregados({ IdProducto: '', Cantidad: '' });
  };

  const Alldata = useMemo(() => {
    return todosLosProductos
      ? productos
      : productos.filter((pro) => pro.IdAlmacenes === IdAlmacenes);
  }, [productos, todosLosProductos]);

  const handleChange = () => {
    const newState = !todosLosProductos;
    IdPermisos === roles.admin && setTodosLosProductos(newState);
    !newState && setProductosAgregados((prev) => ({ ...prev, IdProducto: '' }));
  };

  return (
    <>
      <Box>
        <NativeSelect
          onChange={(e) => {
            errorProductos !== null && setErrorProductos(null);
            errorsItems !== null && setErrorsItems(null);
            Guardar(e);
          }}
          value={productosAgregados.IdProducto}
          name='IdProducto'
        >
          <option aria-label='None' value='' />
          {Alldata.filter((pro) => pro.active === 1).map((producto, i) => {
            const color = producto.IdAlmacenes !== IdAlmacenes && 'red';
            const WithoutStock = producto.Stock === 0;

            return (
              <option
                style={{
                  backgroundColor: WithoutStock ? 'rgba(0,0,0,0.6)' : color,
                }}
                key={crypto.randomUUID()}
                value={producto.id}
              >
                {i + 1} :{producto.Codigo} : {producto.Descripcion} | Cantidad :
                &nbsp;
                {producto.Cantidad}
              </option>
            );
          })}
        </NativeSelect>
        {IdPermisos === roles.admin && (
          <Box py={1}>
            <Box display='flex'>
              <Box display='flex' gap={2} onClick={handleChange}>
                <input
                  type='checkbox'
                  checked={todosLosProductos}
                  onChange={handleChange}
                />
                <Typography variant='h4'>Todos los productos</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Cantidad
        </InputLabel>
        <Input
          type='number'
          name='Cantidad'
          value={productosAgregados.Cantidad}
          onChange={(e) => {
            errorProductos !== null && setErrorProductos(null);
            Guardar(e);
          }}
        />
        {errorProductos && <BoxError>{errorProductos}</BoxError>}
      </Box>
      <Button onClick={(e) => onSave(e)}>Agregar</Button>
      <hr />
      <ProductosEntradaDatosLocal />
    </>
  );
}
