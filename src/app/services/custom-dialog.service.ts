import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class CustomDialogService {
  dialogRef: MatDialogRef<any> | null = null;

  constructor(public dialog: MatDialog) {
  }

  public openDialog(dialogComponent : ComponentType<any>) : MatDialogRef<any> {
    return this.dialog.open(dialogComponent, {
      panelClass: 'custom-dialog',
    });
  }

  public openDialogAbsolute(button: HTMLElement,dialogComponent : ComponentType<any>, position: 'left' | 'right') {
    const rect = button.getBoundingClientRect();
    let isMobile = window.innerWidth <= 768;
    if (position == 'left') {
      this.dialogRef = this.dialog.open(dialogComponent, {
        panelClass: 'custom-dialog-anchorTopLeft',
        position: {
          top: isMobile ? 'unset' : rect.bottom + 'px',
          left: isMobile ? 'unset' : rect.left + 'px',
        },
      });
    }
    if (position == 'right') {
      this.dialogRef = this.dialog.open(dialogComponent, {
        panelClass: 'custom-dialog-anchorTopRight',
        position: {
          top: isMobile ? 'unset' : rect.bottom + 'px',
          left: isMobile ? 'unset' : rect.right + 'px',
        },
      });
    }
    if (this.dialogRef) {
      window.addEventListener('resize', () =>
        this.updateDialogPosition(button)
      );
    }
  }

  // Funktion zum Aktualisieren der Dialogposition
  updateDialogPosition(button: HTMLElement): void {
    if (this.dialogRef) {
      const rect = button.getBoundingClientRect();
      this.dialogRef.updatePosition({
        top: rect.bottom + 'px',
        left: rect.right + 'px',
      });
    }
  }
}
