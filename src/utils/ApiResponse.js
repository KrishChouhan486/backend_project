class ApiResponse{
  constructor(statuscode, data, message = "success"){
    this.statusCode = this.statusCode;
    this.data = data
    this.message = message
    this.success = statuscode < 400
  }
}