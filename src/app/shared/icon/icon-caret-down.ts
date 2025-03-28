import { Component, Input } from '@angular/core';
@Component({
    selector: 'icon-caret-down',
    template: `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [ngClass]="class" style="color: #E5E5E5;">
            <path d="M19 9L12 15L5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `,
})
export class IconCaretDownComponent {
    @Input() class: any = '';
}
