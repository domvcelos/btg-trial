import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });
  it(
    'should have app-create-contact element',(() => {
      const fixture = TestBed.createComponent(AppComponent);
      expect(fixture.nativeElement.querySelector('app-create-contact')).toBeTruthy();
    })
  );
  it(
    'should have app-contact-list',(() => {
      const fixture = TestBed.createComponent(AppComponent);
      expect(fixture.nativeElement.querySelector('app-contact-list')).toBeTruthy();
    })
  );
});
