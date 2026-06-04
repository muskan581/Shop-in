import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CheckOut from "./pages/CheckOut";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import PageNotFound from "./pages/404";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser, setLoggedInUser } from "./features/auth/authSlice";
import OrderSuccess from "./pages/orderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProdctFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AboutUs from "./pages/AboutUsPage";
import ContactUs from "./pages/ContactUsPage";
import AdminBrandsCategories from "./features/admin/components/AdminBrandsCategories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/admin",
    element:
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckOut></CheckOut></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>
  },
  {
    path: "/admin/product-detail/:id",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductDetailPage></AdminProductDetailPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/admin/product-form",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/admin/orders",
    element:
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
  },
  {
    path: "/admin/createBrand",
    element:
      <ProtectedAdmin>
        <AdminBrandsCategories></AdminBrandsCategories>
      </ProtectedAdmin>
  },
  {
    path: "/orders",
    element: <Protected><UserOrdersPage></UserOrdersPage></Protected>,
  },
  {
    path: "/order-sucess/:id",
    element: <Protected><OrderSuccess></OrderSuccess></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>
  },
  {
    path: "/forgot-password",
    element: <LoginPage></LoginPage>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  {
    path: "/about",
    element: <AboutUs></AboutUs>
  },
  {
    path: "/contact",
    element: <ContactUs></ContactUs>
  },
]);

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user?.id))
    }
  }, [dispatch, user])

  // useEffect(() => {
  //   const checkUserLoggendIn = async () => {
  //       const response = await fetch("https://shop-in-yaeu.onrender.com/auth/checkUserLoggedIn/", {
  //         method: "GET",
  //         credentials: "include"
  //       });
  //       if(response.ok) {
  //         const data = await response.json();
  //         dispatch(setLoggedInUser(data));
  //       }
  //   }
  //   checkUserLoggendIn();
  // }, []);

  useEffect(() => {
  const checkUserLoggendIn = async () => {
    try {
      const response = await fetch(
        "https://shop-in-yaeu.onrender.com/auth/checkUserLoggedIn",
        {
          method: "GET",
          credentials: "include"
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setLoggedInUser(data));
      }
    } catch (error) {
      console.log("Auth Error:", error);
    }
  };

  checkUserLoggendIn();
}, [dispatch]);

  return (
    <div className="overflow-hidden font-lora">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;