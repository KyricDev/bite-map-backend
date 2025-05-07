abstract class Logger {
    static print(log) {
        if (process.env.NODE_ENV === 'development') {
            console.log(log);
        }
    }
}

export {
    Logger
}