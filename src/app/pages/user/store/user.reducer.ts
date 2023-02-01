import { createReducer, createSelector, on } from '@ngrx/store';
import { createIndexedDBReducer } from './indexDB/indexDB';
import * as UserActions from './user.actions'
import { User } from './user.constant';


export const userFeatureKey = 'user';

export interface UserState {
  users: User[],
  userDeatils?: User,
  loading: boolean,
  error: any
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state, action) => ({ ...state, users: action.users })),
  on(UserActions.addUser, (state, action) => {
    createIndexedDBReducer(action.user,'users');
    return { ...state, users: [...state.users, action.user] };
  }),

  on(UserActions.selectUser, (state, action) => ({ ...state, userDeatils: action.user })),

);


// SELECTORS
export const selectUserState = (state: any) => state.userState;
export const selectUsers = createSelector(selectUserState, (state) => state.users);
export const selectUserDetails = createSelector(selectUserState, (state) => state.userDeatils);
export const searchByEmail = (prop:{searchText:string}) => createSelector(selectUserState, (state) => state.users.filter((u:User)=>u.email.includes(prop.searchText)));
