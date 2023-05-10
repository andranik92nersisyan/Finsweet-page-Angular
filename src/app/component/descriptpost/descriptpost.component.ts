import { Component, Input } from '@angular/core';

export interface BlogPost {
  id: number;
  img: string;
  img1?: string;
  text2?: string;
  text: string;
  textUs: string;
  dataText?: string;
  dataSpanText?: string;
  title: string;
}

@Component({
  selector: 'app-descriptpost',
  templateUrl: './descriptpost.component.html',
  styleUrls: ['./descriptpost.component.css']
})
export class DescriptpostComponent {
  @Input() elements: BlogPost[] = [];
}
