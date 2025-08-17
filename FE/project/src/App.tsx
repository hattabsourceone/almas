import React, { useEffect, lazy, Suspense } from "react";
import Loading from "@components/shared/Loading/Loading";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./components/hooks/useAuth";
import Footer from "@components/shared/Footer/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";

// Lazy load components
const NavBar = lazy(() => import("./components/shared/Navbar/NavBar"));
const PrivateRoutes = lazy(() => import("./components/routes/PrivateRoutes"));
const PublicRoutes = lazy(() => import("./components/routes/PublicRoutes"));

const App: React.FC = () => {
  useEffect(() => {
    // document.title = "Almas Online Dubai | Diamond Engagement Rings Dubai"
    // getSession()
  });

  const getSession = async () => {
    await axios
      .options("http://195.26.240.215:8069/web/session/authenticate/", {
        params: {
          db: "odoo17",
          login: "",
          password: "",
        },
      })
      .then((_) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const { isAuth, isLoading } = useAuth();

  return (
    <div
      style={{ fontFamily: '"Plain Light", sans-serif' }}
      className="overflow-y-visible"
    >
      {isLoading ? (
        <div className="h-screen d-flex justify-content-center align-items-center">
          <Loading />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="h-screen d-flex justify-content-center align-items-center">
              <Loading />
            </div>
          }
        >
          <NavBar />
          <PrivateRoutes />
          <PublicRoutes />
          <Footer />
        </Suspense>
      )}
      <div
        id="whatsapp-button"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999,
        }}
      >
        <a
          href="https://api.whatsapp.com/send?phone=971589034451"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block" }}
        >
          <img
            src="http://flv.was.mybluehost.me/.website_ef0a6a17/wp-content/uploads/2023/11/whatsapp-1.png"
            alt="WhatsApp Chat"
            style={{ width: "60px", borderRadius: "20%" }}
          />
        </a>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
