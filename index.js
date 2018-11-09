const server = require('./api/server.js');
// const upperCaseThat = require('./middleware/upperCaseThat');
const projectsRouter = require('./projects/projectsRouter.js');
// const postsRouter = require('./posts/postsRouter');

const port = 9000;
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));

//USER METHODS
server.use('/api/projects/', projectsRouter);
server.get('/api/projects/:id', projectsRouter);
server.get('/api/projects/actions/:id', projectsRouter);
server.post('/api/projects', projectsRouter);
server.delete('/api/projects/:id', projectsRouter);
server.put('/api/projects/:id', projectsRouter);

//POSTS METHODS
// server.use('/api/posts/', postsRouter);
// server.get('/api/posts/:id', postsRouter);
// server.post('/api/posts', postsRouter);
// server.delete('/api/posts/:id', postsRouter);
// server.put('/api/posts/:id', postsRouter);
