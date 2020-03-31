import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabelasPrecosPage } from './tabelas-precos.page';

describe('TabelasPrecosPage', () => {
  let component: TabelasPrecosPage;
  let fixture: ComponentFixture<TabelasPrecosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelasPrecosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabelasPrecosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
