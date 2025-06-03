import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderAdmComponent } from '../../components/headerAdm/header-adm/header-adm.component';
import { AdmPagesService } from '../../services/adm-pages/adm-pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-empresa',
  imports: [CommonModule, FormsModule, HeaderAdmComponent, ReactiveFormsModule],
  templateUrl: './create-empresa.component.html',
  styleUrl: './create-empresa.component.scss',
})
export class CreateEmpresaComponent {
  empresaForm: FormGroup = new FormGroup({});
  constructor(
    private admService: AdmPagesService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    localStorage.getItem('adm') !== 'true'
      ? window.location.replace('/adm/login')
      : console.log('Admin access granted');
  }

  initializeForm() {
    this.empresaForm = this.fb.group({
      idEmpresa: [''],
      nomeFantasia: [''],
      representanteLegal: [''],
      CNPJ: [''],
      codigoEmpresa: [''],
      ativo: [''],
    });
  }

  handleSubmit(event: Event, form: FormGroup) {
    event.preventDefault();
    console.log('Form submitted:', form.value);
    if (form.valid) {
      this.admService.createEmpresa(form.value).subscribe({
        next: (response) => {
          console.log('Empresa created successfully', response);
          // Navigate to the empresa list or detail page after successful creation
          this.router.navigate(['/adm/empresa']);
        },
        error: (error) => {
          console.error('Error creating empresa', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  handleCancel() {
    // Logic to handle cancel action, e.g., navigate back or reset the form
    console.log('Cancel action triggered');
    this.router.navigate(['/adm/empresa']);
  }
}
