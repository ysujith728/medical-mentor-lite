import express from 'express';
const app = express();
app.get('/', (req, res) => res.send('ok'));
app.listen(3002, () => console.log('listening on 3002'));
setTimeout(() => console.log('still here'), 5000);
