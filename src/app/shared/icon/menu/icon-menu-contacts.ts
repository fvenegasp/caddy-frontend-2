import { Component, Input } from '@angular/core';
@Component({
    selector: 'icon-menu-contacts',
    template: `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [ngClass]="class" style="color: #E5E5E5;">
            <path
                d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
                stroke="currentColor"
                stroke-width="1.5"
            />
            <path
                d="M22 19.5C22 20.8807 21.8807 22 20.5 22C19.1193 22 15.5 22 15.5 22C15.5 22 15.5 21.5 15.5 19.5C15.5 17.5 17 16 19 16C21 16 22 17.5 22 19.5Z"
                stroke="currentColor"
                stroke-width="1.5"
            />
            <path
                d="M15 2H17C19.2091 2 21 3.79086 21 6V10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
            />
            <path
                d="M2 14V19C2 20.6569 3.34315 22 5 22H12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
            />
        </svg>
    `,
})
export class IconMenuContactsComponent {
    @Input() class: any = '';
}
