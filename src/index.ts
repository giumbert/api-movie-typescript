import App from './app';
import { connect } from "./startup/db";

const app = new App();
connect();

require('dotenv').config({path: '.env'});

app.start();