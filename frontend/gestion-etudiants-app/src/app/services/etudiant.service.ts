import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiUrl = 'http://localhost:3000/api/etudiants';

  constructor(private http: HttpClient) { }

  // Récupérer tous les étudiants
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Rechercher des étudiants
  searchEtudiants(query: string): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Récupérer un étudiant par ID
  getEtudiant(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Ajouter un nouvel étudiant
  addEtudiant(etudiant: Etudiant): Observable<any> {
    return this.http.post(this.apiUrl, etudiant)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Modifier un étudiant
  updateEtudiant(id: number, etudiant: Etudiant): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, etudiant)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Supprimer un étudiant
  deleteEtudiant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else {
        errorMessage = `Code d'erreur: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 