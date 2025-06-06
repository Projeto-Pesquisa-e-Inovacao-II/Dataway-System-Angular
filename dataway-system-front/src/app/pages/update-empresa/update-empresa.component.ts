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
      lotes: [''],
    });

    localStorage.getItem('adm') !== 'true'
      ? window.location.replace('/adm/login')
      : console.log('Admin access granted');

    // this.getConcessoes()
  }

  updateEmpresa(form: FormGroup) {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa') || '';
    console.log('Updating empresa with id:', idEmpresa);
    console.log('Form value:', form.value);
    if (form.valid) {
      this.selectedConcessoes = this.selectedCheckboxes.filter(
        (item) => item !== '' && item !== null && item !== undefined
      );
      console.log('Selected concessoes:', this.selectedConcessoes);
      this.admService
        .updateEmpresa(idEmpresa, form.value, this.selectedConcessoes)
        .subscribe({
          next: (response: any) => {
            console.log('Empresa updated successfully', response);
            this.router.navigate(['/adm/empresa']);
          },
          error: (error) => {
            console.error('Error updating empresa', error);
            if (error.status == 400) {
              alert(error.error.mensagem);
              return;
            }
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
  selectedConcessoes: string[] = [];
  allLotes: string[] = [];

  getEmpresa() {
    const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa') || '';
    console.log('Fetching empresa with id:', idEmpresa);
    if (!idEmpresa) {
      console.error('No idEmpresa found in param');
      return;
    }
    this.admService.getEmpresa(idEmpresa).subscribe({
      next: (empresa: any) => {
        this.empresaForm.patchValue(empresa);
        console.log('Empresa fetched successfully', empresa);
        for (let i = 0; i < empresa.allLotes.length; i++) {
          this.selectedConcessoes.push(empresa.lotes[i]);
          this.selectedCheckboxes.push(empresa.lotes[i]);
          this.allLotes.push(empresa.allLotes[i]);
        }
      },
      error: (error) => {
        console.error('Error fetching empresa', error);
      },
    });
  }

  selectedCheckboxes: string[] = [];

  onConcessaoChange(checkbox: string) {
    const index = this.selectedCheckboxes.indexOf(checkbox);
    if (index === -1) {
      this.selectedCheckboxes.push(checkbox);
    } else {
      this.selectedCheckboxes.splice(index, 1);
    }
  }

  concessoes: string[] = [];
  getConcessoes() {
    this.admService.getConcessoes().subscribe({
      next: (response) => {
        console.log('empresa: ', response);
        this.concessoes = (response as any[]).map((item) => item.lotes);
        console.log('Concessoes:', this.concessoes);
      },
      error: (error) => {
        console.error('Error fetching concessoes', error);
      },
    });
  }

  handleCancel() {
    // Logic to handle cancel action, e.g., navigate back or reset the form
    console.log('Cancel action triggered');
    this.router.navigate(['/adm/empresa']);
  }

  expanded: boolean = false;

  // https://stackoverflow.com/questions/17714705/how-to-use-checkbox-inside-select-option
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
}
