import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountManagerService } from 'src/app/@core/services/account-manager.service';
import { UserAddInput } from 'src/app/@models/account/UserAddInput';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private accountClient: AccountManagerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  submit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.accountClient.login(new UserAddInput({ username, password }));
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
