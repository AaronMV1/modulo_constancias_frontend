

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateHeader } from "../header/header";
import { PrivateFooter } from "../footer/footer";


@Component({
    selector: 'app-content-full',
    imports: [RouterOutlet, PrivateHeader],
    templateUrl: './content-full.html',
    styleUrl: './content-full.css',
})


export class PrivateContentFull {}

