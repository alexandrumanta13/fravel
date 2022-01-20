import { Component, OnInit } from '@angular/core';
import { GdprService } from '../../../core/services/gdpr/gdpr.service';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss']
})
export class GdprComponent implements OnInit {

  constructor(
    private _GdprService: GdprService
  ) { }

  ngOnInit(): void {
  }

  acceptAll() {
    this._GdprService.acceptAll();
  }
}
