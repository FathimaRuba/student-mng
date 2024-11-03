import axios from "axios";

const commonApi = async (reqUrl, reqMethod, reqHeader, reqbody) => {
  const config = {
    url: reqUrl,
    method: reqMethod,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" },
    data: reqbody,
  };
  return await axios(config)
    .then((res) => res)
    .catch((err) => err);
};

export default commonApi;
