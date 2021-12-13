import { Request, Response, NextFunction } from 'express';

import { FirebaseService } from '@services';
import { HttpError } from '@models';

class DeriverController {
	private readonly _firebaseService: FirebaseService;

	public constructor(firebaseService: FirebaseService) {
		this._firebaseService = firebaseService;
	}

	get firebaseService() {
		return this._firebaseService;
	}

	public async createDeriver(req: Request, res: Response, next: NextFunction) {
		try {
			const { data } = await this.firebaseService.setDeriverById(req.body);

			res.json({ ok: true, data });
		} catch (error) {
			return next(new HttpError(error, 500));
		}
	}

	public async getDeriverById(req: Request, res: Response, next: NextFunction) {
		const { id = '' } = req.params;

		try {
			const { data } = await this.firebaseService.getDeriverById(id);

			if (!data) {
				return next(new HttpError("Can't find property by id...", 404));
			}

			res.json({ ok: true, data });
		} catch (error) {
			return next(new HttpError(error, 500));
		}
	}
}

const deriverController = new DeriverController(new FirebaseService());

export { deriverController };
