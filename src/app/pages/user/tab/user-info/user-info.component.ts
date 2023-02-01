import { Component, Input } from '@angular/core';
import { User } from '../../store/user.constant';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {

  @Input() tabTitle: string = '';
  @Input() userDeatils?: User | null;

  constructor() { }


}
