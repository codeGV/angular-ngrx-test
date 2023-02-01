import { createAction, props } from '@ngrx/store';
import { User } from './user.constant';

export enum UserActionTypes { // Aqui a gente cria um Enum com as actions
  GetAll = '[User] Get Users',
  LoadUsers = '[User] Load Users',
  SelectUser = '[User] Select User',
  Add = '[User] Add Users',
}

export const loadUsers = createAction(
  UserActionTypes.LoadUsers,
  props<{ users: User[] }>()
);


export const getUsers = createAction(
  UserActionTypes.GetAll,
);

export const selectUser = createAction(
  UserActionTypes.SelectUser,
  props<{user:User}>()
);

export const addUser = createAction(
  UserActionTypes.Add,
  props<{user:User}>()
);

