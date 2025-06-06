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

  selected: string = '';

  ngOnInit() {
    this.initializeForm();
    localStorage.getItem('adm') !== 'true'
      ? window.location.replace('/adm/login')
      : console.log('Admin access granted');

    this.selected =
      this.selectedCheckboxes.length > 0
        ? this.selectedCheckboxes.join(', ')
        : 'Select an option';
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

  expanded: boolean = false;
  selectedCheckboxes: string[] = [];

  showCheckboxes(): void {
    const checkboxes = document.getElementById(
      'checkboxes'
    ) as HTMLElement | null;
    if (!checkboxes) return; // Garante que o elemento existe

    if (!this.expanded) {
      checkboxes.style.display = 'block';
      this.expanded = true;
    } else {
      checkboxes.style.display = 'none';
      this.expanded = false;
    }
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
