import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from "../features/cartSlice";

function Cart() {

  const dispatch = useDispatch();

  const cart = useSelector(
    state => state.cart
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (

    <div className="cart-container">

      <h1 className="page-title">
        Your Cart
      </h1>

      {
        cart.length === 0 ? (

          <div className="empty-cart">

            <h2>
              Your Cart Is Empty
            </h2>

            <p>
              Add laptops from the Laptops page.
            </p>

          </div>

        ) : (

          <>

            <div className="cart-grid">

              {
                cart.map(item => (

                  <div
                    key={item.id}
                    className="cart-card"
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-content">

                      <h2>{item.name}</h2>

                      <p>🏷 {item.brand}</p>

                      <p>💰 ₹{item.price} each</p>

                      <div className="quantity-controls">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(item.id)
                            )
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(item.id)
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <p className="line-total">
                        Subtotal: ₹{item.price * item.quantity}
                      </p>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          dispatch(
                            removeFromCart(item.id)
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))
              }

            </div>

            <div className="cart-summary">

              <h2>
                Total: ₹{total}
              </h2>

              <button
                className="clear-btn"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

            </div>

          </>

        )
      }

    </div>

  );
}

export default Cart;