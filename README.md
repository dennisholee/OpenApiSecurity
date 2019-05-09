# Open API Security

## Enabling JWT token in Swagger 2.0

**Protect API endpoint with using the security definition**

http://localhost:3002/v1/api-docs

```javascript
{
    "swagger": "2.0",
    "info": {
        "title": "Open API Security Testing",
        "description": "Open API Security Testing",
        "version": "1.0.0"
    },
    "basePath": "/v1",
    "schemes": [
        "http"
    ],
    "paths": {
        "/forest": {
            "parameters": [],
            "get": {
                "description": "Get list of forest",
                "operationId": "listForest",
                "responses": {
                    "200": {
                        "description": "successful operation"
                    }
                }
            }
        }
    },
    "securityDefinitions": {
        "Bearer": {
            "description": "JWT Token",
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    },
    "host": "localhost:3002"
}
```

**Generate JWT Token**
Crude example to generate the token.
A more secure mechanism should bs used instead in real cases.
The return JWT token should be used for invoking other APIs.

```
http://localhost:3002?username={username}&password={password}
```

**Pass the JWT token as bearer to the protected API**

```bash
curl -X GET http://localhost:3002/v1/forest -H "Authorization: Bearer {JWT}"
```

## Useful Links
* https://auth0.com/docs/tokens/id-token
