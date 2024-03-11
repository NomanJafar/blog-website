const express = require('express');
const cors = require('cors');
const standardizeResponse = require('./middlewares/standardizeResponse');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const router = require('./routes/router');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json({ limit: '50mb' }));
app.use(standardizeResponse);
app.use('/api', router);
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Blog API is listening on PORT : ${PORT}`);
});