import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursorPositionService {

  lastCursorPosition : number = 0;
  lastElement : any;

  constructor() { }

  setLastCursorPosition(container: HTMLElement) {
    this.lastCursorPosition = this.saveCursorPosition(container);
    // this.lastELemet = container;
  }

  // Funktion zum Speichern der Position innerhalb eines Containers
  saveCursorPosition(container: HTMLElement): number {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return 0;
    }
  
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(container);
    preCaretRange.setEnd(range.startContainer, range.startOffset);
  
    const preCaretText = preCaretRange.toString();
    this.lastElement = container;
    this.lastCursorPosition = preCaretText.length;
  
    return this.lastCursorPosition;
  }

// Funktion zum Wiederherstellen der Position innerhalb eines Containers
restoreCursorPosition(container: HTMLElement): Range | null {
  if (!this.lastElement || this.lastCursorPosition == null) {
    console.error('No valid last element or cursor position found.');
    return null;
  }

  const range = document.createRange();
  const selection = window.getSelection();
  if (!selection) {
    return null;
  }

  const textContent = container.innerText;
  let charIndex = 0;
  let nodeStack: Node[] = [container];
  let node: Node | undefined;

  while ((node = nodeStack.pop()) != undefined) {
    if (node.nodeType === Node.TEXT_NODE) {
      const nextCharIndex = charIndex + node.textContent!.length;
      if (this.lastCursorPosition <= nextCharIndex) {
        range.setStart(node, this.lastCursorPosition - charIndex);
        break;
      }
      charIndex = nextCharIndex;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        nodeStack.push(node.childNodes[i]);
      }
    }
  }

  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);

  return range;
}
}
