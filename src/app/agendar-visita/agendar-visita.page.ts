import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
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
    await this.loadMap();
  }

  // Cargar el mapa
  async loadMap() {
    try {
      this.map = await GoogleMap.create({
        id: 'map_canvas', // Unique id for the map
        element: this.mapElement.nativeElement, // Reference to the map container
        apiKey: 'AIzaSyBHHC_AzV2XjU-thLST2JHEB7Lgl6o72sk', // Reemplaza con tu Google Maps API key
        config: {
          center: {
            lat: -33.4489,
            lng: -70.6693 // Santiago, Chile (ejemplo)
          },
          zoom: 14,
        },
      });

      // Evento para capturar el click en el mapa
      this.map.setOnMapClickListener(async (event) => {
        if (event.latitude && event.longitude) {
          const lat = event.latitude;
          const lng = event.longitude;
          await this.addMarker(lat, lng);
        }
      });
    } catch (error) {
      console.error('Error cargando el mapa:', error);
    }
  }

  // Añadir marcador y obtener la dirección
  async addMarker(lat: number, lng: number) {
    const marker: Marker = {
      coordinate: {
        lat,
        lng
      },
      title: "Ubicación seleccionada",
      snippet: `Lat: ${lat}, Lng: ${lng}`
    };

    try {
      await this.map.addMarker(marker);
      // Aquí podrías usar un servicio de Google Places para obtener la dirección.
      this.selectedAddress = `Lat: ${lat}, Lng: ${lng}`;
    } catch (error) {
      console.error('Error al añadir marcador:', error);
    }
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
