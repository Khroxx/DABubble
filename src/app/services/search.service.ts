import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Channel } from '../interfaces/channel.interface';
import { Message } from '../interfaces/message.interface';
import { UserService } from '../firebase.service/user.service';
import { ChannelFirebaseService } from '../firebase.service/channelFirebase.service';
import { MessageService } from '../firebase.service/message.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private userService: UserService, private channelService: ChannelFirebaseService, private messageService: MessageService ) {}

  applyFilters(searchTerm: string): { users: User[], channels: Channel[], messages: Message[] } {
    return {
      users: this.filterUsers(searchTerm, this.userService.allUsers),
      channels: this.filterChannels(searchTerm, this.channelService.channels),
      messages: this.filterMessages(searchTerm, this.messageService.messages),
    };
  }

  clearFilters(): { users: User[], channels: Channel[], messages: Message[] } {
    return {
      users: [],
      channels: [],
      messages: [],
    };
  }

  private searchTerm(searchTerm: string): string {
    return searchTerm.trim().toLowerCase();
  }

  filterUsers(searchTerm: string, users: User[]): User[] {
    const lowerCaseTerm = this.searchTerm(searchTerm);
    return users.filter((user) =>
      user.name
        .split(' ')
        .some((part: string) => part.toLowerCase().startsWith(lowerCaseTerm))
    );
  }

  filterChannels(searchTerm: string, channels: Channel[]): Channel[] {
    const lowerCaseTerm = this.searchTerm(searchTerm);
    return channels.filter((channel) =>
      channel.name
        .split(' ')
        .some((part: string) => part.toLowerCase().startsWith(lowerCaseTerm))
    );
  }

  filterMessages(searchTerm: string, messages: Message[]): Message[] {
    const lowerCaseTerm = this.searchTerm(searchTerm);
    return messages.filter((message) =>
      message.message.text.toLowerCase().includes(lowerCaseTerm)
    );
  }
}
