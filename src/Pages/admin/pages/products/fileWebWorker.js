/* eslint-disable no-restricted-globals */
// fileWorker.js
self.onmessage = function (e) {
    const files = e.data;

    // Process file data if needed
    const processedFiles = files.map(file => ({
        ...file,
        additionalInfo: `Processed file: ${file.name}`
    }));

    self.postMessage(processedFiles); // Send processed data back
};
