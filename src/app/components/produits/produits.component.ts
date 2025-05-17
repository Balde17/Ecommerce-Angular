import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

  // Mapping des noms de produits vers leurs images
  private imageMap: { [key: string]: string } = {
    'Casque Bluetooth': 'assets/images/headphone.webp',
    'IPhone 18 Pro': 'assets/images/iphone.webp',
    'Termos': 'assets/images/termos.jpg',
    'Ordi': 'assets/images/ordibrousse.jpg',
    'Ordinateur': 'assets/images/ordietpomme.jpg'
  };

  constructor(private productService: ProductService) {}

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

  getImageUrl(productName: string): string {
    return `assets/images/${productName}` || 'assets/images/default-product.jpg';
  }
}
