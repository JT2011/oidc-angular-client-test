import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userDataJson: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.userDataJson = sessionStorage.getItem('userData');
  }

}
