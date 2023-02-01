import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabComponent } from './tab/tab.component';
import { UsersListComponent } from './users-list/users-list.component';


const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'list' },
  { path: 'list', component: UsersListComponent } ,
  { path: 'details/:id', component: TabComponent } ,

];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
