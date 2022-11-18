import { Router } from 'express';
import {
  createClient,
  getClientById,
  getClients,
  updateClientById,
  deleteClient
} from '../controllers/clients';

const router = Router();

router.post('/', createClient);

router.get('/', getClients);

router.get('/:clientId', getClientById);

router.put('/:clientId', updateClientById);

router.delete('/:clientId', deleteClient);


export default router;
