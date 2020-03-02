import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotasVendasPage } from './notas-vendas.page';

describe('NotasVendasPage', () => {
  let component: NotasVendasPage;
  let fixture: ComponentFixture<NotasVendasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasVendasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasVendasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
