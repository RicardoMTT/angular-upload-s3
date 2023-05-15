import { Component } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'upload-file-s3-full';

  selectedFile!: File;
  imagePreview: string = '';
  isinValidSize: boolean = false;

  constructor(private uploadService:UploadService){}
  previewFile(event: any) {
    this.selectedFile = event.target.files[0];
    const image = new Image();
    if (this.selectedFile) {
      const reader = new FileReader(); //Para leer el contenido del archivo y asignarlo a la propiedad imagePreview como base 64
      //onload se ejecuta cuando la lectura del archivo a tecnico exito y ya tenemos la imagen en base 64
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      image.onload = () => {
        if (image.width === 60 && image.height === 60) {
          this.isinValidSize = false;
        } else {
          this.isinValidSize = true;
        }
      };
      reader.readAsDataURL(this.selectedFile);
      image.src = URL.createObjectURL(this.selectedFile);
    }
  }
  uploadFile(){

    this.uploadService.store(this.selectedFile).subscribe({
      next: (response) => {
        console.log(response);
        
      },
      error: (error) => {
        console.log(error);
        
      }
    })

  }
}
