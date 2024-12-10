// import { OTP } from "../Domain/models/otp.js";
import { redisClient } from "../DB/redis.js";

export async function otpCreate(email, code) {
    // return await OTP.create(otp);
    const expirationTime = 20 * 60;
    return await redisClient.set(email, code, { EX: expirationTime });
}

export async function otpRead(email) {
    // return await OTP.findOne({where: condition});
    return await redisClient.get(email);
}

export async function otpDelete(email) {
    return await redisClient.del(email);
}