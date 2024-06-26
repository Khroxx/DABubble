import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Channel } from '../interfaces/channel.interface';
import { Message } from '../interfaces/message.interface';
import { UserService } from '../firebase.service/user.service';
import { ChannelService } from '../firebase.service/channel.service';
import { MessageService } from '../firebase.service/message.service';
import { ChannelTypeEnum } from '../shared/enums/channel-type.enum';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private userSelectedSubject = new Subject<void>();
  userSelected$ = this.userSelectedSubject.asObservable();

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private messageService: MessageService
  ) { }


  userSelected() {
    this.userSelectedSubject.next();
  }


  applyFilters(searchTerm: string): {
    users: User[];
    channels: Channel[];
    messages: Message[];
  } {
    return {
      users: this.filterUsers(searchTerm, this.userService.allUsers),
      channels: this.filterChannels(searchTerm, this.channelService.channels),
      messages: this.filterMessages(searchTerm, this.messageService.allMessages),
    };
  }


  clearFilters(): { users: User[]; channels: Channel[]; messages: Message[] } {
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
    let filteredMessages = messages.filter((message) => { 
      let convertedText = this.convertUserIdTagIntoUserName(message.message.text);
      if (
        convertedText.toLowerCase().includes(lowerCaseTerm) &&
        (this.channelExists(message.channel_id, this.channelService.channels) ||
        (message.thread_id && this.threadExists(message.thread_id, this.channelService.channels)))) 
      { return true;}
      else { return false}}
    );
    return filteredMessages;
  }


  channelExists(channelId: string, channels: Channel[]): boolean {
    return channels.some(channel => channel.id === channelId);
  }


  threadExists(threadId: string, threads: Channel[]): boolean {
    return threads.some(thread => thread.id === threadId);
  }


  filterUsersByPrefix(prefix: string, users: User[]): User[] {
    const lowerCaseTerm = this.searchTerm(prefix.slice(1));
    return users.filter((user) =>
      user.name
        .split(' ')
        .some((part: string) => part.toLowerCase().startsWith(lowerCaseTerm))
    );
  }


  filterChannelsByTypeAndPrefix(
    prefix: string,
    channelType: ChannelTypeEnum
  ): Channel[] {
    const lowerCaseTerm = this.searchTerm(prefix.slice(1));
    return this.channelService.channels.filter(
      (channel) =>
        channel.channel_type === channelType &&
        channel.name
          .split(' ')
          .some((part: string) => part.toLowerCase().startsWith(lowerCaseTerm))
    );
  }

  convertUserIdTagIntoUserName(text: string) {
    let convertedText = text;
    this.userService.allUsers.forEach(user => {
      const regex = new RegExp(`@${user.id}`, 'g');
      convertedText = convertedText.replace(regex, `@${user.name}`);
    });
    return convertedText;
  }
}
