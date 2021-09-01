import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {
  total_pages: number;
  data: Competition[];
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getTotalCount().subscribe((response: ApiResponse) => {
      this.total_pages = response.total_pages;
      this.data = response.data;
    });
  }

  getTotalCount() {
    return this.http.get('https://jsonmock.hackerrank.com/api/football_competitions?page=1');
  }

  fakeArray(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }
  getPageInfo(page: number) {
    this.getInfo(page).subscribe((response: ApiResponse) => {
      this.data = response.data;
    })
  }
  
  getInfo(page) {
    return this.http.get('https://jsonmock.hackerrank.com/api/football_competitions?page='+page);
  } 
}
