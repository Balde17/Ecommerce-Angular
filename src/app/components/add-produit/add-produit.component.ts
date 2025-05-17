import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent {
  produitForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.produitForm.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      this.productService.createProduct(this.produitForm.value).subscribe({
        next: (response) => {
          this.success = 'Produit ajouté avec succès !';
          this.loading = false;
          this.produitForm.reset();
          // Redirection après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/produits']);
          }, 2000);
        },
        error: (error) => {
          this.error = 'Erreur lors de l\'ajout du produit';
          this.loading = false;
          console.error('Erreur:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.produitForm);
    }
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters pour faciliter l'accès aux champs du formulaire
  get name() { return this.produitForm.get('name'); }
  get description() { return this.produitForm.get('description'); }
  get imageUrl() { return this.produitForm.get('imageUrl'); }
  get price() { return this.produitForm.get('price'); }
}

