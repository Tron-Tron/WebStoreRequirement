class SuccessResponse {
  constructor(code, data, success = true) {
    this.success = success;
    this.code = code;
    this.data = data;
  }
}
export default SuccessResponse;
