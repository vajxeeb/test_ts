
export enum Message {
    Ok = "OK",
    Created ="Created Successfull ✔",
    Updated = "Updated Successfull ✔",
    Deleted = "Deleted Successfull ✔",
    Notfound = "NotFound 🙌",
    PasswordIncorrect = "Password Incorrect",
    AuthFailed = "Authorise Token Failed",
    Logined = "Logined Successfull ✔"
}
export enum Code {
    Ok = 200,
    RequestData = 400,
    AuthFailed = 401,
    ExistData = 402,
    Notfound = 404,
    Incorrect = 405,
    Error = 500,
}
export default class Results {
    public static Success(message: string, data: any): object {
        const rs = {
            message: message,
            status: true,
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
}

