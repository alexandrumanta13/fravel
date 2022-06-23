import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Layout } from './layout.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layout!: Layout;
  
  
  constructor(
    private _activatedRoute: ActivatedRoute,
   
    //private _authService: AuthAPIService,
  ) { }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot) {
      this.layout = this._activatedRoute.snapshot.data['layout'];
    }

    //this._authService.autoLogin();
  }

  ngAfterViewInit() {

  }

}
