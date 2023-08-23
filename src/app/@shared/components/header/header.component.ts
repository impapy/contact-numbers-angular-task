import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagerService } from 'src/app/@core/services/account-manager.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private accountClient: AccountManagerService) {}

  logout() {
    this.accountClient.logut();
  }
}
