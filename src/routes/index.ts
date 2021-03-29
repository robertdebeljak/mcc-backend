import { Router } from 'express';
import codeRouter from './codeRouter';

const router = Router();

router.use(codeRouter);
export default router;
