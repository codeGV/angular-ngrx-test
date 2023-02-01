import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { debounceTime, map, Subject, take, takeUntil } from 'rxjs';
import { selectUsers } from 'src/app/pages/user/store/user.reducer';
import * as userActions from '../store/user.actions';
import { User } from '../store/user.constant';
import { UserCreateComponent } from '../user-create/user-create.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private _destroy = new Subject();
  public users$: any = this.store.pipe(select(selectUsers));
  public selectedUserId = -1;
  emailControl = new FormControl('');

  constructor(private readonly store: Store, private dialog: MatDialog, private router: Router) { }

  public ngOnInit(): void {
    this.store.dispatch(userActions.getUsers());

    this.emailControl.valueChanges.pipe(debounceTime(500), takeUntil(this._destroy)).subscribe((val) => {
      if (val) {
        this.users$ = this.store.pipe(select(selectUsers)).pipe(map((users: User[]) => users.filter((u) => u.email.includes(val))))
      } else {
        this.users$ = this.store.pipe(select(selectUsers));
      }
    })

  }

  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.complete();
  }

  addUser() {
    this.dialog.open(UserCreateComponent).afterClosed().pipe(take(1)).subscribe(() => {
      // handle after close
    })
  }

  onUser(user: User) {
    this.store.dispatch(userActions.selectUser({ user }))
    this.router.navigate(['users/details', user.id])
  }
}
