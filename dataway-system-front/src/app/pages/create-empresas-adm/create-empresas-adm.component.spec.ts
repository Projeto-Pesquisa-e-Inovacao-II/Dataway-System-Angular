import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpresasAdmComponent } from './create-empresas-adm.component';

describe('CreateEmpresasAdmComponent', () => {
  let component: CreateEmpresasAdmComponent;
  let fixture: ComponentFixture<CreateEmpresasAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmpresasAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmpresasAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
