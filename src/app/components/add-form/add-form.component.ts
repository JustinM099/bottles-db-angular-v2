import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  addForm!: FormGroup; 

  constructor(private formBuilder: FormBuilder) { }

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

}
