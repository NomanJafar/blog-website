const { Roles } = require("@prisma/client");
const dbContext = require("../database/dbContext");
const CustomError = require("../utils/customError");

/**
 * Service for blog post-related operations.
 *
 * @namespace
 */
const postService = {
    /**
     * Creates a new blog post with the provided title, content, and author information.
     *
     * @param {string} title - The title of the new blog post.
     * @param {string} content - The content of the new blog post.
     * @param {Object} author - The author information of the new blog post.
     * @returns {Object} The created blog post object.
     * @throws {CustomError} If an unexpected error occurs during creation.
     */
    createPost: async (title, content, author) => {
        try {
            return await dbContext.posts.create({
                data: {
                    title,
                    content,
                    author: {
                        connect: {
                            id: author.id,
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves all blog posts.
     * @param {number} page - The page number.
     * @param {number} pageSize - The page size.
     * @param {string} searchTerm - The search text.
     * @returns {Array} An array of blog post objects.
     * @throws {CustomError} If no blog posts are found.
     * @throws {Error} If an unexpected error occurs during retrieval.
     */
    getAllPosts: async (page, pageSize, searchTerm, authorName) => {
        try {
            let whereClause = {};

            if (searchTerm || authorName) {
                whereClause = {
                    AND: [
                        { author: { username: { contains: authorName } } },
                        {
                            OR: [
                                { title: { contains: searchTerm } },
                                { content: { contains: searchTerm } },
                            ],
                        },
                    ],
                };
            }

            const posts = await dbContext.posts.findMany({
                where: whereClause,
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    },

                }
            });
            const totalCount = await dbContext.posts.count();

            if (!posts || posts.length === 0) {
                throw new CustomError(`no blog posts found`, 404, false);
            }

            return { posts, totalCount, count: posts.length };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves a blog post by its ID.
     *
     * @param {number} id - The ID of the blog post to retrieve.
     * @returns {Object} The blog post object.
     * @throws {CustomError} If a blog post with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during retrieval.
     */
    getPostById: async (id) => {
        try {
            const post = await dbContext.posts.findFirst({
                where: { id },
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            });
            if (!post) {
                throw new CustomError(`blog post with ID ${id} does not exist`, 404, false);
            }
            return post;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Retrieves all blog posts by its author id.
     *
     * @param {number} id - The ID of the author to retrieve.
     * @returns {Object} The blog post object.
     * @throws {CustomError} If a blog post with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during retrieval.
     */
    getPostsByAuthorId: async (id) => {
        try {
            const posts = await dbContext.posts.findMany({
                where: {
                    authorId: id,
                },
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            });
            if (!posts) {
                throw new CustomError(`blog posts with author ID ${id} does not exist`, 404, false);
            }
            return posts;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Deletes a blog post by its ID.
     *
     * @param {number} id - The ID of the blog post to delete.
     * @param {Object} author - The author information of the to be deleted blog post.
     * @returns {Object} The deleted blog post object.
     * @throws {CustomError} If a blog post with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during deletion.
     */
    deletePost: async (id, author) => {
        try {
            const post = await dbContext.posts.findFirst({ where: { id }, include: { author: true } });
            if (!post) {
                throw new CustomError(`blog post with ID ${id} does not exist`, 404, false);
            }
            if (post.authorId == author.id || post.author.role === Roles.ADMIN) {
                return await dbContext.posts.delete({ where: { id } });
            }
            else {
                throw new CustomError(`UnAuthorized`, 400, false);
            }
        } catch (error) {
            throw error;
        }
    },

    /**
     * Updates a blog post by its ID with the provided title, content, and author information.
     *
     * @param {number} id - The ID of the blog post to update.
     * @param {string} title - The updated title.
     * @param {string} content - The updated content.
     * @param {Object} author - The author information of the to be updated blog post.
     * @returns {Object} The updated blog post object.
     * @throws {CustomError} If no blog posts are found or if a blog post with the provided ID does not exist.
     * @throws {Error} If an unexpected error occurs during update.
     */
    updatePost: async (id, title, content, author) => {

        const post = await dbContext.posts.findFirst({ where: { id }, include: { author: true } });
        if (!post) {
            throw new CustomError(`blog post with ID ${id} does not exist`, 404, false);
        }
        if (post.authorId === author.id || post.author.role === Roles.ADMIN) {
            await dbContext.posts.update({ where: { id }, data: { title, content } });
        }
        else {
            throw new CustomError(`UnAuthorized`, 400, false);
        }
    },
};

module.exports = postService;
