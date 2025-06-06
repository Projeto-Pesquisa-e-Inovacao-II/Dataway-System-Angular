import { Component } from '@angular/core';
import { HeaderAdmComponent } from '../../components/headerAdm/header-adm/header-adm.component';
import { AdmPagesService } from '../../services/adm-pages/adm-pages.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-empresa',
  imports: [HeaderAdmComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-empresa.component.html',
  styleUrl: './update-empresa.component.scss',
})
export class UpdateEmpresaComponent {
  constructor(
    private admService: AdmPagesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}
  empresaForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.getEmpresa();
    this.empresaForm = this.fb.group({
      idEmpresa: [''],
      nomeFantasia: [''],
      representanteLegal: [''],
      CNPJ: [''],
      codigoEmpresa: [''],
      ativo: [''],
    });

    localStorage.getItem('adm') !== 'true'
      ? window.location.replace('/adm/login')
      : console.log('Admin access granted');
  }

  updateEmpresa(form: FormGroup) {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa') || '';
    console.log('Updating empresa with id:', idEmpresa);
    console.log('Form value:', form.value);
    if (form.valid) {
      this.admService.updateEmpresa(idEmpresa, form.value).subscribe({
        next: (response) => {
          console.log('Empresa updated successfully', response);
          this.router.navigate(['/adm/empresa']);
        },
        error: (error) => {
          console.error('Error updating empresa', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  getEmpresa() {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa') || '';
    console.log('Fetching empresa with id:', idEmpresa);
    if (!idEmpresa) {
      console.error('No idEmpresa found in param');
      return;
    }
    this.admService.getEmpresa(idEmpresa).subscribe({
      next: (empresa) => {
        this.empresaForm.patchValue(empresa);
        console.log('Empresa fetched successfully', empresa);
      },
      error: (error) => {
        console.error('Error fetching empresa', error);
      },
    });
  }

  handleCancel() {
    // Logic to handle cancel action, e.g., navigate back or reset the form
    console.log('Cancel action triggered');
    this.router.navigate(['/adm/empresa']);
  }
}
