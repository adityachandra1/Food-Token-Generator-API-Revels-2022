import axios from "axios";

const jwt = sessionStorage.getItem("currentUser");

export const checkLoggedIn = async () => {
  try {
    const res = await axios.get("http://localhost:8080/check-logged-in", {
      headers: {
        Authorization: jwt,
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};
