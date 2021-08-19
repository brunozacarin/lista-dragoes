import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  form = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
  }


  get formControls() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.createUser();
  }

  private createUser() {
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          alert('Usuário Cadastrado com sucesso!')
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          console.log(error);
          alert(error.error.message)
          this.loading = false;
        }
      });
  }

}
