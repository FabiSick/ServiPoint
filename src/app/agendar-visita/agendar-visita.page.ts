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
  selectedDate: string = '';   
  selectedTime: string = '';   
  userAddress: string = '';    

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

  // Formatear la fecha ingresada
  formatDate(event: any) {
    let input = event.target.value;

    // Remover cualquier carácter que no sea un número
    input = input.replace(/\D/g, '');

    // Agregar slash (/) en las posiciones adecuadas
    if (input.length > 2 && input.length <= 4) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    } else if (input.length > 4) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4) + '/' + input.substring(4, 8);
    }

    this.selectedDate = input;
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.getCurrentPosition(); // Asegúrate de tener los permisos
    await this.loadMap();
  }

  async loadMap() {
    try {
      // Espera hasta que el elemento mapElement esté disponible
      if (!this.mapElement || !this.mapElement.nativeElement) {
        console.error('Contenedor del mapa no disponible');
        return;
      }

      this.map = await GoogleMap.create({
        id: 'map_canvas',
        element: this.mapElement.nativeElement,
        apiKey: 'AIzaSyBvY0-gft1SZhRgRfEuN_NdAEk9yv-3A2o', // Reemplaza con tu Google Maps API key
        config: {
          center: {
            lat: -33.4489, 
            lng: -70.6693 
          },
          zoom: 14,
        },
      });

      // Configurar el evento click en el mapa
      this.map.setOnMapClickListener(async (event) => {
        if (event.latitude && event.longitude) {
          await this.addMarker(event.latitude, event.longitude);
        }
      });
    } catch (error) {
      console.error('Error al cargar el mapa:', error);
    }
  }

  async getCurrentPosition() {
    const permission = await Geolocation.requestPermissions();
    if (permission.location === 'granted') {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    } else {
      console.error('Permiso de ubicación no concedido');
    }
  }
  
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
      this.selectedAddress = `Lat: ${lat}, Lng: ${lng}`;
    } catch (error) {
      console.error('Error al añadir marcador:', error);
    }
  }

  scheduleVisit() {
    if (this.selectedAddress) {
      console.log('Visit scheduled at: ', this.selectedAddress);
      alert(`Visita agendada en: ${this.selectedAddress}`);
    } else {
      alert('Por favor, selecciona una ubicación en el mapa.');
    }
  }

  async onSubmit() {
    if (this.selectedDate && this.selectedTime && this.userAddress) {
      const visitDetails = {
        date: this.selectedDate,
        time: this.selectedTime,
        address: this.userAddress
      };
      console.log('Visita agendada:', visitDetails);
      alert('Visita agendada exitosamente!');
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
