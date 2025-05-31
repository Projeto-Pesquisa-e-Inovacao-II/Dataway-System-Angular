import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmpresaComponent } from './update-empresa.component';

describe('UpdateEmpresaComponent', () => {
  let component: UpdateEmpresaComponent;
  let fixture: ComponentFixture<UpdateEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
