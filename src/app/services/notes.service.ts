import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v3Api, query_body } from '../entities/v3api'
import { Note } from '../entities/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  notes: Note[]
  note: Note

  getOneNote(customer_id, noteId): Observable<Note> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      "x-vts-auth": localStorage.getItem("jwt")
    });

    const url = v3Api.get_item + "?SK=" + noteId + "&PK=" + customer_id;

    return this.http.get<Note>(url, { headers: httpHeaders }).pipe(
      map((res) => {
        this.note = res;
        return this.note;
      })
    )
  }

  getNotesByStatus(status: string): Observable<Note[]> {
      const httpHeaders: HttpHeaders = new HttpHeaders({
        "x-vts-auth": localStorage.getItem("jwt")
      });

      class expression_values {
        status: string;
      }

      let req = new query_body();
      let values = new expression_values();

      values.status = status;

      req.expression = "GSI1PK = :status";
      req.key_name = "GSI1PK";
      req.expression_values = values;

      return this.http.post<Note[]>(v3Api.query, JSON.stringify(req), { headers: httpHeaders }).pipe(
        map((res) => {
          this.notes = res;
          return this.notes;
        })
      )

  }


}
