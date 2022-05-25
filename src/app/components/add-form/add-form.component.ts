import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  addForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      producer: ['', Validators.required],
      wineName: [''],
      vintage: [''],
      wineType: [''],
      region: [''],
      variety: [''],
      notes: [''],
      storageLocation: [''],
      quantity: ['', Validators.required]
      
    })

  }

  addWine() {
    if (this.addForm.valid) {
      this.api.postWine(this.addForm.value)
        .subscribe({
          next: (res) => {
            alert('Your wine was successfully added.');
            this.addForm.reset();
            this.dialogRef.close('save');
          }, 
          error: () => {
            alert('Sorry, something went wrong.')
          }
        })
    }
  }

}
