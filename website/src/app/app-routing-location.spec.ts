import {Component, Injectable, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import {fakeAsync, flush, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

/* Test that the link(s) are generated correctly */
@Injectable()
class NavConfigService {
  menu = [{ label: 'Home', path: '/target/12' }];
}

@Component({
  selector: `navigation-menu`,
  template: `<div><a *ngFor="let item of menu" [id]="item.label" [routerLink]="item.path">{{ item.label }}</a></div>`
})
class NavigationMenu implements OnInit {
  menu: any;
  constructor(private navConfig: NavConfigService) { }
  ngOnInit() {
    this.menu = this.navConfig.menu;
  }
}

/* Test fixture mock component */
@Component({
  selector: `app-root`,
  template: `<router-outlet></router-outlet>`
})
class AppComponent {}

/* Target mock component */
@Component({
  selector: `simple-component`,
  template: `simple`
})
class SimpleComponent {}

describe('Testing routes', () => {

  let fixture;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      /* `RouterTestingModule` keeps Angular from loading the
         target component. It also allows to check the parameters. */
      imports: [RouterTestingModule.withRoutes([
        // Fake routes avoid importing dependencies
        {path: '', component: NavigationMenu},
        {path: 'target/:id', component: SimpleComponent }
      ])],
      providers: [{
        provide: NavConfigService,
        useValue: {menu: [{label: 'Home', path: '/target/fakeId' }] }
      }],
      declarations: [NavigationMenu, SimpleComponent, AppComponent]
    });
  });

  // Navigation events occur asynchronously
  beforeEach(fakeAsync(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.navigateByUrl('/');
    advance();
  }));

  function advance(): void {
    flush(); // resolve outstanding async cally manually
    fixture.detectChanges(); // update fixture
  }

  // Navigation events occur asynchronously
  it('Tries to route to a page', fakeAsync(() => {
    // It would be possible to use `Router.navigate()` instead of a click event. */
    const menu = fixture.debugElement.query(By.css('a'));
    menu.triggerEventHandler('click', {button: 0});
    advance();
    /* Check to see if the path updated to the expected target.
       The Location service provides the information about the current route. */
    expect(location.path()).toEqual('/target/fakeId');
  }));
});
