import express from 'express';
import morgan from 'morgan';

require('dotenv').config({path: '.env'});

// Routes
import indexRoutes from './routes';
import genreRoutes from './routes/genres';
import authorRoutes from './routes/authors';
import movieRoutes from './routes/movies';

class Applicaction {

    app: express.Application;

    constructor() {
      this.app = express();
      this.settings();
      this.middlewares();
      this.routes();
    }

    settings() {
      // this.app.set('port', 4000);
    }

    middlewares() {
      this.app.use(morgan('dev'));
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(express.json());
    }

    routes() {
      this.app.use('/', indexRoutes);
      this.app.use('/api/genres', genreRoutes);
      this.app.use('/api/authors', authorRoutes);
      this.app.use('/api/movies', movieRoutes);
    }

    start(): void {
      const port = process.env.PORT || 4000;
      this.app.listen(port, () => {
          console.log('>>> Server is running at', port);
      });
    }
}

export default Applicaction;