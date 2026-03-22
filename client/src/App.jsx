import React, { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import api from "./config/axios.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./store/reducres/userSlice";
import { loadProducts, setLoading, setProductError } from './store/reducres/productSlice';

// 🔹 Loader Component
const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[rgb(var(--background))]">
      <div className="w-10 h-10 border-4 border-[rgb(var(--primary))] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state?.userReducer);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("user/user-profile", {
          withCredentials: true,
        });

        if (response.data.success) {
          dispatch(loadUser(response?.data?.data));
        } else {
          dispatch(loadUser(null));
        }
      } catch (error) {
        dispatch(loadUser(null)); // important
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading()); // Start loading state
        
        const response = await api.get("/product/get-products");

        if (response.data.success) {
          // response.data.data refers to the array of products from our controller
          dispatch(loadProducts(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        dispatch(setProductError(error.message));
      }
    };

    fetchProducts();
  }, [dispatch]);

  // 🔥 Loader condition
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      <main>
        <MainRoutes />
      </main>
    </div>
  );
};

export default App;
