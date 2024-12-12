import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-chat-en-vivo',
  templateUrl: './chat-en-vivo.page.html',
  styleUrls: ['./chat-en-vivo.page.scss'],
})
export class ChatEnVivoPage implements OnInit {
  userId: number = 1; // Reemplaza con el ID dinámico del usuario

  constructor(private apiService: ApiService) {}

  abrirWhatsApp() {
    // Número de WhatsApp Business
    const phoneNumber = '56934953492'; // Código de país (+56 para Chile) seguido del número
    const message = 'Gracias por comunicarte con ServiPoint. Por favor, haznos saber cómo podemos ayudarte.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirigir al enlace de WhatsApp
    window.open(url, '_blank');

    // Crear solicitud automáticamente
    this.createWhatsAppRequest();
  }

  createWhatsAppRequest() {
    const request = {
      userId: this.userId,
      description: 'El usuario inició un chat en vivo a través de WhatsApp.',
      status: 'Pendiente',
    };

    this.apiService.createRequest(request).subscribe(
      () => console.log('Solicitud de WhatsApp creada con éxito.'),
      (error) => console.error('Error al crear la solicitud de WhatsApp:', error)
    );
  }

  ngOnInit() {}
}