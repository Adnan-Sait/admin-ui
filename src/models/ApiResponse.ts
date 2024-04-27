export default class ApiResponse<T> {
  data: T;
  message: string;
  error: boolean;
  statusCode?: number;

  constructor(data: T, error = false, message = "") {
    this.data = data;
    this.error = error;
    this.message = message;
  }
}
