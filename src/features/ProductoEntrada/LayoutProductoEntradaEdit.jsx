import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoEntradaEdit from './ProductoEntradaEdit';
import { GuardarDatos, GuardarEstadoEdit } from './productoEntradaSlice';
import { BoxError } from '../../components/BoxError';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { useProducts } from '../../utils/useProducts';

export default function LayoutProductoEntradaEdit({
  id,
  setErrorsItems,
  errorsItems,
}) {
  // const { productos } = useSelector((state) => state.Productos);
  const productos = useProducts();
  const { IdAlmacenes, IdPermisos } = useUserLogin();

  const { productoEntradaEdit, productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada
  );
  const [errorProductos, setErrorProductos] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState(false);
  const [errorProduct, setErrorProduct] = useState(null);

  const datos = productoEntradaBD.filter((pro) => pro.IdEntrada === id);
  // console.log(errorProduct);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GuardarDatos(datos));
  }, [dispatch]);

  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    Cantidad: '',
  });
  const Guardar = (e) => {
    setProductosAgregados({
      ...productosAgregados,
      [e.target.name]: e.target.value,
    });
  };
  const onSave = () => {
    const newProducto = structuredClone(productosAgregados);

    const Verificar = productoEntradaEdit.find(
      (pro) => pro.IdProducto === newProducto.IdProducto
    );

    newProducto.IdEntrada = id;
    // console.log(productoEntradaEdit, newProducto);
    if (productosAgregados.IdProducto === '')
      return setErrorProduct('Seleccione un Producto');

    if (productosAgregados.Cantidad === '')
      return setErrorProduct('Ingrese Cantidad De productos');

    if (Verificar) {
      return setErrorProduct('Producto Existente');
    }
    dispatch(GuardarEstadoEdit(newProducto));
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
                key={producto.id}
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
            setErrorProduct !== null && setErrorProduct(null);
            Guardar(e);
          }}
        />
      </Box>
      {errorProduct && <BoxError>{errorProduct}</BoxError>}
      <Button onClick={(e) => onSave(e)}>Agregar</Button>
      <hr />
      <ProductoEntradaEdit />
    </>
  );
}
