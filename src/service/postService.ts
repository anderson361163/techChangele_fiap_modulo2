import { PostRepository } from '../repository/postRepository.js'; // Ajuste o caminho conforme necessário

export class PostService {
    
    private postRepository: PostRepository;

    constructor(postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    async listaDePost() {
        return this.postRepository.listarTodosOsPosts();
    }
    
}
