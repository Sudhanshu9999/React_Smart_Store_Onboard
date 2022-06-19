import Service from "./service";

export class FileService {
  uploadFileToServer(data, guId, basic) {
    return Service.getRestClient(guId, basic).post("", data);
  }
}
