import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  viewChild,
} from '@angular/core';
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
  empresaSelecionada: string = '';

  @ViewChild('cpfInput', { static: false })
  cpfVar!: ElementRef<HTMLInputElement>;
  @ViewChild('telefoneInput', { static: false })
  telefoneVar!: ElementRef<HTMLInputElement>;
  @ViewChild('codigoEmpresaInput', { static: false })
  codigoEmpresaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('nomeInput', { static: false })
  nomeVar!: ElementRef<HTMLInputElement>;
  @ViewChild('empresaSelect', { static: false })
  empresaSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('numeroInput') numeroVar!: ElementRef<HTMLInputElement>;
  @ViewChild('cepInput') cepVar!: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput', { static: false })
  emailVar!: ElementRef<HTMLInputElement>;
  @ViewChild('senhaInput', { static: false })
  senhaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('confirmarSenhaInput', { static: false })
  confirmacaoSenhaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('representanteLegalInput')
  representanteLegalInput!: ElementRef<HTMLInputElement>;
  @ViewChild('cnpjInput') cnpjInput!: ElementRef<HTMLInputElement>;
  @ViewChild('telefoneInput', { static: false })
  telefoneInput!: ElementRef<HTMLInputElement>;
  @ViewChild('checkboxPrivacyPolicy', { static: false })
  checkboxPrivacyPolicy!: ElementRef<HTMLInputElement>;
  @ViewChild('cardRuleSenha') cardRuleSenha!: ElementRef<HTMLDivElement>;
  @ViewChild('nomeFantasiaInput')
  nomeFantasiaVar!: ElementRef<HTMLInputElement>;
  @ViewChild('privacyPolicy') privacyPolicy!: ElementRef<HTMLDivElement>;
  @ViewChild('btnContinuar1') btnContinuar1!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnVoltar') btnVoltar!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnCadastrar') btnCadastrar!: ElementRef<HTMLButtonElement>;
  @ViewChild('toast', { static: false }) toast!: ElementRef<HTMLDivElement>;
  @ViewChild('toastMessage', { static: false })
  toastMessage!: ElementRef<HTMLParagraphElement>;
  @ViewChild('tamanhoMinimoDiv', { static: false })
  tamanhoMinimoDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('temNumeroDiv', { static: false })
  temNumeroDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('temCaractereEspecialDiv', { static: false })
  temCaractereEspecialDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('temLetraMaiusculaDiv', { static: false })
  temLetraMaiusculaDiv!: ElementRef<HTMLDivElement>;

  passo: number = 1;
user = {
  nome: '',
  email: '',
  senha: '',
  codigoEmpresa: '' 
};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cadastroService: CadastroService
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

  validarPasso1() {
    if (!this.empresaSelect.nativeElement.value.trim()) {
      this.showToast('Por favor, selecione uma empresa.', '#ff6347');
      return;
    }
    if (!this.representanteLegalInput.nativeElement.value.trim()) {
      this.showToast(
        'Por favor, preencha o campo Representante Legal.',
        '#ff6347'
      );
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

  validarPasso2() {
    const telefone = this.telefoneInput.nativeElement.value.trim();
    const email = this.emailVar.nativeElement.value.trim();
    const senha = this.senhaVar.nativeElement.value;
    const confirmarSenha = this.confirmacaoSenhaVar.nativeElement.value;
    const checkbox = this.checkboxPrivacyPolicy.nativeElement.checked;

    if (!telefone || telefone.replace(/\D/g, '').length < 10) {
      this.showToast('Por favor, preencha um telefone válido.', '#ff6347');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.showToast('Por favor, preencha um email válido.', '#ff6347');
      return;
    }
    if (!this.validarSenha(senha)) {
      this.showToast('A senha não atende aos requisitos.', '#ff6347');
      return;
    }
    if (senha !== confirmarSenha) {
      this.showToast('As senhas não coincidem.', '#ff6347');
      return;
    }
    if (!checkbox) {
      this.showToast(
        'Você deve aceitar os termos de uso e política de privacidade.',
        '#ff6347'
      );
      return;
    }
    this.cadastrar(new Event('submit'));
  }

  mascaraCPF(cpf: HTMLInputElement) {
    cpf.value = cpf.value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
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

  validarSenha(senha: string): boolean {
    const temNumero = /\d/;
    const temCaractereEspecial = /[@!?.$&#*,]/;
    const temLetraMaiuscula = /[A-Z]/;
    const tamanhoMinimo = senha.length >= 6;
    return (
      tamanhoMinimo &&
      temNumero.test(senha) &&
      temCaractereEspecial.test(senha) &&
      temLetraMaiuscula.test(senha)
    );
  }

  atualizarRegrasSenha(senha: string) {
    if (senha.length >= 6) {
      this.tamanhoMinimoDiv.nativeElement.className = 'valido';
    } else {
      this.tamanhoMinimoDiv.nativeElement.className = 'invalido';
    }
    if (/\d/.test(senha)) {
      this.temNumeroDiv.nativeElement.className = 'valido';
    } else {
      this.temNumeroDiv.nativeElement.className = 'invalido';
    }
    if (/['"!@#$%¨&*_?,.]/.test(senha)) {
      this.temCaractereEspecialDiv.nativeElement.className = 'valido';
    } else {
      this.temCaractereEspecialDiv.nativeElement.className = 'invalido';
    }
    if (/[A-Z]/.test(senha)) {
      this.temLetraMaiusculaDiv.nativeElement.className = 'valido';
    } else {
      this.temLetraMaiusculaDiv.nativeElement.className = 'invalido';
    }
  }

  async cadastrar(event: Event) {
    console.log('Iniciando cadastro...');
    event.preventDefault();
    const userData = {
      nomeServer: this.nomeVar.nativeElement.value,
      cpfServer: this.cpfVar.nativeElement.value,
      telefoneServer: this.telefoneVar.nativeElement.value,
      emailServer: this.emailVar.nativeElement.value,
      senhaServer: this.senhaVar.nativeElement.value,
      codigoEmpresaServer: this.codigoEmpresaVar.nativeElement.value,
    };
     console.log('Dados do usuário:', userData);
    this.cadastroService.cadastrarUsuario({ userData }).subscribe({
      next: (response: any) => {
        this.showToast('Cadastro realizado com sucesso!', '#28a745');
        console.log(response);
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        this.showToast('Erro ao cadastrar. Tente novamente.', '#dc3545');
      },
    });
    return;
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
