import { ActivatedRoute, Data } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { CartComponent } from './cart.component';

describe('Cart', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn: (value: Data) => void) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      CartComponent
    ]
  }));

  it('should log ngOnInit', inject([CartComponent], (cart: CartComponent) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    cart.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
