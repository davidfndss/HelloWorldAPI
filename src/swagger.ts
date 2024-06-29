// @ts-nocheck
import { SwaggerModule } from '@nestjs/swagger';

const swaggerSetup = (app) => {
  return SwaggerModule.setup('', app, 
    {
      "openapi": "3.0.0",
      "info": {
        "title": "HelloWorld",
        "description": "In this documentation you will be able to consult the api end-points and also test all available routes. Do not forget to register and carry out the authorizarion.",
        "contact": {
          "email": "devdkingg@gmail.com"
        },
        "version": "1.0.0"
      },
      "servers": [
        {
          "url": " ",
          "description": "API hosted on render"
        },
        {
          "url": "http://localhost:3000",
          "description": "Local Server"
        }
      ],
      "paths": {
        "/user/signup": {
          "post": {
            "summary": "Create a new user",
            "description": "Route responsible for sign up the new users",
            "tags": ["User"],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  },
                  "examples": {
                    "Users": {
                      "value": {
                        "name": "Jhon Doe",
                        "username": "jhondoe123",
                        "email": "jhondoe@kmail.com",
                        "password": "j78944547doejhon"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "400": {
                "description": "Bad Request"
              },
              "201": {
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        },
                        "access-token": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/find-by-id/{id}": {
          "get": {
            "summary": "Search user by id",
            "description": "Route responsible for searching for one user by id",
            "tags": ["User"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "User ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "name": "jhondoe",
                        "username": "jhondoe3"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/find-by-username/{username}": {
          "get": {
            "summary": "Search user by username",
            "description": "Route responsible for searching for user by username",
            "tags": ["User"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "username",
                "type": "string",
                "description": "username",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "name": "jhondoe",
                        "username": "jhondoe3"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/{id}/update": {
          "patch": {
            "summary": "Update user by id",
            "description": "Route responsible for finding the user by id, and updating the user registration fields",
            "tags": ["User"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "User ID",
                "required": true
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  },
                  "examples": {
                    "Users": {
                      "value": {
                        "name": "Jhon Doe Edited Name"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "400": {
                "description": "Bad Request"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "message": "User updated successfuly",
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/{id}/delete": {
          "delete": {
            "summary": "Deletes an user from the database",
            "description": "Route responsible for deleting an user from the database, if requested by the own user",
            "tags": ["User"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "User ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "message": "User deleted successfuly"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/check-username": {
          "post": {
            "summary": "Checks if the username is available, returns boolean",
            "description": "Route responsible for checking if the username is available, returns true if its available and false if not",
            "tags": ["User"],
            "requestBody": {
              "content": {
                "application/json": {
                  "examples": {
                    "Username": {
                      "value": {
                        "username": "jhondoe123456"
                      }
                    }
                  }
                }
              }
            },

            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "isAvailable": "true"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/check-email": {
          "post": {
            "summary": "Checks if the email is available, returns boolean",
            "description": "Route responsible for checking if the email is available, returns true if its available and false if not",
            "tags": ["User"],
            "requestBody": {
              "content": {
                "application/json": {
                  "examples": {
                    "Email": {
                      "value": {
                        "email": "jhondoe123456@kmail.com"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "isAvailable": "true"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/update-image/avatar": {
          "patch": {
            "summary": "Update user avatar",
            "description": "Route responsible for updating the avatar of the logged user",
            "tags": ["User"],
            "requestBody": {
              "content": {
                "image/png": {},
                "image/jpeg": {}
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "400": {
                "description": "Bad Request"
              },
              "201": {
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/user/update-image/background": {
          "patch": {
            "summary": "Update user background image",
            "description": "Route responsible for updating the background image of the logged user",
            "tags": ["User"],
            "requestBody": {
              "content": {
                "image/png": {},
                "image/jpeg": {}
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "400": {
                "description": "Bad Request"
              },
              "201": {
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "message": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/signin": {
          "post": {
            "summary": "Login to NewsParrot",
            "description": "Route responsible for logging in a registered user",
            "tags": ["Auth"],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/User"
                  },
                  "examples": {
                    "User": {
                      "value": {
                        "email": "jhondoe@gmail.com",
                        "password": "12345abcdef"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "400": {
                "description": "Not Found"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "properties": {
                        "access_token": {
                          "type": "string"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/post/add": {
          "post": {
            "summary": "post News",
            "description": "Route responsible for sending a post",
            "tags": ["Post"],
            "security": [{ "bearerAuth": [] }],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Post"
                  },
                  "examples": {
                    "Post": {
                      "value": {
                        "body": "Hello world! this is a new post for HelloWorld."
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "401": {
                "description": "Unauthorized"
              },
              "400": {
                "description": "Bad Request"
              },
              "201": {
                "description": "Created",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "id": "123232323",
                        "body": "Hello world! this is a new post for HelloWorld.",
                        "user": {
                          "name": "Jhon Doe",
                          "username": "jhondoe123",
                          "avatar": "jhondoe123"
                        },
                        "comments":  [],
                        "likes": []
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/post": {
          "get": {
            "summary": "Get paginated posts",
            "description": "Route responsible for fetching paginated posts",
            "tags": ["Post"],
            "parameters": [
              {
                "in": "query",
                "name": "offset",
                "type": "string"
              },
              {
                "in": "query",
                "name": "limit",
                "type": "string"
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "400": {
                "description": "Not Found"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "array",
                      "items": {
                        "$ref": "#/components/schemas/Post"
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/post/{id}": {
          "patch": {
            "summary": "Search post by id",
            "description": "Route responsible for fetching a post by id",
            "tags": ["Post"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Post ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "401": {
                "description": "Unauthorized"
              },
              "400": {
                "description": "Not Found"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "$ref": "#/components/schemas/Post"
                    }
                  }
                }
              }
            }
          }
        },
        "/post/update/{id}": {
          "patch": {
            "summary": "Update Post",
            "description": "Route responsible for updating a Post",
            "tags": ["Post"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Post ID",
                "required": true
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Post"
                  },
                  "examples": {
                    "Post": {
                      "value": {
                        "body": "this post is being updated"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "400": {
                "description": "Bad Request"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "message": "User updated successfuly",
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/post/delete/{id}": {
          "delete": {
            "summary": "Delete Post",
            "description": "Route responsible for deleting Post, if the user is authorized",
            "tags": ["Post"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Post ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "example": {
                          "message": "User deleted successfuly",
                        }
                      }
                    }
                  }
              }
            }
          }
        },
        "/like/post/{id}": {
          "patch": {
            "summary": "Like / Unlike post",
            "description": "Route responsible for liking a post, or unliking if was already liked by the user",
            "tags": ["Like"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Post ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal server error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "message": "Post liked successfuly",
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/like/comment/{id}": {
          "patch": {
            "summary": "Like / Unlike comment",
            "description": "Route responsible for liking a comment, or unliking if was already liked by the user",
            "tags": ["Like"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Comment ID",
                "required": true
              }
            ],
            "responses": {
              "500": {
                "description": "Internal server error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK",
                "content": {
                  "application/json": {
                    "schema": {
                      "type": "object",
                      "example": {
                        "message": "Comment liked successfuly",
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "/comment/{PostId}": {
          "patch": {
            "summary": "Comment on a post",
            "description": "Route responsible for commenting on a post",
            "tags": ["Comment"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "postId",
                "type": "string",
                "description": "Post ID",
                "required": true
              }
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  },
                  "examples": {
                    "Comment": {
                      "value": {
                        "comment": "Hello world!"
                      }
                    }
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "400": {
                "description": "Bad Request"
              },
              "200": {
                "description": "OK"
              }
            }
          }
        },
        "/comment/{id}/delete": {
          "delete": {
            "summary": "Delete a comment",
            "description": "Route responsible for deleting a comment",
            "tags": ["Comment"],
            "security": [{ "bearerAuth": [] }],
            "parameters": [
              {
                "in": "path",
                "name": "id",
                "type": "string",
                "description": "Comment ID",
                "required": true
              }       
            ],
            "requestBody": {
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/Comment"
                  }
                }
              }
            },
            "responses": {
              "500": {
                "description": "Internal Server Error"
              },
              "404": {
                "description": "Not Found"
              },
              "401": {
                "description": "Unauthorized"
              },
              "200": {
                "description": "OK"
              }
            }
          }
        }
      },
      "components": {
        "securitySchemes": {
          "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
          }
        },
        "schemas": {
          "User": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "username": {
                "type": "string"
              },
              "email": {
                "type": "string"
              },
              "password": {
                "type": "string"
              },
              "avatar": {
                "type": "string"
              },
              "background": {
                "type": "string"
              }
            }
          },
          "Post": {
            "type": "object",
            "properties": {
              "body": {
                "type": "string"
              },
              "userId": {
                "type": "string"
              },
              "likes": {
                "type": "array"
              },
              "comments": {
                "type": "array"
              },
              "user":  {
                "type": "object",
              },
              "createdAt": {
                "type": "string",
                "format": "date-time"
              },
              "updatedAt": {
                "type": "string",
                "format": "date-time"
              },
            } 
          },
          "Comment": {
            "type": "object",
            "properties": {
              "message": {
                "type": "string"
              }
            }
          },
          "Like": {
            "type": "object",
            "properties": {
              "userId": {
                "type": "string"
              }
            }
          }
        }
      }
    }
  );
}
export { swaggerSetup }