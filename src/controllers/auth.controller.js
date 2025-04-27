import authService from "../services/auth.service.js";

class AuthController {
  async login(req, res, next) {
    try {
      const response = await authService.login(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      console.log("------>", req.body);
      const response = await authService.register(req.body);
      const { ST, ...rest } = response;
      return res.status(ST).json(rest);
    } catch (error) {
      next(error);
    }
  }
}
export default new AuthController();
