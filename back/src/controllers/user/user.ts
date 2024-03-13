import { RequestHandler } from "express";

import User from "@/src/models/user";

export const getUser: RequestHandler = async (req, res, next) => {
  console.log("getUser");
  const result = await User.findById(req.userInfo?._id).select(
    "email nickname profileImage"
  );

  res.status(200).json(result);
};

export const modifyUser: RequestHandler = async (req, res, next) => {
  console.log("modifyUser");
  const userInfo = req.body.userInfo;
  req.userInfo?.modifyUser(userInfo);

  res.status(200).json({ message: "수정 완료!" });
};

export const withDrawUser: RequestHandler = async (req, res, next) => {
  console.log("withDrawUser");
  req.userInfo?.withDrawUser();

  res.clearCookie("refreshToken");

  res.status(200).json({ message: "탈퇴 완료" });
};
