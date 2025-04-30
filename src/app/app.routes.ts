import { Routes } from '@angular/router';
import { ProduitsComponent } from './components/produits/produits.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';

export const routes: Routes = [
    {path: "produits", component : ProduitsComponent},
    {path: "add-produit", component: AddProduitComponent},
    {path: "", redirectTo: "produits", pathMatch: "full"}
];
