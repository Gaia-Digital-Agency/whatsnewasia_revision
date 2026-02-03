import authService from "../services/auth.service.js";
import { response, errResponse } from "../helpers/response.js";

export default {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const vaData = await authService.login(email, password);
      const cookieOptions = {
        httpOnly: true, // Not accessible by client-side JavaScript (XSS protection)
        secure: true, // Use 'secure: true' in production over HTTPS
        sameSite: "none", // Required for cross-origin cookies
      };
      // Send Refresh Token as an HTTP-only cookie
      // 7 day expiry in milliseconds
      const refreshTokenAge = 7 * 24 * 60 * 60 * 1000;
      res.cookie("jwt", vaData.refreshToken, {
        ...cookieOptions,
        maxAge: refreshTokenAge
      });

      // Remove vaData.refreshToken from the response
      delete vaData.refreshToken;

      // Change object key name of accessToken to token
      vaData.token = vaData.accessToken;
      // 5 minute expiry in milliseconds
      const accessTokenAge = 5 * 60 * 1000;
      res.cookie("token", vaData.token, {
        ...cookieOptions,
        maxAge: accessTokenAge,
      });
      delete vaData.accessToken;

      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async register(req, res) {
    try {
      const {
        name,
        email,
        password,
        id_country,
        id_city,
        user_level,
        timezone,
      } = req.body;
      const vaData = await authService.registerUser(
        name,
        email,
        password,
        id_country,
        id_city,
        user_level,
        timezone
      );
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async logout(req, res) {
    try {
      const vaData = await authService.logout(req);
      
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async changePassword(req, res) {
    try {
      const vaData = await authService.changePassword(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async getUsers(req, res) {
    try {
      const vaData = await authService.getUsers(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async updateUserStatus(req, res) {
    try {
      const vaData = await authService.updateUserStatus(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async getUserById(req, res) {
    try {
      const vaData = await authService.getUserById(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async updateUser(req, res) {
    try {
      const vaData = await authService.updateUser(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  // NEW METHOD: Get profile picture
  async getProfilePicture(req, res) {
    try {
      await authService.getProfilePicture(req, res);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async deleteProfilePicture(req, res) {
    try {
      const vaData = await authService.deleteProfilePicture(req);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },

  async refreshToken(req, res) {
    try {
      const vaData = await authService.refreshToken(req);
      
      const cToken = vaData.token;
      // 5 minute expiry in milliseconds
      const accessTokenAge = 5 * 60 * 1000; 
      res.cookie("token", cToken, {
        httpOnly: true, // Not accessible by client-side JavaScript (XSS protection)
        secure: true,
        sameSite: "none", // Required for cross-origin cookies
        maxAge: accessTokenAge,
      });
      // console.log("HASIL REFRESH => ",vaData);
      return response(res, 200, vaData);
    } catch (error) {
      errResponse(error, res);
    }
  },
};
