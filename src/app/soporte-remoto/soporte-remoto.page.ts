import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-soporte-remoto',
  templateUrl: './soporte-remoto.page.html',
  styleUrls: ['./soporte-remoto.page.scss'],
})
export class SoporteRemotoPage implements OnInit {
  
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  stream: MediaStream | null = null;

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.startCamera();
  }

  async startCamera() {
    try {
      // Solicita acceso a la cámara frontal
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' } // 'user' para cámara frontal
      });

      // Conecta el flujo de la cámara al elemento de video
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (error) {
      console.error('Error al acceder a la cámara: ', error);
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}
