
window.onload = function() {
  // Build a system
  let url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  let options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "paths": {
      "/api/v1/pokemon": {
        "post": {
          "operationId": "PokemonController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePokemonDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        },
        "get": {
          "operationId": "PokemonController_findAll",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        }
      },
      "/api/v1/pokemon/{term}": {
        "get": {
          "operationId": "PokemonController_findOne",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        },
        "patch": {
          "operationId": "PokemonController_update",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePokemonDto"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        },
        "delete": {
          "operationId": "PokemonController_remove",
          "parameters": [
            {
              "name": "term",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        }
      },
      "/api/v1/pokemon/delete/{id}": {
        "delete": {
          "operationId": "PokemonController_destroy",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "204": {
              "description": ""
            }
          },
          "tags": [
            "Pokemon"
          ]
        }
      },
      "/api/v1/seed": {
        "get": {
          "operationId": "SeedController_executeSeed",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      }
    },
    "info": {
      "title": "Pokemon API",
      "description": "Simple API for Pokemon",
      "version": "1.0",
      "contact": {}
    },
    "tags": [
      {
        "name": "Pokemon",
        "description": ""
      }
    ],
    "servers": [],
    "components": {
      "schemas": {
        "CreatePokemonDto": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "pokemon_number": {
              "type": "number"
            }
          },
          "required": [
            "name",
            "pokemon_number"
          ]
        },
        "UpdatePokemonDto": {
          "type": "object",
          "properties": {}
        }
      }
    }
  },
  "customOptions": {}
};
  url = options.swaggerUrl || url
  let urls = options.swaggerUrls
  let customOptions = options.customOptions
  let spec1 = options.swaggerDoc
  let swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (let attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  let ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.initOAuth) {
    ui.initOAuth(customOptions.initOAuth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }
  
  window.ui = ui
}
