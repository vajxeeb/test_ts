
export enum Message {
    Ok = "OK",
    Notfound = "NotFound",
    PasswordIncorrect = "Password Incorrect",
    AuthFailed = "Authorise Token Failed",
    Success = "true",
    Failed = "false"
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
    public static Success(message: string, data: object): object {
        const rs = {
            message: message,
            status: true,
            data: data
        }
        return rs
    }
    public static Fail(message: string, data: object): object {
        const rs = {
            message: message,
            status: false,
            data: data
        }
        return rs
    }
}

