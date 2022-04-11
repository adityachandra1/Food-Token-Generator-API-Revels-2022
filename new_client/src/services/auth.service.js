import axios from "axios";

const jwt = sessionStorage.getItem("currentUser");
console.log("JWT", jwt);
export const checkLoggedIn = async () => {
  try {
    const res = await axios.get("http://localhost:8080/check-logged-in", {
      headers: {
        Authorization: JSON.parse(jwt),
      },
    });

    return res;
  } catch (err) {
    return err;
  }
};
