const InputError = require('../exceptions/InputError');
const ClientError = require('../exceptions/ClientError');
const inference = require('../services/inferenceService');
const storeData = require('../services/storeData');
const { v4: uuidv4 } = require('uuid');

// Handler untuk prediksi
const predictHandler = async (req, h) => {
    try {
        const { file } = req.payload; // Mengambil file gambar dari request

        // Validasi ukuran file
        if (file.bytes > 1000000) {
            throw new InputError('Payload content length greater than maximum allowed: 1000000');
        }

        // Lakukan prediksi
        const predictionResult = await inference(file);

        // Simpan data prediksi (misalnya ke database)
        const predictionData = {
            id: uuidv4(),
            result: predictionResult.result,
            suggestion: predictionResult.suggestion,
            createdAt: new Date().toISOString(),
        };
        await storeData(predictionData);

        // Return response prediksi
        return h.response({
            status: 'success',
            message: 'Model is predicted successfully',
            data: predictionData,
        }).code(200);

    } catch (error) {
        if (error instanceof InputError || error instanceof ClientError) {
            return h.response({
                status: 'fail',
                message: error.message,
            }).code(error.statusCode);
        }

        // Generic error
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi',
        }).code(400);
    }
};

module.exports = { predictHandler };