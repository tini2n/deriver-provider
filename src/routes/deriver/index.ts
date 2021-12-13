import { Router } from 'express';

import { deriverController } from '@controllers/deriver';

const router = Router();

router.get('/:id', deriverController.getDeriverById.bind(deriverController)); // FOR TYPE Dependecy injection style

router.post('/', deriverController.createDeriver.bind(deriverController));

export { router as deriverRouter };
