import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { slideDownUp } from '../shared/animations';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.html',
    animations: [slideDownUp],
})
export class SidebarComponent {
    active = false;
    store: any;
    activeDropdown: string[] = [];
    activePath: string = '';
    parentDropdown: string = '';
    
    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
    ) {
        this.initStore();
        
        // Subscribe to router events to update active path
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: any) => {
            this.activePath = event.urlAfterRedirects;
            this.setActiveDropdown();
        });
    }
    
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.activePath = this.router.url;
        this.setActiveDropdown();
    }

    isActive(path: string): boolean {
        if (path === '/' && this.activePath === '/') {
            return true;
        }
        return this.activePath.startsWith(path) && path !== '/';
    }

    setActiveDropdown() {
        // Clear previous active elements
        const activeElements = document.querySelectorAll('.sidebar ul a.active');
        activeElements.forEach(el => {
            el.classList.remove('active');
            el.classList.remove('text-[#5BA38F]');
        });
        
        // Set new active element
        const selector = document.querySelector('.sidebar ul a[routerLink="' + this.activePath + '"]');
        if (selector) {
            selector.classList.add('active');
            selector.classList.add('text-[#5BA38F]');
            
            // Find parent dropdown
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                const parentLi = ul.closest('li.menu');
                if (parentLi) {
                    let navLink = parentLi.querySelector('.nav-link');
                    if (navLink) {
                        // Get the dropdown name from a data attribute or class
                        const dropdownName = navLink.getAttribute('data-dropdown-name');
                        if (dropdownName && !this.activeDropdown.includes(dropdownName)) {
                            this.toggleAccordion(dropdownName);
                        }
                    }
                }
            }
        }
    }

    toggleMobileMenu() {
        if (window.innerWidth < 1024) {
            this.storeData.dispatch({ type: 'toggleSidebar' });
        }
    }

    toggleAccordion(name: string, parent?: string) {
        if (this.activeDropdown.includes(name)) {
            this.activeDropdown = this.activeDropdown.filter((d) => d !== name);
        } else {
            // Solo para el menú principal, quitamos cualquier otro dropdown activo del mismo nivel
            if (!parent) {
                // Si el menú no tiene un padre (es un menú principal)
                if (name === 'caddy') {
                    // Si estamos activando "caddy", desactivamos "dashboard"
                    this.activeDropdown = this.activeDropdown.filter(d => d !== 'dashboard');
                } else if (name === 'dashboard') {
                    // Si estamos activando "dashboard", desactivamos "caddy"
                    this.activeDropdown = this.activeDropdown.filter(d => d !== 'caddy');
                }
            }
            this.activeDropdown.push(name);
        }
    }
}
