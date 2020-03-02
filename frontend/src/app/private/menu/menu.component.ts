import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pages = {
    cadastros: [
        {
          title: 'Documentos Financeiros',
          url: '/private/cadastros/documentos-financeiros'
        },
        {
          title: 'Condições de Pagamento',
          url: '/private/cadastros/condicoes-pagamento'
        },
        {
          title: 'Preços',
          url: '/private/cadastros/precos'
        },
        {
          title: 'Clientes',
          url: '/private/cadastros/clientes'
        },
        {
          title: 'Fornecedores',
          url: '/private/cadastros/fornecedores'
        },
        {
          title: 'Transportadores',
          url: '/private/cadastros/transportadores'
        },
        {
          title: 'Veículos',
          url: '/private/cadastros/veiculos'
        },
        {
          title: 'Motoristas',
          url: '/private/cadastros/motoristas'
        },
        {
          title: 'Tipos de Movimentação',
          url: '/private/cadastros/tipos-movimentacao'
        },
        {
          title: 'Produtos',
          url: '/private/cadastros/produtos'
        },
        {
          title: 'Unidades de Medida',
          url: '/private/cadastros/unidades-medida'
        },
      ],
    comercial: [
        {
          title: 'Notas de Vendas',
          url: '/private/comercial/notas-vendas'
        },
      ],
    financeiro: [
        {
          title: 'Contas a Pagar',
          url: '/private/financeiro/contas-pagar'
        },
        {
          title: 'Contas a Receber',
          url: '/private/financeiro/contas-receber'
        },
        {
          title: 'Extrato',
          url: '/private/financeiro/extrato'
        },
      ],
    suprimentos: [
        {
          title: 'Estoque',
          url: '/private/suprimentos/estoque'
        },
      ]
  };

  selectedPath: string;
  isOpenCad:boolean = false;
  isOpenCom:boolean = false;
  isOpenFin:boolean = false;
  isOpenSup:boolean = false;

  constructor(private router: Router, private alertCtrl: AlertController, private authService: AuthenticationService) { 
    this.router.events.subscribe((event: RouterEvent) => {
      if(event.url) this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

  async sairAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Sair',
      message: 'Deseja realmente sair do sistema?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Sim',
          handler: () => {
            this.authService.logout('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
