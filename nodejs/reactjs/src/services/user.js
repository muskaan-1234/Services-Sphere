import { privateReq, publicReq } from "./axios-config"; // Import your Axios instances

export const signupService = (data) => publicReq.post("/user/signup-process-with-post", data);

export const requestPasswordReset = (data) => privateReq.post("/user/request-password-reset", data);

export const verifyResetToken = (token) => privateReq.get(`/user/verify-reset-token?token=${token}`);

