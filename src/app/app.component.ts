import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from './core/error-dialog/error-dialog.component';
import { IMessage } from './shared/services/message/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})


export class AppComponent implements OnInit {
  private message: IMessage;
  constructor(private store: Store<any>, public dialog: MatDialog) { }
  ngOnInit() {
    // console.log(this.store)
    this.store.pipe(select(state => state.app)).subscribe(
      app => {
        if (app) {
          this.message = app.app.showMessage;
          this.openDialog();
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: { dialogText: this.message }
    });
  }
}
