import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as  L from 'leaflet';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [],
  templateUrl: './leaflet.component.html',
  styleUrl: './leaflet.component.scss'
})
export class LeafletComponent implements OnInit,AfterViewInit{
  private map!: L.Map
  @Input() x: number = 0;
  @Input() y: number = 0;
  markers: L.Marker[] = [
    L.marker([this.x,this.y]) 
  ];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap();
    this.centerMap();
  }


  private initMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer(baseMapURl).addTo(this.map);
  }


  private centerMap() {
    // Create a boundary based on the markers
    const bounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
    
    // Fit the map into the boundary
    this.map.fitBounds(bounds);
  }
}
