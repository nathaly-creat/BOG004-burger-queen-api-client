// IMPORTACION HOOKS Y OTROS
import { useCart } from "react-use-cart";

export const ProductsToBill = () => {

    // se declaran los metodos para actualización de productos a ordenar
    const { items, updateItemQuantity, removeItem,  } = useCart();

    // captura de productos para facturar
    const prodsToBill = items.map((product, index) => {
      return (
        <div key={index}>
          <table className="table table-dark table-borderless">
            <tbody>
              <tr>
                <td>
                  <img src={product.image} style={{ width: "6rem" }} alt="" />
                </td>
                <td>{product.name}</td>
                <td>
                  <button
                    className="btn btn-info ms-2"
                    onClick={() =>
                      updateItemQuantity(product.id, product.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    className="btn btn-info ms-2"
                    onClick={() =>
                      updateItemQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>{product.price}</td>
                <td>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => removeItem(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });

  return (
    <>{prodsToBill}</>
  )
}
