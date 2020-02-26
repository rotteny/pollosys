import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentosFinanceirosPage } from './documentos-financeiros.page';

describe('DocumentosFinanceirosPage', () => {
  let component: DocumentosFinanceirosPage;
  let fixture: ComponentFixture<DocumentosFinanceirosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosFinanceirosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentosFinanceirosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
