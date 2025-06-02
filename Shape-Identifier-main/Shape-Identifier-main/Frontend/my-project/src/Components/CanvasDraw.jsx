import React, { useRef, useState, useEffect } from 'react';

const CanvasDraw = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const fileInputRef = useRef(null); 
  const [isDrawing, setIsDrawing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 400;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctxRef.current = ctx;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    ctxRef.current.fillStyle = 'white';
    ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
    setPrediction(null);
    setImageFile(null);

    if (fileInputRef.current)
    {
      fileInputRef.current.value = '';
    }
  };

  const predictFromCanvas = async () => {
    const canvas = canvasRef.current;
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'drawing.png');
      await sendPredictionRequest(formData);
    }, 'image/png');
  };

  const predictFromImage = async () => {
    if (!imageFile) return alert("Please upload an image.");
    const formData = new FormData();
    formData.append('file', imageFile);
    await sendPredictionRequest(formData);
  };

  const sendPredictionRequest = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/get-shape/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Prediction failed');
      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Error:', error);
      setPrediction({ error: 'Failed to get prediction' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Draw or Upload a Shape</h2>

      <canvas
        ref={canvasRef}
        className="border-2 border-gray-800 rounded-md cursor-crosshair bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
        >
          Clear
        </button>
        <button
          onClick={predictFromCanvas}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
        >
          Predict from Drawing
        </button>
      </div>

      <div className="mt-6 w-full max-w-xs text-center">
        <input
          type="file"
          accept="image/*"
          ref = {fileInputRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          className="block w-full text-sm text-gray-700 border rounded p-2 mt-2"
        />
        <button
          onClick={predictFromImage}
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow w-full"
        >
          Predict from Uploaded Image
        </button>
      </div>

      {prediction && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-md w-80 text-center">
          {prediction.error ? (
            <p className="text-red-600 font-medium">{prediction.error}</p>
          ) : (
            <>
              <p className="text-gray-800">
                <strong>Predicted:</strong> {prediction.predicted_label}
              </p>
              <p className="text-gray-800">
                <strong>Confidence:</strong> {(prediction.confidence * 100).toFixed(2)}%
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CanvasDraw;
