import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Message } from '../../../../interfaces/message.interface';
import { CursorPositionService } from '../../../../services/cursor-position.service';
import { PopupSearchComponent } from '../../../../shared/popup-search/popup-search.component';
import { OpenProfileDirective } from '../../../../shared/directives/open-profile.directive';
import { DialogEmojiPickerComponent } from '../../dialog-emoji-picker/dialog-emoji-picker.component';
import { CustomDialogService } from '../../../../services/custom-dialog.service';
import { MessageService } from '../../../../firebase.service/message.service';
import { TagToComponentDirective } from '../../../../shared/directives/tag-to-component.directive';

@Component({
  selector: 'app-edit-message',
  standalone: true,
  imports: [
    CommonModule,
    PopupSearchComponent,
    OpenProfileDirective,
    TagToComponentDirective
  ],
  templateUrl: './edit-message.component.html',
  styleUrl: './edit-message.component.scss',
})
export class EditMessageComponent {
  @Output() closeEditEvent: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('channelInput', { static: true }) channelInput!: ElementRef;
  @ViewChild('channelInput', { read: ViewContainerRef, static: true }) channelInputViewRef!: ViewContainerRef;
  @Input() channelType: 'main' | 'direct' | 'thread' | 'new' = 'main';
  @Input() message: Message = {
    user_id: '',
    channel_id: '',
    thread_id: '',
    message: {
      text: '',
      reactions: [],
      attachements: [],
    },
    created_at: 0,
    modified_at: 0,
    is_deleted: false,
    total_replies: 0,
    last_reply: 0,
  };
  editableMessage = JSON.parse(JSON.stringify(this.message));
  tagText: string = '';

  constructor(
    public messageService: MessageService,
    public customDialogService: CustomDialogService,
    // private renderer: Renderer2,
    public cursorPositionService: CursorPositionService,
    private elementRef: ElementRef,
  ) {}

  isSmallWidth() {
    return this.elementRef.nativeElement.offsetWidth <= 600;
  }

  ngOnInit() {
    this.editableMessage = JSON.parse(JSON.stringify(this.message));
  }

  get channelInputElement(): ElementRef {
    return this.channelInput;
  }

  //#region update message
  updateMessage(channelInput: HTMLDivElement) {
    this.editableMessage.modified_at = new Date().getTime();
    channelInput.innerHTML = this.formatMessageForSave(channelInput.innerHTML);
    this.editableMessage.message.text = channelInput.innerText;
    this.messageService.updateMessage(this.editableMessage);
    this.closeEdit();
  }

  closeEdit() {
    this.closeEditEvent.emit();
  }

  formatTagForSave(text : string) {
    const regex = new RegExp(/<app-profile-button[^>]*><button[^>]*ng-reflect-user-id="([^"]+)"[^>]*>[^<]*<\/button><\/app-profile-button>/g)
    const formattedText = text.replace(regex, '@$1');
    return formattedText;
  }

  formatMessageForSave(text : string) {
    let formattedText = this.formatTagForSave(text);
    return formattedText;
  }

  //#endregion

  //#region emoji picker
  openDialogEmojiPicker(input: HTMLDivElement) {
    const component = DialogEmojiPickerComponent;
    const dialogRef = this.customDialogService.openDialog(component);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addEmoji(input, result);
      }
    });
  }


  addEmoji(input : HTMLElement, result : any) {
    if(document.activeElement !== input)  this.setFocusAtTextEnd(input);
    this.insertAtCursor(result, input);
  }

  setFocusAtTextEnd(input : HTMLElement) {
    input.focus();
    var range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    var selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      this.cursorPositionService.setLastCursorPosition(input);
    }
  }


  insertAtCursor(text: string, input: HTMLElement) {
    const sel = window.getSelection();
    const range = this.cursorPositionService.restoreCursorPosition(input);  
    if (sel && range) {
        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    this.setSelectionPosition(input);
  }
  //#endregion emoji picker

  //#region  @/# Tag System 
  checkForTag(element: HTMLElement) {
    const text = this.getTextWithLineBreaks(element);
    const cursorPosition = this.setSelectionPosition(element);
    const textBeforeCursor = text.slice(0, cursorPosition);
    const charBeforeCursor = textBeforeCursor[cursorPosition - 1];
    this.tagText = '';
    if (charBeforeCursor && !/\s/.test(charBeforeCursor)) {
      const atIndex = textBeforeCursor.lastIndexOf('@');
      if (atIndex !== -1) {
        const charAfterAt = textBeforeCursor[atIndex + 1];
        if (!charAfterAt?.match(/\s/)) {
          this.tagText = textBeforeCursor.slice(atIndex);
        }
      }
    }
  }

  getTextWithLineBreaks(input : HTMLElement): string {
    return input.innerHTML
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?p>/gi, '\n')
    .replace(/<\/?div>/gi, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '');
  }

  setSelectionPosition(element: HTMLElement): number {
    return this.cursorPositionService.saveCursorPosition(element);
  }
  


  handleKeyDown(event: KeyboardEvent, element: HTMLDivElement) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const curRange = selection.getRangeAt(selection.rangeCount - 1);
      if (curRange.commonAncestorContainer.nodeType == 3 && curRange.startOffset > 0) return; // we are in child selection. The characters of the text node is being deleted
      // if (event.key === 'Backspace') this.handleBackSpace(selection, element, event);
      if (event.key === 'Enter' && !event.shiftKey) this.handleEnter(event, element);
    }
  }

  // handleBackSpace(selection : Selection, element : HTMLDivElement, event: Event) {
  //   const range = document.createRange();
  //   if (selection.anchorNode && selection.anchorNode != element) { // selection is in character mode. expand it to the whole editable field
  //       range.selectNodeContents(element);
  //       range.setEndBefore(selection.anchorNode);
  //   } else if (selection.anchorOffset > 0) range.setEnd(element, selection.anchorOffset);
  //   else return; // reached the beginning of editable field
  //   range.setStart(element, range.endOffset == 0 ? 0 : range.endOffset - 1);
  //   const previousNode = range.cloneContents().lastChild;
  //   if (previousNode && previousNode.nodeType == Node.ELEMENT_NODE) {
  //     const previousElement = previousNode as HTMLElement;
  //     if (previousElement.contentEditable === 'false') {  // This is some rich content, e.g. smiley. We should help the user to delete it.
  //       range.deleteContents();
  //       event.preventDefault();
  //     }
  //   }
  // }

  handleEnter(event: Event, element : HTMLDivElement) {
    event.preventDefault();
    this.updateMessage(element);
  }


  // @HostListener('document:click', ['$event'])
  // public onDocumentClick(event: MouseEvent): void {
  //   if (!this.elementRef.nativeElement.contains(event.target)) {
  //     this.closeEdit();
  //   }
  // }
  //#endregion
}
