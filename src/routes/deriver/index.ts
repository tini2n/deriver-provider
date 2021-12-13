import { Router } from 'express';

import { deriverController } from '@controllers/deriver';

const router = Router();

router.get('/:id', deriverController.getDeriverById.bind(deriverController));

router.post('/', deriverController.createDeriver.bind(deriverController));

export { router as deriverRouter };
