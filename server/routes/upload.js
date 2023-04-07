import express from "express";
const router = express.Router();
//import { uploadFiles, getListFiles, download } from "../controllers/upload.js";
const { uploadFiles, getListFiles, download } = require("../controllers/upload.js");



router.post("/upload", uploadFiles);
router.get("/files", getListFiles);
router.get("/files/:name", download);

export default router;