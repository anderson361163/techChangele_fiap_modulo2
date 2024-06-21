import { db } from '../config/postgresDb.js';
import { Post } from "../models/post.entity.js";

export class PostRepository{

    private entityManager = db.manager;

    async listarTodosOsPosts() {
        return this.entityManager.find(Post);
    }

}