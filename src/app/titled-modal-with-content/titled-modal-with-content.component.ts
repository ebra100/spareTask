import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalData } from './modal-data.interface';

@Component({
  selector: 'app-titled-modal-with-content',
  templateUrl: './titled-modal-with-content.component.html',
  styles: []
})
export class TitledModalWithContentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TitledModalWithContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
