import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useReporte = () => {
  const { productoEntradaBD } = useSelector((state) => state.ProductoEntrada);
  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const { productos } = useSelector((state) => state.Productos);
  const { entradas } = useSelector((state) => state.Entradas);
  const { salidas } = useSelector((state) => state.Salidas);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { empleados } = useSelector((state) => state.Empleados);

  const Reporte = useMemo(() => {
    return [
      ...productoEntradaBD.map(
        ({ IdProducto, Cantidad, created_at, IdEntrada }) => {
          const product = productos.find((pro) => pro.id === IdProducto);
          // console.log({ IdProducto, product });
          const { Codigo, Descripcion } = product;

          const entrada = entradas.find((pro) => pro.id === IdEntrada);
          const almacen = almacenes.find(
            (alma) => alma.id === entrada.IdAlmacenes
          );
          const empleado = empleados.find(
            (emple) => emple.id === entrada.IdEmpleados
          );
          return {
            IdProducto,
            action: 'Entrada',
            Codigo,
            empleado: `${empleado.FullName}-${empleado.Cargo}`,
            Descripcion,
            Cantidad,
            created_at,
            almacen: almacen.ubicacion,
          };
        }
      ),
      ...productoSalidaBD.map(
        ({ IdProducto, Cantidad, created_at, IdSalida }) => {
          const { Codigo, Descripcion } = productos.find(
            (pro) => pro.id === IdProducto
          );

          const salida = salidas.find((pro) => pro.id === IdSalida);
          const almacen = almacenes.find(
            (alma) => alma.id === salida.IdAlmacenes
          );
          const empleado = empleados.find(
            (emple) => emple.id === salida.IdEmpleados
          );
          return {
            IdProducto,
            action: 'Salida',
            Codigo,
            empleado: `${empleado.FullName}-${empleado.Cargo}`,
            Descripcion,
            Cantidad,
            created_at,
            almacen: almacen.ubicacion,
          };
        }
      ),
    ];
  }, [productoSalidaBD, productoEntradaBD, productos]);

  return {
    Reporte: [
      ...Reporte.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).getTime(),
      })),
    ].sort((a, b) => a.created_at - b.created_at),
  };
};
