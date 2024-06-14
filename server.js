const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionsRoutes'); // Adjust the path as necessary
const sequelize = require('./config/dbConfig');


const app = express();
const PORT = process.env.PORT || 3006;


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
 

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the question routes
app.use('/api/questions', questionRoutes);

sequelize.sync().then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});