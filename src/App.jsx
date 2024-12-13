import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "./store/productsSlice";

// Mahsulotlar ro'yxati
const initialProducts = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 1999,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-cto-hero-202410?wid=840&hei=504&fmt=jpeg&qlt=90&.v=1731525368099",
  },
  {
    id: 2,
    name: "Bluetooth Quloqchin",
    price: 249,
    image:
      "https://anker.com.bd/wp-content/uploads/2024/08/Soundcore-Liberty-4-NC-True-Wireless-Noise-Cancelling-Earbuds.jpg",
  },
  {
    id: 3,
    name: "Smart Soat",
    price: 399,
    image:
      "https://image-us.samsung.com/us/galaxy-watch7/gallery/07022024/SCOMB6Q6-481-Galaxy-Watch7_Product-KV_2P_RGB-800x600.jpg?$product-details-jpg$",
  },
  {
    id: 4,
    name: "Klaviatura",
    price: 129,
    image:
      "https://nuphy.com/cdn/shop/files/Main05_128dfd17-6216-4752-ab9a-437363c12d8a_1800x1800.jpg?v=1713515048",
  },
];

// Savat uchun reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

    default:
      return state;
  }
}

// Asosiy komponenta
function App() {
  const [products] = useState(initialProducts);
  // const [cart, dispatch] = useReducer(cartReducer, []);
  const cart = useSelector(state => state.products.products)
  const dispatch = useDispatch()
  
  console.log(cart)

  // const addToCart = (product) => {
  //   dispatch({ type: "ADD_TO_CART", payload: product });
  // };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: productId, quantity },
      });
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Elektronika Do'koni</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Mahsulotlar ro'yxati */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mahsulotlar</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg text-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mx-auto mb-2"
                />
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
                <button
                  onClick={() => dispatch(addToCart({...product, quantity: 1}))}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
                  disabled={cart.find((item) => item.id === product.id)}
                >
                  Savatga qo'shish
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Savat */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Savat</h2>
          {cart.length === 0 ? (
            <button className="text-gray-500" disabled={false}>
              Savat bo'sh
            </button>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 mr-4"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(deleteFromCart(item.id))}
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                    >
                      O'chirish
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <h3 className="text-xl font-bold">
                  Jami: ${calculateTotal().toFixed(2)}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;