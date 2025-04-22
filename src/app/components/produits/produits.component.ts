import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produits',
  imports: [CommonModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent {
  produits: {
    nom: string;
    description: string;
    prix: number;
    imgUrl: string;
  }[];

  constructor() {
    this.produits = [
      {
        nom: "Casque Bluetooth",
        description: "Un casque Bluetooth",
        prix: 200,
        imgUrl: "assets/images/headphone.webp"
      },
      {
        nom: "IPhone 18 Pro",
        description: "Un téléphone",
        prix: 2000,
        imgUrl: "assets/images/iphone.webp"
      },
      {
        nom: "Termos",
        description: "Un termos",
        prix: 2000,
        imgUrl: "assets/images/termos.jpg"
      },
      {
        nom: "Ordi",
        description: "Un ordinateur portable",
        prix: 2000,
        imgUrl: "assets/images/ordibrousse.jpg"
      },
      {
        nom: "Ordinateur",
        description: "Un ordinateur portable",
        prix: 2000,
        imgUrl: "assets/images/ordietpomme.jpg"
      },
      {
        nom: "Casque Bluetooth",
        description: "Un casque Bluetooth",
        prix: 200,
        imgUrl: "assets/images/headphone.webp"
      },
      {
        nom: "IPhone 18 Pro",
        description: "Un téléphone",
        prix: 2000,
        imgUrl: "assets/images/iphone.webp"
      },
      {
        nom: "Ordi",
        description: "Un ordinateur portable",
        prix: 2000,
        imgUrl: "assets/images/ordibrousse.jpg"
      },
      {
        nom: "Ordinateur",
        description: "Un ordinateur portable",
        prix: 2000,
        imgUrl: "assets/images/ordietpomme.jpg"
      }

    ]
    // this.produits = ["PC Asus", "Imprimante Epson", "Tablette Samsung"]
  }
}
