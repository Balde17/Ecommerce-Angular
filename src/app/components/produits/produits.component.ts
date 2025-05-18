import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {
  produits: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.produits = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erreur lors du chargement des produits';
        this.loading = false;
        console.error('Erreur:', error);
      }
    });
  }

  deleteProduct(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.produits = this.produits.filter(p => p.id !== id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }

  editProduct(product: Product) {
    this.router.navigate(['/edit-produit', product.id]);
  }

  getImageUrl(productName: string): string {
    return `assets/images/${productName}` || 'assets/images/default-product.jpg';
  }
}
