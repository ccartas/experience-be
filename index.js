const logger = require('./utils/logger');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const router = require('./routes/routes');
const PORT = process.env.PORT || 8090;
const passport = require('passport');
require('./utils/passport');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);



app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});