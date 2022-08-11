
export enum Message {
    Ok = "Fetch data successfully ✅✅",
    Fetched = "Fetch data successfully ✅✅",
    Created ="Created Successfully  ✅✅",
    Updated = "Updated Successfully ✅✅",
    Deleted = "Deleted Successfully ✅✅",
    Notfound = "NotFound ❌📛❌",
    WrongPassword = "Wrong password ❌📛❌",
    WrongUsername = "Wrong username ❌📛❌",
    AuthFailed = "Authorise Token Failed",
    Logined = "Logined Successfull ✅✅",
    Error = "❌📛❌ Occure some error while processing. Error code 500 ❌📛❌"
}
export enum Code {
    Ok = 200,
    RequestData = 400,
    AuthFailed = 401,
    ExistData = 402,
    Notfound = 404,
    Incorrect = 405,
    NoContent = 409,
    NotSuccess = 300,
    Error = 500,
    ApiKeyRequire = 301
}
export default class Results {
    public static getResponse(message: string, status: number, data: any): object {
        const rs = {
            message: message,
            status: status,
            data: data
        }
        return rs
    }
    public static Fail(message: string, data: any): object {
        const rs = {
            message: message,
            status: false,
            data: data
        }
        return rs
    }
    public static Success(message: string, data: any): object {
        const rs = {
            message: message,
            status: true,
            data: data
        }
        return rs
    }

    public static fail(message: string, data: any): object {
        const rs = {
            message: message,
            status: false,
            data: data
        }
        return rs
    }
    public static success(message: string, data: any): object {
        const rs = {
            message: message,
            status: true,
            data: data
        }
        return rs
    }
}

