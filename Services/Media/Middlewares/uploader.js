import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
// import crypto from "crypto";
// import path from "path";
// import { mongoURI } from "../DB/db.js";
// import { gfs } from "../DB/db.js";

// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         if (!file.originalname) {
//             throw new Error("File name is missing");
//         } else {
//             console.log("salam")
//             console.log("File being uploaded:", file);
//             // console.log("gfs:", gfs)
//         }
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//             if (err) {
//                 console.log("mustaaaaaaaaaaaarrrrrddddd")
//                 return reject(err);
//             }
//             const filename = buf.toString("hex") + path.extname(file.originalname);
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: "uploads", // Same as the collection name
//                 metadata: { uploadedBy: req.user ? req.user._id : "anonymous" }, // Optional metadata
//             };
//             resolve(fileInfo);
//             });
//         });
//     },
// });
  
export default multer({ storage: multer.memoryStorage() });