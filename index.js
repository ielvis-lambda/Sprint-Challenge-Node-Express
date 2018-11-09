const server = require('./api/server.js');
// const upperCaseThat = require('./middleware/upperCaseThat');
const projectsRouter = require('./projects/projectsRouter.js');
// const postsRouter = require('./posts/postsRouter');

const port = 9000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));

//USER METHODS
server.use('/api/projects/', projectsRouter);
// server.get('/api/users/:id', userRouter);
// server.get('/api/users/posts/:id', userRouter);
// server.post('/api/users', userRouter);
// server.delete('/api/users/:id', userRouter);
// server.put('/api/users/:id', userRouter);

//POSTS METHODS
// server.use('/api/posts/', postsRouter);
// server.get('/api/posts/:id', postsRouter);
// server.post('/api/posts', postsRouter);
// server.delete('/api/posts/:id', postsRouter);
// server.put('/api/posts/:id', postsRouter);
