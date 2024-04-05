// Importation des modules HTTP et fs
const http = require('http');
const fs = require('fs');
const path = require('path');


// Liste des répertoires autorisés
// const allowedDirectories = [
//     path.join('Vue', 'assets', 'css'),
//     path.join('Vue', 'assets', 'js'),
//     path.join('Vue', 'assets', 'images'),
//     path.join('Vue', 'pages')
// ];



function serveHTML(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier HTML:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erreur interne du serveur');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function serveCSS(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier CSS:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erreur interne du serveur');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
    });
}

function serveJS(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier JS:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erreur interne du serveur');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
    });
}


function serveFavicon(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier favicon.ico:', err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Erreur interne du serveur');
            return;
        }

        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end(data);
    });
}


// Fonction pour gérer les requêtes
const handleRequest = (req, res) => {
    // Récupération de l'URL demandée par le client
    const url = req.url

    console.log('req.url ', url);

    let filePath = path.join(__dirname, 'Vue');



    switch (path.extname(url)) {
        case '.html':
            filePath = path.join(filePath, 'pages', url)
            console.log(filePath)
            serveHTML(filePath, res)
            break;
        case '.css':
            filePath = path.join(filePath, url)
            console.log(filePath)
            serveCSS(filePath, res)
            break;
        case '.js':
            filePath = path.join(filePath, url)
            console.log(filePath)
            serveJS(filePath, res)
            break;
        case '.ico':
            filePath = path.join(filePath, 'assets', 'images', url)
            console.log(filePath)
            serveFavicon(filePath, res)
            break;
        default:
            break;
    }

};





// Création du serveur HTTP
const server = http.createServer(handleRequest);

// Définition du port sur lequel le serveur écoutera les requêtes
const port = 3000;

// Démarrage du serveur et écoute des requêtes sur le port spécifié
server.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
