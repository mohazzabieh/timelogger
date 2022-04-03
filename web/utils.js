import axios from "axios";

export const post = async (url, data) => {
  return axios.post(url, data).then((res) => {
    if (res && !res.data.isSuccess && res.data.unauthorized) {
      window.location = "/401";
      return;
    }
    return res;
  });
};

export const get = async (url) => {
  return axios.get(url).then((res) => {
    if (res && !res.data.isSuccess && res.data.unauthorized) {
      window.location = "/401";
      return;
    }
    return res;
  });
};
