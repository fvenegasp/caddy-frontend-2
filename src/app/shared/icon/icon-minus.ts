import { Component, Input } from '@angular/core';
@Component({
    selector: 'icon-minus',
    template: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [ngClass]="class" style="color: #E5E5E5;">
            <path d="M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
    `,
})
export class IconMinusComponent {
    @Input() class: any = '';
}
