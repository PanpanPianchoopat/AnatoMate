import { HTTP } from "./axios";

class UserAPI {
  signup(info) {
    return HTTP.post("/register", info);
  }
  login(info) {
    return HTTP.post("/login", info);
  }
  findExact(type, keyword) {
    return HTTP.get(`/exact?${type}=${keyword}`);
  }
}

export default new UserAPI();
