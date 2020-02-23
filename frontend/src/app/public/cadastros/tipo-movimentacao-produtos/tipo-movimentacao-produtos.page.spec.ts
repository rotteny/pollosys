import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TipoMovimentacaoProdutosPage } from './tipo-movimentacao-produtos.page';

describe('TipoMovimentacaoProdutosPage', () => {
  let component: TipoMovimentacaoProdutosPage;
  let fixture: ComponentFixture<TipoMovimentacaoProdutosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMovimentacaoProdutosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TipoMovimentacaoProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
