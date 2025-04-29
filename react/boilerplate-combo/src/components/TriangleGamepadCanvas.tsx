import React, { useEffect, useRef, useState } from 'react';

const colors = ['red', 'green', 'blue'];

const TriangleGamepadCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [angle, setAngle] = useState(0);
    const [position, setPosition] = useState({ x: 150, y: 150 });
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const drawTriangle = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(position.x, position.y);
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, -30); // tip
            ctx.lineTo(20, 20);
            ctx.lineTo(-20, 20);
            ctx.closePath();

            ctx.fillStyle = colors[colorIndex];
            ctx.fill();

            ctx.restore();
        };

        drawTriangle();
    }, [angle, position, colorIndex]);

    useEffect(() => {
        let animationId: number;
        let lastXPressed = false;

        const update = () => {
            const gamepads = navigator.getGamepads();
            const gp = gamepads[0];

            if (gp) {
                const newPos = { ...position };

                // Move with D-Pad (absolute screen directions)
                if (gp.buttons[12].pressed) newPos.y -= 5; // Up
                if (gp.buttons[13].pressed) newPos.y += 5; // Down
                if (gp.buttons[14].pressed) newPos.x -= 5; // Left
                if (gp.buttons[15].pressed) newPos.x += 5; // Right

                setPosition(newPos);

                // Rotate with LB (4) and RB (5)
                if (gp.buttons[4].pressed) setAngle(a => a - 0.05);
                if (gp.buttons[5].pressed) setAngle(a => a + 0.05);

                // Change color on X (button 2) press (debounced)
                if (gp.buttons[2].pressed) {
                    if (!lastXPressed) {
                        setColorIndex(i => (i + 1) % colors.length);
                        lastXPressed = true;
                    }
                } else {
                    lastXPressed = false;
                }
            }

            animationId = requestAnimationFrame(update);
        };

        animationId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(animationId);
    }, [position]);

    return (
        <div>
            <h3 style={{ color: 'white' }}>Triangle Controller (Gamepad)</h3>
            <canvas
                ref={canvasRef}
                width={300}
                height={300}
                style={{ border: '1px solid white', backgroundColor: 'black' }}
            />
        </div>
    );
};

export default TriangleGamepadCanvas;
