"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return formatMinutes(minutes);
}
exports.default = calculateReadingTime;
function formatMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0 && mins > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    }
    else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    else if (mins > 0) {
        return `${mins} minute${mins > 1 ? 's' : ''}`;
    }
    else {
        return '0 minutes';
    }
}
//# sourceMappingURL=calculateReadingTime.js.map