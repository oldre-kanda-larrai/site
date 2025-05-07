export default function handler(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res);
        } catch (ex) {
            next(ex);
        }
    };
}   