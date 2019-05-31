import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from './modal-data.interface';

@Component({
  selector: 'app-open-dialog.component',
  templateUrl: './open-dialog.component.html',
  styles: []
})
export class OpenDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OpenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
