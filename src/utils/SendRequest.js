import axios from "axios";
import toast from "react-hot-toast";

export const loadingUi = (isShow) => {
  const loadingUiDiv = document.getElementById("loading-full-screen");
  if (!loadingUiDiv) return;
  if (isShow) {
    loadingUiDiv.style.display = "flex";
  } else {
    loadingUiDiv.style.display = "none";
  }
};

const SendRequest = async (method, url, data = {}) => {
  try {
    const token = localStorage.getItem("token") || "";
    if (url !== "/api/webhooks") {
      loadingUi(true);
    }
    const response = await axios({
      method,
      url: url,
      data,
      params: method === "GET" ? data : {},
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return {
<<<<<<< Updated upstream
      payload: response.data.data
=======
<<<<<<< Updated upstream
      payload: response.data.data
=======
      payload: response.data?.data || response.data || response
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    };
  } catch (error) {
    console.error(error);
    const message =
      (error?.response?.data && (error.response.data.message || error.response.data.error)) ||
      error.message ||
      "Something went wrong";
    if (url !== "/api/webhooks") {
      toast.error(message);
    }
    return message;
  } finally {
    loadingUi(false);
  }
};

export default SendRequest;
