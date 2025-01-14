const http = require('http');
const url = require('url');
const query = require('querystring');

const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/success': responseHandler.success,
    '/badRequest': responseHandler.badRequest,
    '/unauthorized': responseHandler.unauthorized,
    '/forbidden': responseHandler.forbidden,
    '/internal': responseHandler.internal,
    '/notImplemented': responseHandler.notImplemented,
    notFound: responseHandler.notFound
};

const onRequest = (request, response) =>{
    const parsedUrl = url.parse(request.url);
    const acceptedTypes = request.headers.accept.split(',');
    const params = query.parse(parsedUrl.query);

    if(urlStruct[parsedUrl.pathname])
    {
        urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
    }
    else
    {
        urlStruct.notFound(request, response, acceptedTypes, params);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on port: ${port}`);