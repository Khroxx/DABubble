import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MainMenuHeaderComponent } from './main-menu-header/main-menu-header.component';
import { MainMenuDmComponent } from './main-menu-dm/main-menu-dm.component';
import { ChannelFirebaseService } from '../../firebase.service/channelFirebase.service';
import { SharedService } from '../../services/shared.service';
import { MainMenuChannelsComponent } from './main-menu-channels/main-menu-channels.component';

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

  constructor(public channelService: ChannelFirebaseService, public sharedService: SharedService) {
    
  }

  ngOnInit(): void {
    // this.sharedService.backToChannels$.subscribe(() => {
    //   this.isMenuOpen = true;
    // });
    // this.sharedService.isMenuOpen$.subscribe((isOpen) => {
    //   this.isMenuOpen = isOpen;
    // });
  }

  // toggleMenu(): void {
    //opens smoothly and gives channel + thread the remaining space
    // this.sharedService.isMenuOpen$.next(this.isMenuOpen);
    // const menuElement = document.getElementById('menu-none');
    // if (this.isMenuOpen) {
    //   this.isMenuOpen = false;
    //   setTimeout(() => {
    //     if (menuElement) {
    //       menuElement.style.display = 'none';
    //     }
    //   }, 500);
    // } else {
    //   if (menuElement) {
    //     menuElement.style.display = 'block';
    //   }
    //   setTimeout(() => {
    //     this.isMenuOpen = true;
    //   }, 100);
      
    // }

  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: { target: { innerWidth: number; }; }) {
  //   if (event.target.innerWidth < 1024) {
  //     this.isMenuOpen = true;
    //   if (this.isMenuOpen) {
    //   this.toggleMenu();
    //   }
    // } else {
    //   const menuElement = document.getElementById('menu-none');
    //   if (menuElement) {
    //     menuElement.style.display = 'block';
    //   }
    //   setTimeout(() => {
    //     this.isMenuOpen = true;
    //   }, 100);
      
  //   }
  // }
}