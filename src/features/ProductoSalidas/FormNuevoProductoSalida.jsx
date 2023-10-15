import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductosEntradaDatosLocal from './ProductosSalidaDatosLocal';
import { GuardarEstado } from './productosSalidaSlice';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { BoxError } from '../../components/BoxError';
import { useProducts } from '../../utils/useProducts';

export default function FormNuevoProductoSalida({
  errorsItems,
  setErrorsItems,
}) {
  // const { productos } = useSelector((state) => state.Productos);
  const productos = useProducts();
  const { productoSalida } = useSelector((state) => state.ProductoSalida);
  const { IdAlmacenes, IdPermisos } = useUserLogin();

  const [errorProductos, setErrorProductos] = useState(null);
  const [todosLosProductos, setTodosLosProductos] = useState(false);
  const dispatch = useDispatch();
  // console.log(productos);
  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    // PrecioVenta: '',
    Cantidad: '',
    // SubTotal: '',
  });
  //console.log(productos);
  const Guardar = (e) => {
    //console.log(e);
    setProductosAgregados({
      ...productosAgregados,
      [e.target.name]: e.target.value,
    });
  };
  const onSave = () => {
    // console.log(productosAgregados);
    // verificando si son del almacén asignado
    const Verificar = productoSalida.some(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );

    // Verficando existencia
    if (Verificar) return setErrorProductos('Producto Existente');

    // validando campos
    if (productosAgregados.IdProducto === '')
      return setErrorProductos('Seleccione un Producto');

    const producto = productos.find(
      (pro) =>
        pro.id === +productosAgregados.IdProducto &&
        pro.IdAlmacenes === IdAlmacenes
    );
    if (producto.IdAlmacenes !== IdAlmacenes)
      return setErrorProductos('No existe en el almacén asignado');

    if (
      productosAgregados.Cantidad === '' ||
      +productosAgregados.Cantidad === 0
    )
      return setErrorProductos('Ingrese la cantidad de productos');

    if (producto.Stock < productosAgregados.Cantidad)
      return setErrorProductos('Sobrepasa la cantidad disponible');

    // Guardando datos
    dispatch(GuardarEstado(productosAgregados));
    // Limpiando campos
    setProductosAgregados({ IdProducto: '', Cantidad: '' });
    setErrorProductos(null);
  };

  const Alldata = useMemo(() => {
    return todosLosProductos
      ? productos
      : productos.filter((pro) => pro.IdAlmacenes === IdAlmacenes);
  }, [IdAlmacenes, productos, todosLosProductos]);

  const handleChange = () => {
    IdPermisos === roles.admin && setTodosLosProductos(!todosLosProductos);
    setProductosAgregados({ ...productosAgregados, IdProducto: '' });
    errorProductos !== null && setErrorProductos(null);
  };

  return (
    <>
      <Box>
        <NativeSelect
          placeholder='Seleccionar Producto'
          value={productosAgregados.IdProducto}
          sx={{
            padding: '0 20px',
            width: '100%',
            color: 'white',
          }}
          onChange={(e) => {
            errorProductos !== null && setErrorProductos(null);
            errorsItems !== null && setErrorsItems(null);
            Guardar(e);
          }}
          name='IdProducto'
        >
          <option aria-label='None' value=''></option>
          {Alldata.filter((pro) => pro.active === 1).map((producto, i) => {
            const color = producto.IdAlmacenes !== IdAlmacenes ? 'red' : '';
            const WithoutStock = producto.Stock === 0;
            return (
              <option
                disabled={WithoutStock}
                style={{
                  backgroundColor: WithoutStock ? 'rgba(0,0,0,1)' : color,
                  color: 'white',
                }}
                key={crypto.randomUUID()}
                value={producto.id}
              >
                {i + 1} : {producto.Codigo} : {producto.Descripcion} | Cantidad
                : &nbsp;{producto.Cantidad}
              </option>
            );
          })}
        </NativeSelect>
      </Box>

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
