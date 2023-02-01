import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as userActions from '../store/user.actions';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  form = this._formBuilder.group({
    id: [Date.now().toString()],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
  })
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store,
    private _dialogRef: MatDialogRef<any>) { }

  save() {
    if (this.form.invalid) return;
    this._store.dispatch(userActions.addUser({ user: this.form.value }));
    this._dialogRef.close()
  }

}
