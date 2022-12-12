const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://0.0.0.0/sneakersdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error(`New Error: ${err}`));