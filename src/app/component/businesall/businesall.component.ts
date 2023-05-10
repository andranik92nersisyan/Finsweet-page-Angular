import { Component, Input } from '@angular/core';

export interface BlogPost {
  id: number;
  img: string;
  img1: string;
  text2: string;
  text: string;
  textUs: string;
  dataText: string;
  dataSpanText: string;
  title: string;
}
@Component({
  selector: 'app-businesall',
  templateUrl: './businesall.component.html',
  styleUrls: ['./businesall.component.css']
})
export class BusinesallComponent {
  @Input() elements: BlogPost[] = [];
}
