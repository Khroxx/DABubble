import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { ChannelFirebaseService } from '../../../../firebase.service/channelFirebase.service';
import { Channel } from '../../../../interfaces/channel.interface';
import { ChannelTypeEnum } from '../../../../shared/enums/channel-type.enum';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../firebase.service/user.service';
import { CustomDialogService } from '../../../../services/custom-dialog.service';
import { AddMemberCardComponent } from '../add-member-card/add-member-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-channel-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-channel-card.component.html',
  styleUrl: './add-channel-card.component.scss',
})
export class AddChannelCardComponent implements OnInit, OnDestroy {
  duplicateName = false;
  channel: Channel = {
    id: '',
    name: '',
    description: '',
    created_at: Date.now(),
    creator: this.userService.currentUser.id,
    members: [this.userService.currentUser.id],
    active_members: [],
    channel_type: ChannelTypeEnum.main,
  };

  constructor(
    public dialogRef: MatDialogRef<AddChannelCardComponent>,
    public dialog: MatDialog,
    public channelService : ChannelFirebaseService,
    public userService : UserService,
    public customDialogService: CustomDialogService,
    public router: Router
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  // async createChannel(button: HTMLElement): Promise<void> {
  //   try {
  //     const channelId = await this.channelService.addChannel(this.channel);
  
  //     this.channelService.setCurrentChannel(channelId);
  //     // console.log('Channel created and set as currentChannel', this.channelService.currentChannel);
  
  //     this.dialogRef.close();
  //     this.openAddUserDialog(button);
  //   } catch (error) {
  //     console.error('Fehler beim Erstellen des Channels:', error);
  //   }
  // }

  async createChannel(button: HTMLElement): Promise<void> {
    try {
      // const allChannels = await this.channelService.getAllChannels();
  
      const isDuplicate = this.channelService.channels.some(channel => channel.name === this.channel.name);
      if (isDuplicate) {
        this.duplicateName = true;
        // warum werden alle channel geladen
      } else {
      const channelId = await this.channelService.addChannel(this.channel);
      this.channelService.setCurrentChannel(channelId);
      this.router.navigate(['/main-page', channelId]);
      // console.log('Channel created and set as currentChannel', this.channelService.currentChannel);

      this.dialogRef.close();
      this.openAddUserDialog(button);
      }
    } catch (error) {
      console.error('Fehler beim Erstellen des Channels:', error);
    }
  }
  
  openAddUserDialog(button: HTMLElement): void {
    const component = AddMemberCardComponent;
    this.customDialogService.openDialogAbsolute({button, component, position : 'mid', mobilePosition: 'bottom', maxWidth : '554px'});
  }
}
