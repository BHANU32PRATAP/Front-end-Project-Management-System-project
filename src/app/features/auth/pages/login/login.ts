import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../core/services/api-service';
import { LoginUser } from '../../../../core/models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonUtils } from '../../../../core/common.utils';
import { ToastServcie } from '../../../../core/services/toast';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private apiService = inject(ApiService)
  private commonUit = new CommonUtils
  private route = inject(Router)
  showPassword: boolean = false
  private toastService = inject(ToastServcie)

  loginForm: LoginUser = {
    email: "",
    password: "",
  }

  onLogin() {
    this.apiService.onLogin(this.loginForm).subscribe({
      next: (res: any) => {
        console.log("Success", res)
        localStorage.setItem(
          'token',
          res.token
        )

        localStorage.setItem(
          'userData',
          JSON.stringify(res.data)
        )
        this.toastService.success("Login Successfully!")
        this.route.navigate(['/dashboard'])

      },
      error: (error) => {
        console.log("Error", error)
        this.toastService.error(error.error?.message || "Invalid Email or Password")
      }
    })
  }

  togglePassword() {
    this.showPassword = this.commonUit.isVisiblePassword(
      this.showPassword
    )
    console.log("fnalfnl")
  }




}
