import axios from "axios";
import { BACKEND_URL } from "../constant";

export const checkLoggedIn = async (jwt) => {
  try {
    if (jwt) {
      const res = await axios.get(`${BACKEND_URL}/check-logged-in`, {
        headers: {
          authorization: jwt,
        },
      });
      return res;
    } else {
      throw new Error("No JWT");
    }
  } catch (err) {
    return err;
  }
};
