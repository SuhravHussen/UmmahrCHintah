"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/nestjs");
const profiling_node_1 = require("@sentry/profiling-node");
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        (0, profiling_node_1.nodeProfilingIntegration)(),
        Sentry.extraErrorDataIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
});
//# sourceMappingURL=instrument.js.map