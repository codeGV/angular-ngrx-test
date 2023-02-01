import { Component, Input } from '@angular/core';
import { User } from '../../store/user.constant';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent {

  @Input() tabTitle: string = '';
  @Input() userDeatils?: User | null;
  
  constructor(){}

}
