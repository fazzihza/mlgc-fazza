const tf = require('@tensorflow/tfjs-node');

const inference = async (model, image) => {
    try {
        // Decode image and preprocess
        const imageTensor = tf.node
            .decodeImage(image, 3)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        // Make prediction
        const prediction = model.predict(imageTensor);
        const predictedClass = prediction.argMax(-1).dataSync()[0];

        // Map predicted class to label
        const labels = ['Non-cancer', 'Cancer'];
        const result = labels[predictedClass];

        let suggestion;
 
        if(result === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
        
        if(result === 'Non-cancer') {
            suggestion = "Penyakit kanker tidak terdeteksi."
        }

        // Create response
        return {
           result, suggestion
    
        };
    } catch (error) {
        console.error('Error during inference:', error);

        // Return error response
        return {
            status: 'fail',
            message: 'Gagal melakukan prediksi',
            data: {
                id: 'unknown-id', // Untuk menjaga format konsisten
                result: 'Unknown',
                suggestion: 'Gagal melakukan prediksi',
            },
        };
    }
};

module.exports = inference;
