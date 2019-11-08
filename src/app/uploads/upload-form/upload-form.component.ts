import { Component, EventEmitter, Output} from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from "lodash";

@Component({
  selector: 'upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
  providers: [UploadService],
})
export class UploadFormComponent{

  selectedFiles: FileList;
  currentUpload: Upload;
  imageUrl: string;
  @Output() urlEmitter = new EventEmitter();

  constructor(private upSvc: UploadService) { }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

   async uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload);
    this.imageUrl = await this.upSvc.getImageUrl(this.currentUpload);
    console.log("imageUrl from upload-form component");
    console.log(this.imageUrl);
    this.urlEmitter.emit(this.imageUrl);
  }

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload)}
    )
  }


}
