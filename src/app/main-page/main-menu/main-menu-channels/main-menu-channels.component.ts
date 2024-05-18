import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddChannelCardComponent } from './add-channel-card/add-channel-card.component';
import { CustomDialogService } from '../../../services/custom-dialog.service';
import { ChannelFirebaseService } from '../../../firebase.service/channelFirebase.service';
import { ChannelTypeEnum } from '../../../shared/enums/channel-type.enum';
import { Channel } from '../../../interfaces/channel.interface';
import { ChannelComponent } from '../../channel/channel.component';
import { MessageService } from '../../../firebase.service/message.service';
import { UserService } from '../../../firebase.service/user.service';
import { Router, RouterModule } from '@angular/router';
import { Message } from '../../../interfaces/message.interface';
import { ThreadService } from '../../../services/thread.service';
import { MainMenuComponent } from '../main-menu.component';
import { MainHeaderComponent } from '../../main-header/main-header.component';
import { SharedService } from '../../../firebase.service/shared.service';

@Component({
  selector: 'app-main-menu-channels',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatExpansionModule, RouterModule],
  templateUrl: './main-menu-channels.component.html',
  styleUrl: './main-menu-channels.component.scss',
})
export class MainMenuChannelsComponent implements OnInit {

  isExpanded: boolean = true;

  constructor(
    private customDialogService: CustomDialogService,
    public channelService: ChannelFirebaseService,
    public messageService: MessageService,
    public userService: UserService,
    public router: Router,
    public threadService : ThreadService,
    public mainmenu: MainMenuComponent,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {}


  mobileChange() {
    this.mainmenu.toggleMenu();
    this.sharedService.showMobileDiv();
  }

  toggleExpansion(): void {
    this.isExpanded = !this.isExpanded;
  }

  openAddChannelDialog(): void {
    const component = AddChannelCardComponent;
    this.customDialogService.openDialog(component);
  }

  closeThread() {
    this.userService.saveLastThread(this.userService.currentUser.id, '');
    this.threadService.closeThread();
  }
  
}
