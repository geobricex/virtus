import {Component} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
      <div class="layout-footer">
          <a href="/dashboard" class="logo-container">
              <span class="app-name">VIRTUS</span> <br>
                <span class="text-pink-100" style="margin-left: 14px"> En latín Virtus tiene varios significados entre ellos principalmente Virtud, Valor,
                Fortaleza, Coraje. </span>
          </a>

          <div class="footer-icons">
              <ul>
                  <li>
                      <a>
                          <i class="pi pi-twitter"></i>
                      </a>
                  </li>
                  <li>
                      <a>
                          <i class="pi pi-facebook"></i>
                      </a>
                  </li>
                  <li>
                      <a>
                          <i class="pi pi-github"></i>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
    `
})
export class AppFooterComponent {

}
