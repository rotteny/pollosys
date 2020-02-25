import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = {
    cadastros: [
        {
          title: 'Clientes',
          url: '/menu/clientes'
        },
        {
          title: 'Fornecedores',
          url: '/menu/fornecedores'
        },
        {
          title: 'Transportadores',
          url: '/menu/transportadores'
        },
        {
          title: 'Motoristas',
          url: '/menu/motoristas'
        },
        {
          title: 'Veículos',
          url: '/menu/veiculos'
        },
        {
          title: 'Tipos de Movimentação',
          url: '/menu/tipo-movimentacao-produtos'
        },
        {
          title: 'Produtos',
          url: '/menu/produtos'
        },
        {
          title: 'Documentos Financeiros',
          url: '/menu/documentos-financeitos'
        },
      ],
    comercial: [
        {
          title: 'Preços',
          url: '/menu/precos'
        },
        {
          title: 'Notas de Vendas',
          url: '/menu/notas-vendas'
        },
      ],
    financeiro: [
        {
          title: 'Contas a Pagar',
          url: '/menu/contas-pagar'
        },
        {
          title: 'Contas a Receber',
          url: '/menu/contas-receber'
        },
      ],
    suprimentos: [
        {
          title: 'Estoque',
          url: '/menu/estoque'
        },
      ]
  };

  selectedPath: string;
  isOpenCad:boolean = false;
  isOpenCom:boolean = false;
  isOpenFin:boolean = false;
  isOpenSup:boolean = false;

  constructor(private router: Router, private alertCtrl: AlertController, public screenOrientation: ScreenOrientation) { 
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.selectedPath = this.router.url;
  }

  async presentAlertConfirm() {
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
            this.router.navigateByUrl('/menu/login');
          }
        }
      ]
    });

    await alert.present();
  }
}
