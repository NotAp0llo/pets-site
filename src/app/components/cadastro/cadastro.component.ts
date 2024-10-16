import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      rua: ['', Validators.required],
      bairro: ['', Validators.required],
      estado: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  ngOnInit(): void {}

  senhasIguais(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha')?.value;
    const confirmarSenha = control.get('confirmarSenha')?.value;
    return senha === confirmarSenha ? null : { senhasDiferentes: true };
  }

  onSubmit(): void {
    if (this.cadastroForm.valid) {
      console.log(this.cadastroForm.value); 
    }
  }
}
