import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutReports from './features/Report/LayoutReports';
import LayoutSalida from './features/Salidas/LayoutSalida';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';
import LayoutAlmacenes from './features/Almacenes/LayoutAlmacenes';
import { ButtonLogout } from './components/ButtonLogout';
import { TitleSystem } from './components/TitleSystem';
import { BoxContainer } from './components/BoxContainer';
import LayoutPermisos from './features/Permisos/LayoutPermisos';
import LayoutEmpleados from './features/Empleados/LayoutEmpleados';

export default function Layout() {
  const { permisos } = useSelector((state) => state.Permisos);
  const { user } = useSelector((state) => state.Auth);
  const UserPermiso = permisos.find(
    (permiso) => permiso.id === user.IdPermisos
  );
  return (
    <BoxContainer
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: 'min(90%,1200px)',
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '1rem',
          pb: '1rem',
          color: '#00CCFF',
        }}
      >
        <TitleSystem user={user} UserPermiso={UserPermiso} />

        <BoxContainer>
          <Grid container columns={5} gap={3} justifyContent='center' p={5}>
            {UserPermiso?.Configuracion === 1 && (
              <Grid item md={'auto'}>
                <LayoutDatos />
              </Grid>
            )}
            {UserPermiso?.Productos === 1 && (
              <Grid item md={'auto'}>
                <LayoutProducto />
              </Grid>
            )}
            {UserPermiso?.Almacenes === 1 && (
              <Grid item md={'auto'}>
                <LayoutAlmacenes />
              </Grid>
            )}

            {UserPermiso?.Usuarios === 1 && (
              <Grid item md={'auto'}>
                <LayoutUsuarios />
              </Grid>
            )}
            {UserPermiso?.Empleados === 1 && (
              <Grid item md={'auto'}>
                <LayoutEmpleados />
              </Grid>
            )}
            {UserPermiso?.Usuarios === 1 && (
              <Grid item md={'auto'}>
                <LayoutPermisos />
              </Grid>
            )}

            {UserPermiso?.Entradas === 1 && (
              <Grid item md={'auto'}>
                <LayoutEntrada />
              </Grid>
            )}
            {UserPermiso?.Salidas === 1 && (
              <Grid item md={'auto'}>
                <LayoutSalida />
              </Grid>
            )}

            <Grid item md={'auto'}>
              <LayoutReports />
            </Grid>
          </Grid>
        </BoxContainer>
        <ButtonLogout />
      </Box>
    </BoxContainer>
  );
}
