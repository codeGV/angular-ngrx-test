import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as UserActions from './user.actions'
import { map, switchMap } from 'rxjs/operators';

import { getIndexedDBUsers } from './indexDB/indexDB';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
  ) { }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      switchMap(() => this.loadAllUsers())
    )
  )

  private loadAllUsers() {
    return getIndexedDBUsers('users').pipe(map((users) => ({ type: UserActions.UserActionTypes.LoadUsers, users })))
  }
}
