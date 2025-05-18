import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-edit-produit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-produit.component.html',
  styleUrl: './edit-produit.component.css'
})
export class EditProduitComponent implements OnInit {
  produitForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  produit: Product | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: number) {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.produit = product;
        this.produitForm.patchValue(product);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement du produit';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  onSubmit() {
    if (this.produitForm.valid && this.produit) {
      this.loading = true;
      this.error = null;
      this.success = null;

      this.productService.updateProduct(this.produit.id, this.produitForm.value).subscribe({
        next: (response) => {
          this.success = 'Produit modifié avec succès !';
          this.loading = false;
          // Redirection après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/produits']);
          }, 2000);
        },
        error: (error) => {
          this.error = 'Erreur lors de la modification du produit';
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

  // Getters pour accéder facilement aux contrôles du formulaire
  get name() { return this.produitForm.get('name'); }
  get description() { return this.produitForm.get('description'); }
  get imageUrl() { return this.produitForm.get('imageUrl'); }
  get price() { return this.produitForm.get('price'); }

  // Méthode publique pour la navigation
  navigateToProducts() {
    this.router.navigate(['/produits']);
  }
}
