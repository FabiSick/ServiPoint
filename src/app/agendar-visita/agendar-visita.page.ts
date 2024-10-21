import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-agendar-visita',
  templateUrl: './agendar-visita.page.html',
  styleUrls: ['./agendar-visita.page.scss'],
})
export class AgendarVisitaPage implements OnInit {

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map!: GoogleMap;
  selectedAddress: string = '';
  selectedDate: string = '';   // Variable para almacenar la fecha seleccionada
  selectedTime: string = '';   // Variable para almacenar el horario seleccionado
  userAddress: string = '';    // Variable para almacenar la dirección del usuario

  // Horarios disponibles
  availableTimes: string[] = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ];

  constructor(private router: Router, private storage: Storage, private platform: Platform) { }

  async ngOnInit() {
    await this.platform.ready();
    this.loadMap();
  }

  // Cargar el mapa
  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: -33.4489, lng: -70.6693 }, // Santiago, Chile (ejemplo)
        zoom: 14,
        tilt: 30
      }
    });

    // Evento para capturar el click en el mapa
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((event) => {
      this.addMarker(event[0].lat, event[0].lng);
    });
  }

  // Añadir marcador y obtener la dirección
  addMarker(lat: number, lng: number) {
    const marker: Marker = this.map.addMarkerSync({
      position: { lat, lng },
      animation: GoogleMapsAnimation.BOUNCE
    });

    // Aquí podrías usar un servicio de Google Places para obtener la dirección.
    this.selectedAddress = `Lat: ${lat}, Lng: ${lng}`;
  }

  // Método para agendar la visita
  scheduleVisit() {
    if (this.selectedAddress) {
      console.log('Visit scheduled at: ', this.selectedAddress);
      alert(`Visita agendada en: ${this.selectedAddress}`);
    } else {
      alert('Por favor, selecciona una ubicación en el mapa.');
    }
  }

  // Método que se ejecuta al enviar el formulario
  async onSubmit() {
    if (this.selectedDate && this.selectedTime && this.userAddress) {
      const visitDetails = {
        date: this.selectedDate,
        time: this.selectedTime,
        address: this.userAddress
      };
      console.log('Visita agendada:', visitDetails);
      
      // Mostrar mensaje de éxito y redirigir a la página principal
      alert('Visita agendada exitosamente!');
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

}