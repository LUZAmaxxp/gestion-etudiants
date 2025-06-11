import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Etudiant } from '../../models/etudiant.model';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit {
  etudiants: Etudiant[] = [];
  filteredEtudiants: Etudiant[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  error: string = '';
  success: string = '';
  showForm: boolean = false;
  editingEtudiant: Etudiant | null = null;
  isEditing: boolean = false;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private etudiantService: EtudiantService) { }

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.loading = true;
    this.error = '';
    
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filteredEtudiants = [...this.etudiants];
        this.calculatePagination();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  searchEtudiants(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEtudiants = [...this.etudiants];
      this.currentPage = 1;
      this.calculatePagination();
      return;
    }

    this.loading = true;
    this.etudiantService.searchEtudiants(this.searchTerm).subscribe({
      next: (data) => {
        this.filteredEtudiants = data;
        this.currentPage = 1;
        this.calculatePagination();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadEtudiants();
  }

  addEtudiant(): void {
    this.editingEtudiant = {
      nom: '',
      prenom: '',
      email: '',
      tel: '',
      date_naissance: '',
      filiere: ''
    };
    this.isEditing = false;
    this.showForm = true;
    this.error = '';
    this.success = '';
  }

  editEtudiant(etudiant: Etudiant): void {
    this.editingEtudiant = { ...etudiant };
    this.isEditing = true;
    this.showForm = true;
    this.error = '';
    this.success = '';
  }

  deleteEtudiant(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe({
        next: () => {
          this.success = 'Étudiant supprimé avec succès';
          this.loadEtudiants();
          setTimeout(() => this.success = '', 3000);
        },
        error: (error) => {
          this.error = error.message;
          setTimeout(() => this.error = '', 5000);
        }
      });
    }
  }

  saveEtudiant(etudiant: Etudiant): void {
    if (this.isEditing && etudiant.id) {
      this.etudiantService.updateEtudiant(etudiant.id, etudiant).subscribe({
        next: () => {
          this.success = 'Étudiant modifié avec succès';
          this.showForm = false;
          this.loadEtudiants();
          setTimeout(() => this.success = '', 3000);
        },
        error: (error) => {
          this.error = error.message;
          setTimeout(() => this.error = '', 5000);
        }
      });
    } else {
      this.etudiantService.addEtudiant(etudiant).subscribe({
        next: () => {
          this.success = 'Étudiant ajouté avec succès';
          this.showForm = false;
          this.loadEtudiants();
          setTimeout(() => this.success = '', 3000);
        },
        error: (error) => {
          this.error = error.message;
          setTimeout(() => this.error = '', 5000);
        }
      });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingEtudiant = null;
    this.isEditing = false;
    this.error = '';
  }

  // Pagination
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEtudiants.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages || 1;
    }
  }

  get paginatedEtudiants(): Etudiant[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEtudiants.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
} 