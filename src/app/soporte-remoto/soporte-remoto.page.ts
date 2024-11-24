import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-soporte-remoto',
  templateUrl: './soporte-remoto.page.html',
  styleUrls: ['./soporte-remoto.page.scss'],
})
export class SoporteRemotoPage implements OnInit {

  constructor(private platform: Platform) { }

  async ngOnInit() {
    // Verifica que la plataforma esté lista antes de iniciar la cámara
    if (this.platform.is('capacitor')) {
      await this.startCamera();
    }
  }

  // Inicia la cámara
  async startCamera() {
    // Solicita el permiso de cámara
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      // Oculta la webview para que la cámara esté en la vista
      BarcodeScanner.hideBackground();
      await BarcodeScanner.startScan({ targetedFormats: [] });
    } else {
      console.error('Permiso de cámara denegado');
    }
  }

  // Para la cámara
  stopCamera() {
    BarcodeScanner.stopScan();
  }
}



 


