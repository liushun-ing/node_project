import axios from "axios";

const upload = async (path, form) => {
  const params = new FormData();
  for (const key in form) {
    params.append(key, form[key]);
  }
  const res = await axios.post(path, params, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export default upload;
