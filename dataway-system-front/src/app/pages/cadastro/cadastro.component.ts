import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CadastroForm } from '../../interfaces/cadastro-form';
import { CadastroService } from '../../services/cadastro/cadastro.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  @ViewChild('empresaSelect') empresaSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('numeroInput') numeroVar!: ElementRef<HTMLInputElement>;
  @ViewChild('cepInput') cepVar!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailVar!: ElementRef<HTMLInputElement>;
  @ViewChild('senhaInput') senhaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmarSenhaInput') confirmacaoSenhaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('representanteLegalInput') representanteLegalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnpjInput') cnpjInput!: ElementRef<HTMLInputElement>;
  @ViewChild('telefoneInput') telefoneInput!: ElementRef<HTMLInputElement>;
  @ViewChild('checkboxPrivacyPolicy') checkboxPrivacyPolicy!: ElementRef<HTMLInputElement>;
  @ViewChild('cardRuleSenha') cardRuleSenha!: ElementRef<HTMLDivElement>;
  @ViewChild('nomeFantasiaInput') nomeFantasiaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('privacyPolicy') privacyPolicy!: ElementRef<HTMLDivElement>;
  @ViewChild('btnContinuar1') btnContinuar1!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnVoltar') btnVoltar!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnCadastrar') btnCadastrar!: ElementRef<HTMLButtonElement>;
  @ViewChild('toast', { static: false }) toast!: ElementRef<HTMLDivElement>;
  @ViewChild('toastMessage', { static: false }) toastMessage!: ElementRef<HTMLParagraphElement>;

  passo: number = 1;

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.document.body.classList.add('login-body');
    }
  }

  togglePasswordVisibility(input: HTMLInputElement, icon: HTMLImageElement) {
    if (input.type === 'password') {
      input.type = 'text';
      icon.src = '../images/Icon/eye-slash.svg';
    } else {
      input.type = 'password';
      icon.src = '../images/Icon/eye.svg';
    }
  }

  passo1() {
    this.passo = 1;
  }

  passo2() {
    this.passo = 2;
  }

  validarSenha(senha: string): boolean {
    const temNumero = /\d/;
    const temCaractereEspecial = /[@#]/;
    const temLetraMaiuscula = /[A-Z]/;
    const tamanhoMinimo = senha.length >= 6;
    return (
      tamanhoMinimo &&
      temNumero.test(senha) &&
      temCaractereEspecial.test(senha) &&
      temLetraMaiuscula.test(senha)
    );
  }

  validarPasso1() {
    if (!this.empresaSelect.nativeElement.value.trim()) {
      this.showToast('Por favor, selecione uma empresa.', '#ff6347');
      return;
    }
    if (!this.representanteLegalInput.nativeElement.value.trim()) {
      this.showToast('Por favor, preencha o campo Representante Legal.', '#ff6347');
      return;
    }
    if (!this.nomeFantasiaVar.nativeElement.value.trim()) {
      this.showToast('Por favor, preencha o campo Nome Fantasia.', '#ff6347');
      return;
    }
    if (!this.cnpjInput.nativeElement.value.trim()) {
      this.showToast('Por favor, preencha o campo CNPJ.', '#ff6347');
      return;
    }
    if (!this.numeroVar.nativeElement.value.trim()) {
      this.showToast('Por favor, preencha o campo Número.', '#ff6347');
      return;
    }
    if (!this.cepVar.nativeElement.value.trim()) {
      this.showToast('Por favor, preencha o campo CEP.', '#ff6347');
      return;
    }
    this.passo2();
  }

  mascaraCNPJ(cnpj: HTMLInputElement) {
    cnpj.value = cnpj.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  }

  mascaraTelefone(telefone: HTMLInputElement) {
    telefone.value = telefone.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }

  mascaraCEP(cep: HTMLInputElement) {
    cep.value = cep.value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  }

  async cadastrar() {
    // Pegue os valores dos inputs usando this.empresaSelect.nativeElement.value etc.
    // Faça a requisição HTTP usando HttpClient do Angular
  }

  showToast(message: string, color: string) {
    const toast = this.toast.nativeElement;
    const toastMessage = this.toastMessage.nativeElement;
    toastMessage.textContent = message;
    toast.style.backgroundColor = color;
    toast.classList.remove('hidden');
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
      toast.classList.add('hidden');
    }, 3000);
  }
}
