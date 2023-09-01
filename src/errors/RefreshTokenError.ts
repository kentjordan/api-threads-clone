export default class RefreshTokenError extends Error {
    constructor(message: string) {
        super(message);
    }
}