import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth';
import { checkDuplicateEmail } from '../middleware/verifySignUp';

const router = Router();

router.post('/sign-in', signIn);

router.post('/sign-up', checkDuplicateEmail, signUp);

export default router;
