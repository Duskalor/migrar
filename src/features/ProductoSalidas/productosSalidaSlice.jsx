import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDetalleSalida = createAsyncThunk(
  'get/getDetalleSalida',
  async () => {
    const { data } = await apiSistema.get('detalleSalida');
    return data;
  }
);
export const createProductoSalida = createAsyncThunk(
  'create/postProductoSalida',
  async ({ IdSalida, pe: newData }) => {
    const { data } = await apiSistema.post('detalleSalida/create', {
      ...newData,
      IdSalida,
    });
    return data;
  }
);

export const CrearProductoSalida = createAsyncThunk(
  'update/postProductoSalida',
  async ({ pe: { id, ...rest } }) => {
    const { data } = await apiSistema.put(`detalleSalida/update/${id}`, rest);
    return data;
  }
);

export const DeleteProductoEntrada = createAsyncThunk(
  'delete/postProductosEntrada',
  async (id) => {
    const { data } = await apiSistema.delete(`detalleSalida/delete/${id}`);
    return data;
  }
);

export const productosSalidaSlice = createSlice({
  name: 'ProductoSalida',
  initialState: {
    productoSalidaBD: [],
    productoSalida: [],
    productoSalidaEdit: [],
    change: false,
    loading: false,
  },
  reducers: {
    GuardarEstado: (state, { payload }) => {
      state.productoSalida = [...state.productoSalida, payload];
    },
    borrarEstado: (state) => {
      //console.log(payload);
      state.productoSalida = [];
    },
    borrarItem: (state, { payload }) => {
      //console.log(payload);
      state.productoSalida = state.productoSalida.filter(
        (item) => item.IdProducto !== payload
      );
      //console.log(state.productoSalida);
    },

    borrarItemEdit: (state, { payload }) => {
      state.productoSalidaEdit = state.productoSalidaEdit.filter(
        (item) => item.IdProducto !== payload
      );
    },
    GuardarDatos: (state, { payload }) => {
      state.productoSalidaEdit = payload;
    },

    GuardarEstadoEdit: (state, { payload }) => {
      if (!payload.IdProducto === '') {
        state.productoSalidaEdit = [...state.productoSalidaEdit, payload];
      }
    },
    BorrarEstadoEdit: (state) => {
      state.productoSalidaBD = [];
    },
  },
  extraReducers: (build) => {
    // get
    build
      .addCase(getDetalleSalida.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalleSalida.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productoSalidaBD = payload.ListaDetalleSalida;
      })
      .addCase(getDetalleSalida.rejected, (state) => {
        state.loading = false;
      })

      // create

      .addCase(createProductoSalida.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductoSalida.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productoSalidaBD = payload.ListaDetalleSalida;
      })
      .addCase(createProductoSalida.rejected, (state) => {
        state.loading = false;
      })

      //delete
      .addCase(DeleteProductoEntrada.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteProductoEntrada.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productoSalidaBD = payload.ListaDetalleSalida;
      })
      .addCase(DeleteProductoEntrada.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {
  GuardarEstado,
  borrarEstado,
  borrarItem,
  borrarItemEdit,
  GuardarEstadoEdit,
  BorrarEstadoEdit,
  GuardarDatos,
} = productosSalidaSlice.actions;
