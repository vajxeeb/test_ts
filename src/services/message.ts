
export enum Message {

    Ok = "OK",
    Notfound = "NotFound",
    PasswordIncorrect = "PasswordIncorrect",
    AuthFailed = "Authorise Token Failed",
    Success = "true",
    Failed = "false"

}

export enum Code {

    Ok = 200,
    Error = 500,
    Notfound = 404,
    ExistData = 400,
    PasswordIncorrect = 405,
    AuthFailed = 401

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

