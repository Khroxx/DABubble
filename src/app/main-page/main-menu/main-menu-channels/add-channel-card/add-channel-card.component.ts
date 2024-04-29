import { Component, OnInit, inject, OnDestroy } from '@angular/core';
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
import { ChannelService } from '../../../../services/channel.service';
import { ChannelFirebaseService } from '../../../../firebase.service/channelFirebase.service';
import { Channel } from '../../../../interfaces/channel.interface';
import { ChannelTypeEnum } from '../../../../shared/enums/channel-type.enum';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  ],
  templateUrl: './add-channel-card.component.html',
  styleUrl: './add-channel-card.component.scss',
})
export class AddChannelCardComponent implements OnInit, OnDestroy {
  // channelService = inject(ChannelService);
  // channelFirebaseService = inject(ChannelFirebaseService);
  // private subscription?: Subscription;

  channel: Channel = {
    name: '',
    description: '',
    created_at: Date.now(),
    creator: 'user_id',
    members: ['user_id'],
    active_members: ['user_id'],
    channel_type: ChannelTypeEnum.main,
  };

  constructor(
    public dialogRef: MatDialogRef<AddChannelCardComponent>,
    public dialog: MatDialog,
    public channelService : ChannelFirebaseService,
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createChannel(): void {
    this.dialogRef.close();
  }
}
