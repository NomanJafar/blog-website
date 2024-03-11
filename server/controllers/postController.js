const postService = require('../services/postService');
const postController = {
    create: async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const author = req.user;
            const post = await postService.createPost(title, content, author);
            res.apiSuccess(post, 201, auth = true, message = 'Post created successfully');
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const { page = 1, pageSize = 20, searchTerm, authorName } = req.query;
            const posts = await postService.getAllPosts(parseInt(page), parseInt(pageSize), searchTerm, authorName);
            res.apiSuccess(posts);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(parseInt(id));
            res.apiSuccess(post);
        } catch (error) {
            next(error);
        }
    },
    getByAuthorId: async (req, res, next) => {
        try {
            const user = req.user;
            const post = await postService.getPostsByAuthorId(parseInt(user.id));
            res.apiSuccess(post);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = req.user;
            const post = await postService.deletePost(id, user);
            res.apiSuccess(post);
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const user = req.user;
            const post = await postService.updatePost(parseInt(id), title, content, user);
            res.apiSuccess(post);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = postController;