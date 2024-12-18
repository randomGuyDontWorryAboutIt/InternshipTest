import express from 'express';
import { getStatusResult } from '../controller/status.controller.js';

const router = express.Router();

router.get("/:id",getStatusResult);


export default router;