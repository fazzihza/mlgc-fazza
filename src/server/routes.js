const { predictHandler } = require('./handler');

// Mendefinisikan rute untuk prediksi
const routes = [
    {
        method: 'POST',
        path: '/predict',
        options: {
            payload: {
                maxBytes: 1000000, // Maksimal ukuran file 1MB
                allow: 'multipart/form-data',
                multipart: true // Mengambil file dari request
            },
        },
        handler: predictHandler,
    },
];

module.exports = routes;