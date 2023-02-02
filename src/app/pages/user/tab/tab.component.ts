import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectUserDetails } from '../store/user.reducer';
import { Location } from '@angular/common'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  public userDetails$: any = this.store.pipe(select(selectUserDetails));

  constructor(private readonly store: Store,  private location: Location) { }

  goBack(){
    this.location.back();
  }
}
