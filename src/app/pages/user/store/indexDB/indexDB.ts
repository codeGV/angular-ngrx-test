
import { Observable, Subject } from "rxjs";
import { User } from "../user.constant";

async function getInitialStateFromDb(db: IDBDatabase, reducerKey: string) {
	return new Promise((resolutionFunc, rejectionFunc) => {
		const stateObjectStore = db
			.transaction(reducerKey, "readonly")
			.objectStore(reducerKey);
		const request = stateObjectStore.get("1");
		request.onerror = rejectionFunc;
		request.onsuccess = function () {
			resolutionFunc(request.result);
		};
	});
}

async function tryCreateStore(request: IDBOpenDBRequest, reducerKey: string) {
	return new Promise((resolutionFunc, rejectionFunc) => {
		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = request.result;
			if (!db.objectStoreNames.contains(reducerKey)) {
				db.createObjectStore(reducerKey);
			}
		};
		request.onsuccess = () => {
			resolutionFunc(request.result);
		};
		request.onerror = rejectionFunc;
	});
}

async function saveState(db: IDBDatabase, newState: any, reducerKey: string) {
	return new Promise((resolutionFunc, rejectionFunc) => {
		const stateObjectStore = db
			.transaction(reducerKey, "readwrite")
			.objectStore(reducerKey);
		const request = stateObjectStore.put(newState, "1");
		request.onerror = rejectionFunc;
		request.onsuccess = resolutionFunc;
	});
}

export function getIndexedDBUsers(
	reducerKey: string
): Observable<User[]> {
	const subject = new Subject<User[]>()
	const request = window.indexedDB.open("MyTestDatabase");

	try {
		tryCreateStore(request, reducerKey).then((db: any) => {
			getInitialStateFromDb(db, reducerKey).then((users: any) => subject.next(users || []))
		})
	} catch (err) {
		console.error(err);
	}
	return subject;

}

export async function createIndexedDBReducer(
	user: User,
	reducerKey: string
): Promise<User[]> {
	const request = window.indexedDB.open("MyTestDatabase");
	let db: any = undefined;

	try {
		db = await tryCreateStore(request, reducerKey);
	} catch (err) {
		console.error('eeeeee', err);
	}
	const users =
		((await getInitialStateFromDb(db, reducerKey)) as User[]) ?? [];

	users.push(user);
	saveState(db, users, reducerKey);
	return Promise.resolve(users);
}