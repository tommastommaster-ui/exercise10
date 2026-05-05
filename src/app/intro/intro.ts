import { Component } from '@angular/core';
import { RouterLink } from '@angular/router' //um die anderen seite zu verbiden


@Component({
  selector: 'app-intro',
  imports: [RouterLink],
  templateUrl: './intro.html',
  styleUrl: './intro.css',
})
export class Intro {}
