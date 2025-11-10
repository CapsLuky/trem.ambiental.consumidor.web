export class PayloadModel {
  Success = false;
  Payload = new Array<any>();
  Errors = new Array<any>();

  constructor(success: boolean, payload: Array<string>, errors: Array<string>) {
    this.Success = success;
    this.Payload = payload;
    this.Errors = errors;
  }
}
