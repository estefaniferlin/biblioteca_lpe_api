class Livro {
    constructor(codigo, titulo, descricao, genero,  
        autor, quantidade, genero_nome, autor_nome) {
        this.codigo = codigo;
        this.titulo = titulo;
        this.descricao = descricao;
        this.genero = genero;
        this.autor = autor;
        this.quantidade = quantidade;
        this.genero_nome = genero_nome;
        this.autor_nome = autor_nome;
    }
}

module.exports = Livro;