const respond = (request, response, status, content, type) => {
    response.writeHead(status, { 'Content-Type': type});
    response.write(content);
    response.end();
}

const success = (request, response, acceptedTypes) => {
    const resp ={
        message: "This is a successful response",
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 200, respString, 'application/json');
}

const badRequest = (request, response, acceptedTypes, params) => {
    const resp ={
        message: "This request has the required parameters",
    }

    if(!params.valid || params.valid !== 'true')
    {
        resp.message = 'Missing valid query parameter set equal to true';
        resp.id = 'badRequest';

        if(acceptedTypes[0] === 'text/xml')
        {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

            return respond(request, response, 400, responseXML, 'text/xml');
        }

        const respString = JSON.stringify(resp);

        return respond(request, response, 400, respString, 'application/json');
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 200, respString, 'application/json');
}

const unauthorized = (request, response, acceptedTypes, params) => {
    const resp ={
        message: "This request is authorized",
    }

    if(!params.loggedIn || params.loggedIn !== 'yes')
    {
        resp.message = 'Missing loggedIn query parameter set equal to yes';
        resp.id = 'unauthorized';

        if(acceptedTypes[0] === 'text/xml')
        {
            let responseXML = '<response>';
            responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

            return respond(request, response, 401, responseXML, 'text/xml');
        }

        const respString = JSON.stringify(resp);

        return respond(request, response, 401, respString, 'application/json');
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> </response>`;

        return respond(request, response, 200, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 200, respString, 'application/json');
}


const forbidden = (request, response, params, acceptedTypes) => {
    const resp ={
        message: "You are not authorized to view this page",
        id: 'forbidden',
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

        return respond(request, response, 403, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 403, respString, 'application/json');
}

const internal = (request, response, params, acceptedTypes) => {
    const resp ={
        message: "Internal server error",
        id: 'internal',
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

        return respond(request, response, 500, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 500, respString, 'application/json');
}

const notImplemented = (request, response, params, acceptedTypes) => {
    const resp ={
        message: "The page you were looking has not been implemented yet",
        id: 'notImplemented',
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

        return respond(request, response, 501, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 501, respString, 'application/json');
}

const notFound = (request, response, params, acceptedTypes) => {
    const resp ={
        message: "The page you were looking for was not found",
        id: 'notFound',
    }

    if(acceptedTypes[0] === 'text/xml')
    {
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${resp.message}</message> <id>${resp.id}</id> </response>`;

        return respond(request, response, 404, responseXML, 'text/xml');
    }

    const respString = JSON.stringify(resp);

    return respond(request, response, 404, respString, 'application/json');
}


module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
};