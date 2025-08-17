import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "@components/api/api";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  isAuth: boolean | undefined;
  isLoading: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  currentToken: string | undefined;
  setCurrentToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentUID: string | undefined;
  setCurrentUID: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentTokenRef: React.RefObject<string | undefined>;
  currentUIDRef: React.RefObject<string | undefined>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: undefined,
  isLoading: true,
  setAuth: () => {},
  currentToken: undefined,
  setCurrentToken: () => {},
  currentUID: undefined,
  setCurrentUID: () => {},
  currentTokenRef: { current: undefined },
  currentUIDRef: { current: undefined },
  logout: () => {},
});

export default AuthContext;

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [isAuth, setAuth] = useState<boolean | undefined>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [currentToken, setCurrentToken] = useState<string | undefined>(
    undefined
  );
  const currentTokenRef = useRef<string | undefined>(currentToken);
  const [currentUID, setCurrentUID] = useState<string | undefined>(undefined);
  const currentUIDRef = useRef<string | undefined>(currentUID);
  const navigate = useNavigate();
  const session_id = Cookies.get("session_id_token") || currentTokenRef.current;
  const uid = Number(Cookies.get("uid")) || Number(currentUIDRef.current);

  useEffect(() => {
    currentTokenRef.current = currentToken;
  }, [currentToken]);

  useEffect(() => {
    currentUIDRef.current = currentUID;
  }, [currentUID]);

  const logout = () => {
    setCurrentToken(undefined);
    setCurrentUID(undefined);
    Cookies.remove("session_id_token");
    Cookies.remove("uid");
    Cookies.set("session_id_token", "guest");
    Cookies.set("uid", "guest");
    localStorage.removeItem("cart");
    localStorage.removeItem("compareDiamonds");
    localStorage.removeItem("wishList");
    //Remove Address
    localStorage.removeItem("updated_addr");
    setAuth(false);
    navigate("/");
  };

  const checkToken = async () => {
    const token = Cookies.get("session_id_token");
    const uid =
      Cookies.get("uid") === "guest" ? -1 : Number(Cookies.get("uid"));

    if (!token) {
      logout();
      setLoading(false);
      return;
    }

    if (!uid) {
      setAuth(false);
      logout();
      setLoading(false);
      return;
    }

    if (token === "guest") {
      setAuth(false);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/check_token/`, {
        session_id: token,
        uid: uid,
      });

      if (response.status === 200) {
        Cookies.set("session_id_token", response.data.session_id);
        Cookies.set("uid", uid.toString());
        setCurrentToken(response.data.session_id);
        setAuth(true);
        getCartItemsRequest();
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const getCartItemsRequest = async () => {
    try {
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(`${BASE_URL}/api/v1/get_cart`, body);
      console.log("cart from server", response.data.cart.jewellery);

      if (response.status === 200) {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...response.data.cart.diamond,
            ...response.data.cart.jewellery,
          ])
        );
      } else {
        // error there
      }
    } catch (error) {
      console.log("getCartItemsRequest:", error);
    }
  };

  const getCompareItemsRequest = async () => {
    try {
      // TODO add this live
      const body = {
        session_id: session_id,
        uid: uid,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/get_compared_diamond`,
        body
      );
      if (response.status === 200) {
        const compareBasket = response.data.cart.diamond; // TODO updat this section
        localStorage.setItem("compareDiamonds", JSON.stringify(compareBasket));
      } else {
        // error there
      }
    } catch (error) {
      console.log("getCompareItemsRequest:", error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isLoading,
        setAuth,
        currentToken,
        setCurrentToken,
        currentUID,
        setCurrentUID,
        currentTokenRef,
        currentUIDRef,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
