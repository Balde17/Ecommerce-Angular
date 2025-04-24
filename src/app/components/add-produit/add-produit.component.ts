import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-produit',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent {
  produitForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.produitForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [null, [Validators.required, Validators.min(0)]],
      quantite: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.produitForm.valid) {
      console.log("Produit ajouté", this.produitForm.value);

      this.produitForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
