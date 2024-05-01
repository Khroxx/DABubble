import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LogOutDialogComponent } from './log-out-dialog/log-out-dialog.component';
import { CustomDialogService } from '../../services/custom-dialog.service';
import { UserService } from '../../firebase.service/user.service';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, MatCardModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
})
export class MainHeaderComponent {

  constructor(private customDialogService: CustomDialogService, public userService: UserService) {

  }

  openLogOutDialog(button: HTMLElement) {
    const component = LogOutDialogComponent;
    this.customDialogService.openDialogAbsolute(button, component, 'right');
  }

}
