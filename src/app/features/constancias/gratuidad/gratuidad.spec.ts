import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gratuidad } from './gratuidad';

describe('Gratuidad', () => {
    let component: Gratuidad;
    let fixture: ComponentFixture<Gratuidad>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Gratuidad],
        }).compileComponents();

        fixture = TestBed.createComponent(Gratuidad);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
