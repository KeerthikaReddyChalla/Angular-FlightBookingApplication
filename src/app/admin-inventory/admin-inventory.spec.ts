import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventoryComponent } from './admin-inventory';

describe('AdminInventory', () => {
  let component: AdminInventoryComponent;
  let fixture: ComponentFixture<AdminInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInventoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
