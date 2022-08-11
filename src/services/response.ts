export default class _Response {

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

