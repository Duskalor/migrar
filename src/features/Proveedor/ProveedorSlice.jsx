import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProveedor = createAsyncThunk(
  'get/getProveedor',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('proveedor', config);
    return data;
  }
);
export const createProveedor = createAsyncThunk(
  'create/postProveedor',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('proveedor/create', nuevo, config);
    return data;
  }
);
export const deleteProveedor = createAsyncThunk(
  'delete/postProveedor',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`proveedor/delete/${id}`, config);
    return data;
  }
);
export const updateProveedor = createAsyncThunk(
  'update/postProveedor',
  async ({ id, FullName, Ruc }, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `proveedor/update/${id}`,
      {
        FullName,
        Ruc,
      },
      config
    );
    return data;
  }
);

export const ProveedorSlice = createSlice({
  name: 'Proveedor',
  initialState: {
    proveedores: [],
    error: null,
    loading: false,
  },
  extraReducers: (build) => {
    // get
    build
      .addCase(
        ///GET
        getProveedor.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(getProveedor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.proveedores = payload.ListaDeproveedores;
      })
      .addCase(getProveedor.rejected, (state) => {
        state.loading = false;
      })
      // create
      .addCase(
        ///GET
        createProveedor.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(createProveedor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.proveedores = payload.ListaDeproveedores;
      })
      .addCase(createProveedor.rejected, (state) => {
        state.loading = false;
      })

      // delele

      .addCase(deleteProveedor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProveedor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.proveedores = payload.ListaDeproveedores;
      })
      .addCase(deleteProveedor.rejected, (state) => {
        state.loading = false;
      })

      // update
      .addCase(updateProveedor.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProveedor.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.proveedores = payload.ListaDeproveedores;
      })
      .addCase(updateProveedor.rejected, (state) => {
        state.loading = false;
      });
  },
  // extraReducers: {
  //   ///GET
  //   [getProveedor.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [getProveedor.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.proveedores = payload.ListaDeproveedores;
  //   },
  //   [getProveedor.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //CREATE
  //   [createProveedor.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [createProveedor.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.proveedores = payload.ListaDeproveedores;
  //   },
  //   [createProveedor.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //DELETE
  //   [deleteProveedor.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [deleteProveedor.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.proveedores = payload.ListaDeproveedores;
  //   },
  //   [deleteProveedor.rejected]: (state) => {
  //     state.loading = false;
  //   },

  //   //UPDATE
  //   [updateProveedor.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [updateProveedor.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.proveedores = payload.ListaDeproveedores;
  //   },
  //   [updateProveedor.rejected]: (state) => {
  //     state.loading = false;
  //   },
  // },
});
