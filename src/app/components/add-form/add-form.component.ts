import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Wine } from 'Wine';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  addForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: Wine,
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

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

    if (this.editData) {
      this.actionBtn = 'Update'
      this.addForm.controls['producer'].setValue(this.editData.producer)
      this.addForm.controls['wineName'].setValue(this.editData.wineName)
      this.addForm.controls['vintage'].setValue(this.editData.vintage)
      this.addForm.controls['wineType'].setValue(this.editData.wineType)
      this.addForm.controls['region'].setValue(this.editData.region)
      this.addForm.controls['variety'].setValue(this.editData.variety)
      this.addForm.controls['notes'].setValue(this.editData.notes)
      this.addForm.controls['storageLocation'].setValue(this.editData.storageLocation)
      this.addForm.controls['quantity'].setValue(this.editData.quantity)
    }


  }

  addWine() {
    if (!this.editData) {
      if (this.addForm.valid) {
        this.api.postWine(this.addForm.value)
          .subscribe({
            next: (res) => {
              this.addForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("I'm sorry. an error occurred.")
            }
          })
      }
    }else(this.updateWine())
  }

  updateWine() {
    this.api.putWine(this.addForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          this.addForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("I'm sorry. an error occurred.")
        }
      })
  }

}
