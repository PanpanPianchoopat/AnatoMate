import { HTTP } from "./axios";

class UserAPI {
  findUser(type, keyword) {
    console.log("TYPE", type);
    console.log("REQ", `/userlist?${type}=${keyword}`);
    // return HTTP.get(`/userlist?${type}=${keyword}`);
    if (type === "username") {
      console.log("USER");
      return HTTP.get("/userlist", { params: { username: keyword } });
    }
  }
  signin(info) {
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
