import "reflect-metadata";
import { createApp } from './app';

async function start() {
    const app = await createApp();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

start();
