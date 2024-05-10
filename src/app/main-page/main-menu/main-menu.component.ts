import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MainMenuHeaderComponent } from './main-menu-header/main-menu-header.component';
import { MainMenuChannelsComponent } from './main-menu-channels/main-menu-channels.component';
import { MainMenuDmComponent } from './main-menu-dm/main-menu-dm.component';
import { ChannelFirebaseService } from '../../firebase.service/channelFirebase.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MainMenuHeaderComponent,
    MainMenuChannelsComponent,
    MainMenuDmComponent,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements OnInit {
  isMenuOpen: boolean = true;


  constructor(public channelService: ChannelFirebaseService) {}

  ngOnInit(): void {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
