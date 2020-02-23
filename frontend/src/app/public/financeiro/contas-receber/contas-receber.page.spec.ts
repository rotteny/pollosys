import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContasReceberPage } from './contas-receber.page';

describe('ContasReceberPage', () => {
  let component: ContasReceberPage;
  let fixture: ComponentFixture<ContasReceberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContasReceberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContasReceberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
