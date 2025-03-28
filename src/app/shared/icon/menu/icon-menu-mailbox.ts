import { Component, Input } from '@angular/core';
@Component({
  selector: 'icon-menu-mailbox',
  template: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" [ngClass]="class" style="color: #E5E5E5;">
      <path
        d="M2 11V17.2C2 19.8802 2 21.2202 2.9099 22.1101C3.8198 23 5.1598 23 7.84 23H16.16C18.8402 23 20.1802 23 21.0901 22.1101C22 21.2202 22 19.8802 22 17.2V11"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        opacity="0.5"
        d="M15 4V3.5C15 2.11929 13.8807 1 12.5 1H11.5C10.1193 1 9 2.11929 9 3.5V4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M4 10.0308V10.0308C4 8.75 5.42396 7.91647 6.58585 8.46729L11.6 11M12.4 11L17.4142 8.46729C18.576 7.91647 20 8.75 20 10.0308V10.0308"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        opacity="0.5"
        d="M17 4H7C4.79086 4 3 5.79086 3 8V9.94535C3 10.4316 3 10.6747 3.03217 10.9028C3.19389 12.3267 4.67326 13.8252 6.09318 14.0032C6.32141 14.0375 6.56434 14.0375 7.05022 14.0375H16.9498C17.4357 14.0375 17.6786 14.0375 17.9068 14.0032C19.3267 13.8252 20.8061 12.3267 20.9678 10.9028C21 10.6747 21 10.4316 21 9.94535V8C21 5.79086 19.2091 4 17 4Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  `,
})
export class IconMenuMailboxComponent {
  @Input() class: any = '';
}
