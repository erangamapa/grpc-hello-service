# gRPC Hello Service

This is Greet microservice based on NodeJS and gRPC

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have latest stable node version and yarn package manager installed in order to run this locally.

* [Nodejs](https://nodejs.org/en/download/) - Technology used to impliment.
* [Yarn](https://yarnpkg.com/lang/en/docs/install/) - Dependency Management.


### Running

Install Dependencies

```
yarn install
```

Run the project

```
yarn start
```

## Usage

* Greeting service runs on default 6020 on gRPC protocol.
* This project includes **client.example.js**. Either you can run it or you can call the gRPC service using any other tool.
* Before running **client.example.js**, you need to get the jwt token generated via **auth-service** and replace it to **TOKEN** variable.


## Testing

To test the project

```
yarn test
```

## Deployment

To build docker image

```
docker build . -t <yourname>/grpc-hello-service
```

To run docker image
(Make sure your port 6020 is free or change to a free one)

```
docker run -p 6020:6020 eranmapa/grpc-hello-service
```

## Assumptions and Other Details

* Assumiing that its a good practice to attach jwt token to meta in gRPC call.
* Only unit test are written isolating logic units written by me by mocking other dependencies.
* High quality secret for jwt generation is genarated via [GRC](https://www.grc.com/passwords.htm)
* Secret used for JWT is saved in dockerfile as env variable for release and assuming its safe there.
* Assuming that validating JWT token inhouse is sufficent than calling auth microservice to validate.


## Important Dependencies

* **grpc** - To run gRPC server
* **@grpc/proto-loader** - To load gRPC prototypes.
* **proxyquire-2** - Use to mock libs when unit testing
* **jsonwebtoken** - To validate jwt


## Authors

* **Eranga Mapa** - *My Work* - [MapaonboardBlog](http://mapaonboard.blogspot.com/)

## License

This project is licensed under the MIT License

