import { Routes } from '@angular/router';
import { ProduitsComponent } from './components/produits/produits.component';
import { AddProduitComponent } from './components/add-produit/add-produit.component';
import { EditProduitComponent } from './components/edit-produit/edit-produit.component';

export const routes: Routes = [
    {path: "produits", component : ProduitsComponent},
    {path: "add-produit", component: AddProduitComponent},
    {path: "edit-produit/:id", component: EditProduitComponent},
    {path: "", redirectTo: "produits", pathMatch: "full"}
];
