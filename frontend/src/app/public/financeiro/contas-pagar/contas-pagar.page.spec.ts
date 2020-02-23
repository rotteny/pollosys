import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContasPagarPage } from './contas-pagar.page';

describe('ContasPagarPage', () => {
  let component: ContasPagarPage;
  let fixture: ComponentFixture<ContasPagarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasPagarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContasPagarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
