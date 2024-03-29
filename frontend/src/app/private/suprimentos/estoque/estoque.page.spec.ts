import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstoquePage } from './estoque.page';

describe('EstoquePage', () => {
  let component: EstoquePage;
  let fixture: ComponentFixture<EstoquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstoquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
