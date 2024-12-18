import express from 'express';
import { getData, postData, editData } from '../controller/data.controller.js';

const router = express.Router();

router.get("/",getData);
router.post("/",postData);
router.put("/:id",editData);


export default router;