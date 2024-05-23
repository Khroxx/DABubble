import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MainMenuHeaderComponent } from './main-menu-header/main-menu-header.component';
import { MainMenuDmComponent } from './main-menu-dm/main-menu-dm.component';
import { ChannelFirebaseService } from '../../firebase.service/channelFirebase.service';
import { SharedService } from '../../services/shared.service';
import { MainMenuChannelsComponent } from './main-menu-channels/main-menu-channels.component';
import { UserService } from '../../firebase.service/user.service';
import { Router } from '@angular/router';
import { Channel } from '../../interfaces/channel.interface';
import { ChannelTypeEnum } from '../../shared/enums/channel-type.enum';
import { MainPageComponent } from '../main-page.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MainMenuHeaderComponent,
    MainMenuDmComponent,
    MainMenuChannelsComponent
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent{
  isMenuOpen: boolean = true;
  constructor(public channelService: ChannelFirebaseService, 
    public sharedService: SharedService,
  public userService: UserService,
public router: Router,
public mainPage: MainPageComponent) { }
    
  

  ngOnInit(): void {
  }

  // Erstellt über Servername Devspace einen channel mit type 'new'
  openNewChannel(){
    const newChannel: Channel = {
        id: '',
        name: '',
        description: '',
        created_at: 0,
        creator: this.userService.currentUser.id,
        members: [this.userService.currentUser.id],
        active_members: [this.userService.currentUser.id],
        channel_type: ChannelTypeEnum.new,
    };
    this.sharedService.backToChannels();
    this.sharedService.showMobileDiv();
    this.channelService.addChannel(newChannel).then(channelId => {
      newChannel.id = channelId;
      this.userService.updateLastChannel(this.userService.currentUser.id, channelId); 
      localStorage.setItem('currentUser', JSON.stringify(this.userService.currentUser));
      this.router.navigate(['/main-page/', channelId]); 
    });

  }
}