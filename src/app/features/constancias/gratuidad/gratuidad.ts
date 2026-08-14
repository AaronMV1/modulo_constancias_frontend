

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Http } from '../../../core/services/http';


import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    tablerStar,
    tablerUsers,
    tablerExclamationCircle
} from '@ng-icons/tabler-icons';


import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
    selector: 'app-gratuidad',
    imports: [FormsModule, CommonModule, NgIcon],
    providers: [
        provideIcons({
            tablerStar,
            tablerUsers,
            tablerExclamationCircle,
        })
    ],
    templateUrl: './gratuidad.html',
    styleUrl: './gratuidad.css',
})


export class Gratuidad implements OnInit {


    correlativo: string = '';
    fechaEmision: string = new Date().toISOString().split('T')[0];
    tesista1: string = '';
    tesista1Genero: string = '';
    tesista2: string = '';
    tesista2Genero: string = '';
    sede: string = 'Chorrillos';
    carrera: string = '';
    titulo: string = '';


    ngOnInit() {
        this.testCampos();
    }


    url: SafeResourceUrl | null = null;
    private pdfObjectUrl: string | null = null;


    constructor( private _http: Http, private readonly cdr: ChangeDetectorRef, private sanitizer: DomSanitizer ) { }


    enviarConstancia() {

        const req = {
            tesista1: this.tesista1,
            tesista1Genero: this.tesista1Genero,
            tesista2: this.tesista2,
            tesista2Genero: this.tesista2Genero,
            sede: this.sede,
            escuelaProfesional: this.carrera,
            tesisTitulo: this.titulo,
            tesisCorrelativo: this.correlativo,
            usuario: "usuario"
        }

        this._http.postBlob(req, 'enviar-constancia-gratuidad').subscribe({

            next: (pdf: Blob) => {

                // this.limpiarCampos();

                const url = window.URL.createObjectURL(pdf);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'constancia-gratuidad.pdf';
                a.click();

                window.URL.revokeObjectURL(url);


                if (this.pdfObjectUrl) {                                                                // Liberar el PDF anterior, si existe
                    URL.revokeObjectURL(this.pdfObjectUrl);
                }


                this.pdfObjectUrl = URL.createObjectURL(pdf);                                           // Crear URL temporal del nuevo PDF


                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfObjectUrl);            // Permitir que Angular la utilice en el embed


                this.cdr.detectChanges();


            },

            error: (error) => {
                console.error(error);
            }

        });

    }


    limpiarCampos() {

        this.correlativo = '';
        this.tesista1 = '';
        this.tesista1Genero = '';
        this.tesista2 = '';
        this.tesista2Genero = '';
        this.sede = 'Chorrillos';
        this.carrera = '';
        this.titulo = '';

        this.cdr.detectChanges();

    }


    /*  TEST  */


    testCampos() {
        this.correlativo = '001-2026-DGIRS-UPSJB';
        this.tesista1 = 'Christian Aarón Mori Valdivia';
        this.tesista1Genero = 'H';
        this.tesista2 = 'Alexandra Fernanda Chipa Uzategui';
        this.tesista2Genero = 'M';
        this.sede = 'Chorrillos';
        this.carrera = '8';
        this.titulo = 'Implementación de un Sistema Web para la Emisión de Constancias de Gratuidad en la Universidad Privada San Juan Bautista';
    }


}
