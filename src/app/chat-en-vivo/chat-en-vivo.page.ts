import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-en-vivo',
  templateUrl: './chat-en-vivo.page.html',
  styleUrls: ['./chat-en-vivo.page.scss'],
})
export class ChatEnVivoPage implements OnInit {

  constructor() { }
  abrirWhatsApp() {
    // Número de WhatsApp Business (cambiar por el número deseado)
    const phoneNumber = '56934953492'; // Código de país (+56 para Chile) seguido del número (sin símbolos)

    // Mensaje opcional predefinido
    const message = 'Gracias por comunicarte con ServiPoint. Por favor, haznos saber cómo podemos ayudarte.';

    // Enlace completo de WhatsApp
    const url = `https://wa.me/${56934953492}?text=${encodeURIComponent(message)}`;

    // Redirigir al enlace de WhatsApp
    window.open(url, '_blank');
  }

  ngOnInit() {
  }

}
