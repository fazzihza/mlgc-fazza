const tf = require('@tensorflow/tfjs-node');

// Fungsi untuk melakukan prediksi
const inference = async (fileBuffer) => {
    
    // Proses file buffer menjadi tensor
    const imageTensor = tf.node.decodeImage(fileBuffer, 3) // 3 untuk RGB
        .resizeBilinear([224, 224]) // Sesuaikan dengan ukuran input model
        .expandDims(0) // Tambahkan batch dimension
        .toFloat()
        .div(tf.scalar(255)); // Normalisasi

    // Lakukan prediksi
    const prediction = model.predict(imageTensor);
    const predictedClass = prediction.argMax(-1).dataSync()[0];

    // Konversi hasil prediksi ke kategori
    const labels = ['Non-cancer', 'Cancer']; // Label sesuai output model
    const result = labels[predictedClass];

    return {
        result,
        suggestion: result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
    };
};

module.exports = inference;