import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TiposMovimentacaoPage } from './tipos-movimentacao.page';

describe('TiposMovimentacaoPage', () => {
  let component: TiposMovimentacaoPage;
  let fixture: ComponentFixture<TiposMovimentacaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiposMovimentacaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TiposMovimentacaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
