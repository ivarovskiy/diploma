import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ImageService } from 'src/app/services/image.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [MessageService],
})
export class UploadComponent {
  @Output() imageReached = new EventEmitter<void>();
  maxFileSize = 10000000;
  uploadedFiles: any[] = [];

  constructor(
    private messageService: MessageService,
    private imageService: ImageService
  ) {}

  onUpload(event: UploadEvent) {
    for (const file of event.files) {
      if (file) {
        if (this.isValidFileType(file.type)) {
          this.createImageFromBlob(file);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'File Type Error',
            detail: 'Please, check a file type',
          });
        }
      }
    }
  }

  private isValidFileType(fileType: string): boolean {
    return ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
      fileType
    );
  }

  private createImageFromBlob(file: File): void {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      const imageUrl = event.target.result;
      this.imageService.uploadImage(imageUrl, file.type);

      this.handleImage();
    };

    reader.readAsDataURL(file);
  }

  private handleImage() {
    this.imageReached.emit();
  }
}
