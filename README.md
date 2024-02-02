# MVP Socio Formador

## Overview

This project is a Minimal Viable Product (MVP) designed to showcase a web application. It includes foundational back-end components built with Node.js, Express, and additional middleware for handling requests, database interactions, and more. The purpose is to serve as a OCR web app aimed to extract specific information for physical forms and documents commonly used on a warehouse. Created for Stuffactory MX

## Features

- Basic setup for a Node.js and Express application.
- Configuration files for database connections and application settings.
- Middleware for request processing and response handling.
- Model definitions for database interactions.
- Basic routing and controller logic.
- Usage of AWS Textract 

## Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- [Node.js](https://nodejs.org/)
- A database that is compatible with the configuration (refer to `config.js` for details).

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Aldo1803/mvpSocioFormador.git
```

2. Navigate to the project directory:
```bash
cd mvpSocioFormador
```

### Install the dependencies:

```bash

npm install
```
Configure the database connection in config.js according to your database setup.

Start the application:

```bash

npm start
```

Usage

After starting the application, it will listen on the configured port for requests. You can interact with the API through a tool like Postman or through your web application's frontend.

