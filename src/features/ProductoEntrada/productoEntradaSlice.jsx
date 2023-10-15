import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDetalleEntradas = createAsyncThunk(
  'get/getDetalleEntradas',
  async () => {
    const { data } = await apiSistema.get('detalleEntrada');
    return data;
  }
);
export const createProductoEntrada = createAsyncThunk(
  'create/postProductoEntrada',
  async (nuevo) => {
    const { IdEntrada } = nuevo;
    const newProductoEntrada = nuevo.pe;

    const { data } = await apiSistema.post('detalleEntrada/create', {
      ...newProductoEntrada,
      IdEntrada,
    });
    return data;
  }
);

export const updateProductoEntrada = createAsyncThunk(
  'update/postProductoEntrada',
  async ({ Existencia, pe: updateProductoEntrada }) => {
    console.log({ Existencia, updateProductoEntrada });
    const id = Existencia.id;
    const { data } = await apiSistema.put(`detalleEntrada/update/${id}`, {
      ...updateProductoEntrada,
      id,
    });
    return data;
  }
);

export const EditProductoEntrada = createAsyncThunk(
  'create/postProductoEntrada',
  async ({ pe }) => {
    const { data } = await apiSistema.post('detalleEntrada/create', pe);
    return data;
  }
);

export const DeleteProductoEntrada = createAsyncThunk(
  'delete/postProductosEntrada',
  async (id) => {
    const { data } = await apiSistema.delete(`detalleEntrada/delete/${id}`);
    return data;
  }
);

export const productoEntradaSlice = createSlice({
  name: 'ProductoEntrada',
  initialState: {
    productoEntradaBD: [],
    productoEntrada: [],
    productoEntradaEdit: [],
    // change: false,
    loading: false,
  },
  reducers: {
    GuardarEstado: (state, { payload }) => {
      state.productoEntrada = [...state.productoEntrada, payload];
    },
    borrarEstado: (state) => {
      //console.log(payload);
      state.productoEntrada = [];
    },
    borrarItem: (state, { payload }) => {
      //console.log(payload);
      state.productoEntrada = state.productoEntrada.filter(
        (item) => item.IdProducto !== payload
      );
      //console.log(state.productoEntrada);
    },

    borrarItemEdit: (state, { payload }) => {
      // console.log(payload);
      state.productoEntradaEdit = state.productoEntradaEdit.filter(
        (item) => item.IdProducto !== payload
      );
    },
    GuardarDatos: (state, { payload }) => {
      // console.log(payload);
      state.productoEntradaEdit = payload;
    },

    GuardarEstadoEdit: (state, { payload }) => {
      state.productoEntradaEdit = [...state.productoEntradaEdit, payload];
    },
    BorrarEstadoEdit: (state, { payload }) => {
      state.productoEntradaEdit = [];
      // state.productoEntradaBD = [];
    },
  },
  extraReducers: (build) => {
    ///  GET
    build
      .addCase(getDetalleEntradas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetalleEntradas.fulfilled, (state, { payload }) => {
        state.loading = false;
        //console.log(payload);
        state.productoEntradaBD = payload.ListaDetalleEntrada;
      })
      .addCase(getDetalleEntradas.rejected, (state) => {
        state.loading = false;
      })
      //  CREATE
      .addCase(createProductoEntrada.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductoEntrada.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productoEntradaBD = payload.ListaDetalleEntrada;
      })
      .addCase(createProductoEntrada.rejected, (state) => {
        state.loading = false;
      })
      // DELETE
      .addCase(DeleteProductoEntrada.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteProductoEntrada.fulfilled, (state, { payload }) => {
        state.loading = false;
        //console.log(payload);
        state.productoEntradaBD = payload.ListaDetalleEntrada;
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
} = productoEntradaSlice.actions;
