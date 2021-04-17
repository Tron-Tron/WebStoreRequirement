class SuccessResponse {
  constructor(code, data, success = false) {
    this.success = success;
    this.code = code;
    this.data = data;
  }
}
export default SuccessResponse;
