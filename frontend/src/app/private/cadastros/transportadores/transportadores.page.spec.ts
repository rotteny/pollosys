import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransportadoresPage } from './transportadores.page';

describe('TransportadoresPage', () => {
  let component: TransportadoresPage;
  let fixture: ComponentFixture<TransportadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransportadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
