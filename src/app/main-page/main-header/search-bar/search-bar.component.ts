import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../firebase.service/user.service';
import { User } from '../../../interfaces/user.interface';
import { ChannelFirebaseService } from '../../../firebase.service/channelFirebase.service';
import { Channel } from '../../../interfaces/channel.interface';
import { MessageService } from '../../../firebase.service/message.service';
import { Message } from '../../../interfaces/message.interface';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ChannelTypeEnum } from '../../../shared/enums/channel-type.enum';
import { SearchService } from '../../../services/search.service';
import { OpenProfileDirective } from '../../../shared/directives/open-profile.directive';
import { Router, RouterModule } from '@angular/router';
import { ThreadService } from '../../../services/thread.service';
import { UtilityService } from '../../../services/utility.service';
import { TagToComponentDirective } from '../../../shared/directives/tag-to-component.directive';
// import { threadId } from 'node:worker_threads';
import { MainPageComponent } from '../../main-page.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    OpenProfileDirective,
    RouterModule,
    TagToComponentDirective
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  filteredUsers: User[] = [];
  filteredChannels: Channel[] = [];
  filteredMessages: Message[] = [];
  searchControl = new FormControl();
  private subscriptions = new Subscription();
  newDirectChannel: Channel = {
    id: '',
    name: 'Direct Channel',
    description: '',
    created_at: new Date().getTime(),
    creator: '',
    members: [],
    active_members: [],
    channel_type: ChannelTypeEnum.direct,
  };

  constructor(
    public userService: UserService,
    public channelService: ChannelFirebaseService,
    public messageService: MessageService,
    public searchService: SearchService,
    public router: Router,
    public threadService: ThreadService,
    public utilityService: UtilityService,
    public viewportScroller: ViewportScroller,
    public mainPage: MainPageComponent
  ) { }


  ngOnInit(): void {
    this.subscriptions.add(
      this.searchControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
          this.filter(value);
        })
    );
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  clearSearch(): void {
    this.searchControl.setValue('');
  }


  filter(searchTerm: string): void {
    if (searchTerm.startsWith('@')) {
      this.searchForUser(searchTerm);
    } else if (searchTerm.startsWith('#')) {
      this.searchForChannel(searchTerm);
    } else if (searchTerm.length > 0) {
      this.searchForAnything(searchTerm);
    } else {
      this.clearFilters();
    }
  }


  clearFilters() {
    const results = this.searchService.clearFilters();
    this.filteredUsers = results.users;
    this.filteredChannels = results.channels;
    this.filteredMessages = results.messages;
  }


  searchForAnything(searchTerm: any) {
    const results = this.searchService.applyFilters(searchTerm);
    this.filteredUsers = results.users;
    this.filteredChannels = this.sortChannels(results.channels);
    this.filteredMessages = this.sortMessages(results.messages);
  }


  searchForUser(searchTerm: any) {
    this.filteredUsers = this.searchService.filterUsersByPrefix(searchTerm, this.userService.allUsers);
    this.filteredChannels = [];
    this.filteredMessages = [];
  }


  searchForChannel(searchTerm: any) {
    this.filteredChannels = this.searchService.filterChannelsByTypeAndPrefix(searchTerm, ChannelTypeEnum.main);
      this.filteredUsers = [];
      this.filteredMessages = [];
  }


  sortMessages(messages: Message[]): Message[] {
    return messages.sort((a, b) => b.created_at - a.created_at);
  }


  sortChannels(channels: Channel[]): Channel[] {
    return channels.sort((a, b) => b.created_at - a.created_at);
  }


  onBlur(): void {
    this.clearSearch();
  }


  displayChannelTime(): string {
    return this.utilityService.getChannelCreationTime();
  }


  displayMessageTime(message: Message): string {
    return this.utilityService.getMessageCreationTime(message);
  }


  closeThread() {
    this.userService.saveLastThread(this.userService.currentUser.id, '');
    this.threadService.closeThread();
  }


  getUserImg(messageId: any) {
    const message = this.messageService.allMessages.find((message) => message.id === messageId);
    const user = this.userService.getUser(message!.user_id);
    return user?.profile_img || 'assets/img/deleted.png';
  }

  
  getUserName(messageId: any) {
    const message = this.messageService.allMessages.find((message) => message.id === messageId);
    const user = this.userService.getUser(message!.user_id);
    return user?.name || 'Deleted User';
  }


  async navigateToMessage(message: Message) {
    if (message.channel_id != '') {
      this.router.navigate(['/main-page', message.channel_id])
      this.messageService.changeMessage(message.id);
    } 
    else if (message.thread_id && message.thread_id != '' && message.channel_id == '') {
      let channelId = this.findChannelIdForThread(message.thread_id);
      await this.userService.saveLastThread(this.userService.currentUser.id, message.thread_id);
      if (window.innerWidth < 1500) {
        this.mainPage.toggleMenu();
      }
      this.router.navigate(['/main-page', channelId]);
      this.threadService.openThread();
      this.messageService.changeMessage(message.id);
    } 
  }

  findChannelIdForThread(threadId : string) {
    let threadMessages = this.messageService.allMessages.filter((message) => message.thread_id == threadId);
    let firstThreadMessage = threadMessages.reduce((earliestMessage, currentMessage) => {
      return !earliestMessage || currentMessage.created_at < earliestMessage.created_at
          ? currentMessage 
          : earliestMessage;
  }, null);
    return firstThreadMessage.channel_id;
  }

  getChannelName(channelId: string) {
    let channel = this.getChannel(channelId);
    if(channel?.channel_type == 'direct') return this.getDirectChannelCounterPart(channelId).name;
    else return channel?.name;
  }

  getChannel(channelId: string) {
    return this.channelService.channels.find((channel) => channel.id === channelId);
  }

  getDirectChannelCounterPart(channelId: string) {
    let directChannel = this.channelService.channels.find((channel) => channel.id === channelId);
    let counterPartId = directChannel?.members.find((member) => member != this.userService.currentUser.id);
    let counterPart = this.userService.allUsers.find((user) => user.id == counterPartId);
    if(counterPart) return counterPart;
    else return this.userService.currentUser; // Personal Channel
  }
}
