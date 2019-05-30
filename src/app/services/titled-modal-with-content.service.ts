import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TitledModalWithContentComponent } from '../titled-modal-with-content/titled-modal-with-content.component';
import { ModalData } from '../titled-modal-with-content/modal-data.interface';

@Injectable({
  providedIn: 'root'
})
export class TitledModalWithContentService {
  dialogRef: MatDialogRef<TitledModalWithContentComponent>;
  constructor(
    private dialog: MatDialog
  ) { }

  open(data: ModalData): MatDialogRef<TitledModalWithContentComponent> {
    this.dialogRef = this.dialog.open(TitledModalWithContentComponent, {
      width: '50%',
      data: data
    });
    return this.dialogRef;
  }
}
