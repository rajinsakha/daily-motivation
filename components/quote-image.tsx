import React, { useRef, useEffect } from 'react';

interface QuoteImageProps {
  quote: string;
  author: string;
  onCanvasReady: (canvas: HTMLCanvasElement) => void;
}

const QuoteImage: React.FC<QuoteImageProps> = ({ quote, author, onCanvasReady }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (adjust as needed)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background
    ctx.fillStyle = '#18181B'; // Dark background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Quote text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Geist Sans, sans-serif';
    ctx.textAlign = 'center';
    
    const words = quote.split(' ');
    let line = '';
    let y = canvas.height / 2 - 100;
    
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > canvas.width - 100 && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + ' ';
        y += 60;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Author
    ctx.font = 'italic 32px Geist Sans, sans-serif';
    ctx.fillText(`- ${author}`, canvas.width / 2, y + 80);

    // Add a subtle watermark
    ctx.font = '24px Geist Sans, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillText('DailyMotive', canvas.width - 100, canvas.height - 50);

    // Call the callback with the canvas
    onCanvasReady(canvas);
  }, [quote, author, onCanvasReady]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};

export default QuoteImage;

