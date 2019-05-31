import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalData } from '../OpenDialogt/modal-data.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenDialog {

  constructor(
    private dialog: MatDialog
  ) { }

  open(data: ModalData){
   return this.dialog.open(data.component, {
      width: '30%',
      data: data
    });
  }
}
