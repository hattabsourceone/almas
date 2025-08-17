import { BASE_URL } from "@components/api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import useAuth from "./useAuth";

export type UserProps = {
  id: number;
  name: string;
  login: string;
  newsletter: boolean;
  billing_full_name: string;
  billing_mobile_w_country: string;
  billing_address: string;
  billing_city: string;
  billing_post_code: string;
  billing_country: string;
  billing_state: string;
  shipping_full_name: string;
  shipping_mobile_w_country: string;
  shipping_address: string;
  shipping_city: string;
  shipping_post_code: string;
  shipping_country: string;
  shipping_state: string;
  compared_diamonds_ids: number[];
  wishlist_ids: number[];
  order_ids: number[];
  phone: any;
};

const useUser = () => {
  const { currentTokenRef, currentUIDRef } = useAuth();
  const [user, setUser,] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      const token = Cookies.get("session_id_token");
      const uid = Number(Cookies.get("uid"));

      if (token && token != "guest") {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/v1/get_authenticated_user/`,
            {
              session_id: token,
              uid: uid,
            }
          );
          setUser(response.data.user);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    getAuthenticatedUser();
  }, []);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return { user, setUser, loading };
};

export default useUser;
