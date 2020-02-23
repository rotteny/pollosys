import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentosFinanceitosPage } from './documentos-financeitos.page';

describe('DocumentosFinanceitosPage', () => {
  let component: DocumentosFinanceitosPage;
  let fixture: ComponentFixture<DocumentosFinanceitosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosFinanceitosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentosFinanceitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
