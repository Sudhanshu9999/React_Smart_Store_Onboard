import { create } from "domain";
import { FileService } from "./file-service";

class FormDataService {
  constructor() {
    // this.url = 'http://10.21.53.124:8080/';
    this.fileService = new FileService();
  }

  async uploadFormData(data, EncryptedRequest1, guId, basic) {
    console.log("EncryptedRequest1", EncryptedRequest1);
    const data1 = new FormData();
    data1.append("taskFile", data);
    data1.append("requestBody", EncryptedRequest1);
    
    console.log("data1 Console", data1);
    return await this.fileService.uploadFileToServer(data1, guId, basic);
  }
}

export default new FormDataService();
