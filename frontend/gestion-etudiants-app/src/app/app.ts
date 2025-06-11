import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, EtudiantListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Gestion des Étudiants';
}
