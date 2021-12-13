import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, DocumentData, WriteResult } from 'firebase-admin/firestore';

import * as fs from 'fs';

import { HttpError } from '@models';

const firebaseCredentials = JSON.parse(fs.readFileSync('firebase.json').toString());

export class FirebaseService {
	app;
	db;

	constructor() {
		try {
			this.app = initializeApp({ credential: cert(firebaseCredentials) });
			this.db = getFirestore(this.app);
		} catch (error) {
			console.error(error);
		}
	}

	public async setDeriverById(payload: { key: string; deriver: string }) {
		try {
			const { writeTime } = (await this.db.collection('derivers').doc(payload.key).set(payload)) as WriteResult;

			return {
				data: { created: writeTime.seconds },
			};
		} catch (error) {
			throw new HttpError(error, 500);
		}
	}

	public async getDeriverById(id: string): Promise<{ exists: boolean; data?: Deriver }> {
		try {
			const instance = await this.db.collection('derivers').doc(id).get(),
				data: DocumentData = await instance.data();

			return {
				exists: instance.exists,
				data: data as Deriver,
			};
		} catch (error) {
			throw new HttpError(error, 500);
		}
	}
}
