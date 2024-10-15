

export const errorHandler = (err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (err.code && err.code === 11000) {
        res.status(409).json({ errorMessages: ['User already exists'] });
    }
    if (err.name === 'ValidationError') {
        let errorMessages = Object.values(err.errors).map(elm => elm.message);
        res.status(400).json({ errorMessages });
    }
    if (!res.headersSent) {
        res.status(500).json({ errorMessages: "Internal server error. Check the server console" });
    }
};