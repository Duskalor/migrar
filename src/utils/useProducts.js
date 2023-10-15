import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useUserLogin } from './useUserLogin';

export const useProducts = () => {
  const { IdAlmacenes } = useUserLogin();
  const { entradas } = useSelector((state) => state.Entradas);
  const { salidas } = useSelector((state) => state.Salidas);
  const { productoEntradaBD: proEntradas } = useSelector(
    (state) => state.ProductoEntrada
  );
  const { productoSalidaBD: proSalidas } = useSelector(
    (state) => state.ProductoSalida
  );

  const { productos: allProductos } = useSelector((state) => state.Productos);

  const ProductosActuales = useMemo(() => {
    const ContadorEntradas = proEntradas.reduce((acc, proEntrada) => {
      const { IdProducto, Cantidad, IdEntrada } = proEntrada;
      const { IdAlmacenes, active } = entradas.find((entra) => {
        // console.log({ entra, IdEntrada });
        return entra.id === IdEntrada;
      });
      if (active) {
        const exist = acc.findIndex(
          (pro) => pro.id === IdProducto && pro.IdAlmacenes === IdAlmacenes
        );
        const producto = allProductos.find((pro) => pro.id === IdProducto);

        if (exist === -1)
          acc.push({
            ...producto,
            Cantidad: +Cantidad,
            IdAlmacenes: IdAlmacenes,
          });
        else {
          acc[exist] = {
            ...acc[exist],
            Cantidad: acc[exist].Cantidad + +Cantidad,
          };
        }
      }

      return acc;
    }, []);
    // console.log({ ContadorEntradas, proSalidas, salidas });
    const total = ContadorEntradas.map((proEntrada) => {
      const { id: IdProducto, Cantidad, IdAlmacenes } = proEntrada;
      const producto = proSalidas
        .filter(
          (pro) =>
            pro.IdProducto === IdProducto && pro.IdAlmacenes === IdAlmacenes
        )
        .reduce((acc, pro) => {
          if (acc.length === 0) acc.push(pro);
          else
            acc[0] = { ...acc[0], Cantidad: acc[0].Cantidad + +pro.Cantidad };

          return acc;
        }, []);

      if (producto.length === 0) return proEntrada;
      const { IdAlmacenes: almacen, active } = salidas.find(
        (sali) => sali.id === producto[0].IdSalida
      );
      // console.log({ producto, proEntrada });

      return IdAlmacenes === almacen && active
        ? {
            ...proEntrada,
            Cantidad: Cantidad - producto[0].Cantidad,
          }
        : proEntrada;
    });
    // console.log(total);
    // return total;

    const finalData = allProductos
      .filter((producto) => {
        const exist = total.some((pro) => pro.id === producto.id);
        return !exist;
      })
      .map((producto) => ({ ...producto, Cantidad: 0, IdAlmacenes }));

    const Final = [...total, ...finalData];
    return Final;
  }, [entradas, proEntradas, allProductos, salidas, proSalidas]);

  return ProductosActuales;
};
