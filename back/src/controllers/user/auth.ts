import axios from "axios";
import { NextFunction, Request, Response } from "express";

import User from "@/src/models/user";
import { findUserBySnsId, saveUser } from "@/src/service/user";
import { makeRefreshToken, makeToken, verifyToken } from "@/src/utils/jwt";

interface RefreshTokenType {
  userId: string;
  message: string;
  iat: number;
  exp: number;
}

export const getToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("getToken");
  const clientRefreshToken = req.cookies["refreshToken"];

  if (!clientRefreshToken) {
    return res.status(401).json("로그인이 필요합니다.");
  }
  try {
    const { userId, message } = verifyToken(
      clientRefreshToken
    ) as RefreshTokenType;

    if (message === "Token is expired") {
      return res.json({ message: "refreshToken is expired" });
    }

    if (userId) {
      const accessToken = makeToken(userId);
      const refreshToken = makeRefreshToken(userId);

      res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });

      const user = await User.findById(userId);
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            refreshToken,
          },
        }
      );

      const userInfo = { nickname: user?.nickname, email: user?.email };

      return res.json({ accessToken, userInfo });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json("오류 발생");
  }
};

const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";

export const getGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.query;
  const GOOGLE_AUTH_REDIRECT_URL = `${process.env.SERVER_BASE_URL}/auth/google/callback`;

  try {
    const { data } = await axios({
      method: "POST",
      url: `${GOOGLE_AUTH_TOKEN_URL}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        grant_type: "authorization_code",
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECURE_PASSWORD,
        redirectUri: GOOGLE_AUTH_REDIRECT_URL,
        code: code,
      },
    });

    const access_token = data["access_token"];

    const { data: fetchedUser } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const { sub, email, name, picture } = fetchedUser;
    const userInformation = {
      email,
      nickname: name,
      snsId: sub,
      type: "google",
      profileImage: picture,
    };

    const userInfo = await findUserBySnsId("google", sub);
    let refreshToken: string | undefined;

    if (userInfo) {
      refreshToken = makeRefreshToken(userInfo._id.toString());
    } else {
      const signUpUser = await saveUser(userInformation);
      if (typeof signUpUser !== "string") {
        refreshToken = makeRefreshToken(signUpUser._id.toString());
      }
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 60 * 60 * 24 * 2 * 10000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.redirect(302, process.env.REACT_APP_BASE_URL!);
  } catch (e) {
    console.log(e);
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("userLogout");
  res.clearCookie("refreshToken", {
    maxAge: 0,
    sameSite: "none",
    secure: true,
  });

  return res.status(200).json({ message: "Logout!" });
};
