import { Component, Input } from '@angular/core';
@Component({
    selector: 'icon-carets-down',
    template: `
        <svg
            [ngClass]="class"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 9L12 15L5 9"
                [attr.stroke]="!fill ? 'currentColor' : 'none'"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                [attr.fill]="fill ? 'currentColor' : 'none'"
            />
        </svg>
    `,
})
export class IconCaretsDownComponent {
    @Input() class: any = '';
    @Input() fill: boolean = false;
}
