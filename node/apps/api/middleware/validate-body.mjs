import { ZodError } from 'zod';

export default function validateBody(schema) {
    return (req, _res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => (
                    `${issue.path.join('.')}: {issue.message}`
                )).join('\n');

                next(new Error(errorMessages));
                return;
            }

            next(error);
        }
    };
}