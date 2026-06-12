import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterUser } from '../../../../core/models/user.model';
import { CommonUtils } from '../../../../core/common.utils';
import { ToastServcie } from '../../../../core/services/toast';
import { AuthService } from '../../auth-service';


@Component({
  selector: 'app-register',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService = inject(AuthService)
  private commonUits = new CommonUtils()
  showPassword = false
  private route = inject(Router)
  private tostService = inject(ToastServcie)

  registerForm: RegisterUser = {
    "firstName": "",
    "secondName": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
    "role": "",
    "term": false
  }

  onClearForm() {
    this.registerForm = {
      "firstName": "",
      "secondName": "",
      "email": "",
      "password": "",
      "confirmPassword": "",
      "role": "",
      "term": false
    }
  }

  onRegistration() {
    this.authService.register(this.registerForm).subscribe({
      next: (res) => {
        console.log("Success", res)

        localStorage.setItem(
          'userData',
          JSON.stringify(res)
        )
        this.onClearForm();

        this.tostService.success(
          'Registration Successful'
        );

        setTimeout(() => {
          this.route.navigate(['/login'])
        }, 2000)

      },
      error: (error) => {
        this.tostService.error("Invalid Email or Password")
        console.log("Error", error)
      }
    })
  }


  togglePassword() {
    this.showPassword = this.commonUits.isVisiblePassword(
      this.showPassword
    )
  }






}
