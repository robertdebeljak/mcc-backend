import { Router } from 'express';
import { getCodeList } from '../controllers/CodeController';

const codeRouter = Router();

codeRouter.get('/', getCodeList);

export default codeRouter;
