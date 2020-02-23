import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrecosPage } from './precos.page';

describe('PrecosPage', () => {
  let component: PrecosPage;
  let fixture: ComponentFixture<PrecosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrecosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
