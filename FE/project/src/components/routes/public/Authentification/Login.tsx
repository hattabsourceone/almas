import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuth from "@components/hooks/useAuth";
import { BASE_URL } from "@components/api/api";

export type LoginCoordinates = {
  login: string;
  password: string;
  db: "odoo17";
};

const Login: React.FC = () => {
  const location = useLocation();
  const [loginCoordinates, setLoginCoordinates] = useState<LoginCoordinates>({
    login: "",
    password: "",
    db: "odoo17",
  });
  useEffect(() => {
    document.title = "Account Login"
  } , [])
  const { setAuth, setCurrentToken, setCurrentUID, currentToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const currentPath = location.pathname;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginCoordinates({
      ...loginCoordinates,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    postData();
  };

  const postData = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/authenticate`,
        loginCoordinates,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Cookies.set("session_id_token", response.data.session_id,);
        Cookies.set("uid", response.data.uid,);
        setCurrentToken(response.data.session_id);
        setCurrentUID(response.data.uid);
        setAuth(true);
        console.log("cookies:", Cookies.get("session_id_token"));
        console.log("dev:", currentToken);
        navigate("/profile");
      } else {
        handleLoginError("Invalid Credentials");
      }
    } catch (error: any) {
      handleLoginError(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = (message: string) => {
    setError(message);
    Cookies.remove("session_id_token",);
    Cookies.remove("uid",);
    setAuth(false);
    navigate("/authentification");
  };

  return (
    <div className="w-full md:w-[45%]">
      <div className="well bg-very-lite-blue rounded">
        <h2 className="pt-[25px] text-[28px] font-medium text-[#444444] pb-2">
          Returning Customer
        </h2>
        <h6 className="text-sm font-semibold text-[#666] pb-2">
          I am a returning customer
        </h6>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              className="text-[12px] text-slate-600"
            >
              E-Mail Address
            </label>
            <input
              type="email"
              className="form-control my-2 text-[12px] placeholder-gray-400"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="E-Mail Address"
              name="login"
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="exampleInputPassword1"
              className="text-[12px] text-slate-600"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control my-2 text-[12px] placeholder-gray-400"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <Link
              to="/authentification/reset-password"
              className="block w-fit mx-0 px-0 mb-[5px] text-[12px]"
            >
              Forgotten Password
            </Link>
          </div>
          <button
            className="text-xl h-[55px] font-medium uppercase text-white bg-[#201F41] py-2 px-20 rounded-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
