import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormDocumentosFinanceirosComponent } from './form-documentos-financeiros.component';

describe('FormDocumentosFinanceirosComponent', () => {
  let component: FormDocumentosFinanceirosComponent;
  let fixture: ComponentFixture<FormDocumentosFinanceirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDocumentosFinanceirosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormDocumentosFinanceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
