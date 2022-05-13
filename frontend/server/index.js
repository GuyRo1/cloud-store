import express from 'express'
import * as url from 'url';
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const usersAddress = process.env.USERS_ADDRESS;
const filesAddress = process.env.FILES_ADDRESS;
const filesDataAddress = process.env.FILES_DATA_API

const app = express();



app.use("/users", createProxyMiddleware({
    target: usersAddress,
    changeOrigin: true,
    pathRewrite: {
        '^/users': ""
    }
}));

app.use("/files", createProxyMiddleware({
    target: filesAddress,
    changeOrigin: true,
    pathRewrite: {
        '^/files': ""
    }
}));

app.use("/files-data", createProxyMiddleware({
    target: filesDataAddress,
    changeOrigin: true,
    pathRewrite: {
        '^/files-data': ""
    }
}));


app.use(express.static(path.join(__dirname, "..", 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, "..", 'build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server connected, port:", port));