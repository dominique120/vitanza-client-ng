import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { NotesService } from 'src/app/services/notes.service';
import { faEdit, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/entities/customer';
import { Note } from 'src/app/entities/note';

declare var $: any;

@Component({
  selector: 'app-open-notes',
  templateUrl: './open-notes.component.html',
  styleUrls: ['./open-notes.component.css']
})
export class OpenNotesComponent implements OnInit {

  constructor(private customer_svc: CustomersService, private notes_svc: NotesService) { }

  faEdit = faEdit;
  faTimes = faTimes;
  faInfo = faInfo;

  customer: Customer;
  notes: Note[];
  note: Note;

  ngOnInit(): void {
    this.getOpenNotes();
  }

  getOpenNotes() {
    this.notes_svc.getNotesByStatus("OPEN").subscribe(
      (res: Note[]) => {
        this.notes = res;
      }
    );
  }

  getCustomer(customerId): void {
    this.customer_svc.selectOneCustomer(customerId).subscribe(
      (res: Customer) => {
        this.customer = res;
      }
    );
    $("#notesCustomerModal").modal('show');
  }

  getNoteDetails(customerId, noteId): void {
    this.notes_svc.getOneNote(customerId, noteId).subscribe(
      (res: Note) => {
        this.note = res;
      }
    );
    $("#noteDetailsModal").modal('show');
  }

}
