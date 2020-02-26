import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pages = {
    cadastros: [
        {
          title: 'Clientes',
          url: '/clientes'
        },
        {
          title: 'Fornecedores',
          url: '/fornecedores'
        },
        {
          title: 'Transportadores',
          url: '/transportadores'
        },
        {
          title: 'Motoristas',
          url: '/motoristas'
        },
        {
          title: 'Veículos',
          url: '/veiculos'
        },
        {
          title: 'Tipos de Movimentação',
          url: '/tipos-movimentacao'
        },
        {
          title: 'Produtos',
          url: '/produtos'
        },
        {
          title: 'Documentos Financeiros',
          url: '/documentos-financeiros'
        },
      ],
    comercial: [
        {
          title: 'Preços',
          url: '/precos'
        },
        {
          title: 'Notas de Vendas',
          url: '/notas-vendas'
        },
      ],
    financeiro: [
        {
          title: 'Contas a Pagar',
          url: '/contas-pagar'
        },
        {
          title: 'Contas a Receber',
          url: '/contas-receber'
        },
      ],
    suprimentos: [
        {
          title: 'Estoque',
          url: '/estoque'
        },
      ]
  };

  selectedPath: string;
  isOpenCad:boolean = false;
  isOpenCom:boolean = false;
  isOpenFin:boolean = false;
  isOpenSup:boolean = false;

  constructor(private router: Router, private alertCtrl: AlertController) { 
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
            this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
