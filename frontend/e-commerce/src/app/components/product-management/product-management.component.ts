import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DataService } from 'src/app/services/data/data.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    FileUploadModule,
    InputTextareaModule,
    InputNumberModule,
    ToastModule,
  ],
  providers: [MessageService, DataService],
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  products = [];
  productDialog = false;
  addDialog = false;
  blobfile: any;
  editMode = false;
  selectedProductId: any;
  @ViewChild('fileupload') fileupload!: any;
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0.01)]),
    image: new FormControl('', [Validators.required]),
  });
  constructor(
    private messageService: MessageService,
    private dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dataService.getMyProducts().subscribe((data: any) => {
      this.products = data;
      sessionStorage.setItem('products', JSON.stringify(this.products));
    });
  }

  populateForm(product: any) {
    this.productForm.reset();
    this.fileupload.clear();
    this.productForm.patchValue(product);
    let file = 'data:' + product.content_type + ';base64,' + product.image;
    this.blobfile = this.dataURItoFile(file, product.name);
    this.productForm.patchValue({
      image: this.blobfile,
    });
    this.fileupload.files = [this.blobfile];
    this.selectedProductId = product._id;
    this.editMode = true;
    this.addDialog = true;
  }

  onFileChange(event: any) {
    const file = event.files[0];
    if (file) {
      //this.convertToBase64(file);
      this.productForm.patchValue({
        image: file,
      });
    }
  }

  /* convertToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.productForm.patchValue({
        image: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  } */
  dataURItoFile(dataURI: string, fileName: string): File {
    const byteString = atob(dataURI.split(',')[1]);
    const content_type = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ia], { type: content_type });
    return new File([blob], fileName, { type: content_type });
  }

  onSubmit() {
    const productData = this.productForm.value;
    const formData = new FormData();
    formData.append('name', productData.name!);
    formData.append(
      'quantity',
      productData.quantity ? productData.quantity.toString() : '1'
    );
    formData.append('description', productData.description!);
    formData.append(
      'price',
      productData.price ? productData.price.toString() : '1'
    );
    formData.append('image', productData.image!);
    if (this.editMode) {
      this.dataService
        .updateProduct(formData, this.selectedProductId)
        .subscribe(
          (res: any) => {
            this.productForm.reset();
            this.fileupload.clear();
            this.selectedProductId = null;
            this.editMode = false;
            this.addDialog = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product updated successfully',
            });
            this.getProducts();
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product update Failed',
            });
          }
        );
    } else {
      this.dataService.addProduct(formData).subscribe(
        (res: any) => {
          this.productForm.reset();
          this.fileupload.clear();
          this.selectedProductId = null;
          this.editMode = false;
          this.addDialog = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product added successfully',
          });
          this.getProducts();
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: "Can't Add Product",
          });
        }
      );
    }
  }
}
