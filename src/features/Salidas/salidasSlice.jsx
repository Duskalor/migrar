import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import {
  borrarProductos,
  getProductos,
  updateProductos,
} from '../Productos/productosSlice';
import {
  BorrarEstadoEdit,
  createProductoSalida,
  getDetalleSalida,
} from '../ProductoSalidas/productosSalidaSlice';

export const getSalidas = createAsyncThunk('get/getSalidas', async () => {
  const { data } = await apiSistema.get('salida');
  return data;
});

export const createSalida = createAsyncThunk(
  'create/postSalidas',
  async ({ datos, productoSalida, IdAlmacenes }, { dispatch, getState }) => {
    const {
      Productos: { productos },
    } = getState();
    const { data } = await apiSistema.post('salida/create', {
      ...datos,
      IdAlmacenes,
    });

    const IdSalida = data.Salida.id;
    // console.log('aqui');
    // console.log(data);
    productoSalida.forEach((pe) => {
      // console.log({ pe });
      dispatch(createProductoSalida({ IdSalida, pe }));
      const ParaAgregar = productos.find((pro) => pro.id === +pe.IdProducto);
      const pro = { ...ParaAgregar };
      pro.Stock = pro.Stock - parseInt(pe.Cantidad);
      dispatch(updateProductos(pro));
    });

    dispatch(getDetalleSalida());
    dispatch(getDetalleSalida());
    dispatch(borrarProductos());
    dispatch(getProductos());
    dispatch(BorrarEstadoEdit());

    return data;
  }
);

export const deleteSalidas = createAsyncThunk(
  'delete/postSalidas',
  async (id) => {
    const { data } = await apiSistema.delete(`salida/delete/${id}`);
    return data;
  }
);

export const salidasSlice = createSlice({
  name: 'Salidas',
  initialState: {
    salidas: [],
    id: null,
    error: null,
    loading: false,
  },

  extraReducers: (build) => {
    //get
    build
      .addCase(getSalidas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalidas.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.salidas = payload.ListaSalidas;
      })
      .addCase(getSalidas.rejected, (state) => {
        state.loading = false;
      })

      // create

      .addCase(createSalida.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSalida.fulfilled, (state, { payload }) => {
        // console.log({ payload });
        state.loading = false;
        state.salidas = payload.ListaSalidas;
      })
      .addCase(createSalida.rejected, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
      })

      // delete
      .addCase(deleteSalidas.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSalidas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaSalidas.reverse();
        state.salidas = volteado;
      })
      .addCase(deleteSalidas.rejected, (state) => {
        state.loading = false;
      });
  },
});
