import axios from "axios";

export const checkLoggedIn = async (jwt) => {
  try {
    if (jwt) {
      const res = await axios.get("http://localhost:8080/check-logged-in", {
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
