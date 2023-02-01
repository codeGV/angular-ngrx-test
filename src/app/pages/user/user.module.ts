import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from 'src/app/pages/user/store/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/pages/user/store/user.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserCreateComponent } from './user-create/user-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { TabComponent } from './tab/tab.component';
import { UserHistoryComponent } from './tab/user-history/user-history.component';
import { UserInfoComponent } from './tab/user-info/user-info.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UserCreateComponent,
    TabComponent,
    UserHistoryComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTabsModule,
    StoreModule.forFeature('userState', userReducer),
    EffectsModule.forFeature([UserEffects]),

  ]
})
export class UserModule { }
