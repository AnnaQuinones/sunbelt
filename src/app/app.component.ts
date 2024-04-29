import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    private apiService: CustomerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  formCustomer = new FormGroup({
    documentType: new FormControl('', Validators.required),
    documentNumber: new FormControl('', Validators.required),
  });

  displayedColumns: string[] = ['firstName', 'secondName', 'surname', 'secondSurname', 'phone', 'address', 'cityResidence'];
  dataSource = new MatTableDataSource<any>();
  showTable = false;

  translateColumnName(column: string): string {
    switch (column) {
      case 'firstName':
        return 'Primer Nombre';
      case 'secondName':
        return 'Segundo Nombre';
      case 'surname':
        return 'Primer Apellido';
      case 'secondSurname':
        return 'Segundo Apellido';
      case 'phone':
        return 'Teléfono';
      case 'address':
        return 'Dirección';
      case 'cityResidence':
        return 'Ciudad de Residencia';
      default:
        return column;
    }
  }

  showCustomer() {
    if (this.formCustomer.invalid) {
      // Si el formulario no es válido, marca todos los campos como "touched" para mostrar los mensajes de error
      this.markFormGroupTouched(this.formCustomer);
      return;
    }
    const data = { 
      documentType: this.formCustomer.value.documentType, 
      documentNumber: this.formCustomer.value.documentNumber 
    };
    this.apiService.postData(data).subscribe(
      (response: any) => {
        const dataArray = [response];
        this.dataSource.data = dataArray; 
        this.showTable = true;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error ' + error.status,
          text: error.error.message,
        });
      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}