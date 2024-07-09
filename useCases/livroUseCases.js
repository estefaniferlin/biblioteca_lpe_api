const { pool } = require('../config');
const Livro = require('../entities/livro')

const getLivrosDB = async () => {
    try {    
        const { rows } = await pool.query(`select l.codigo as codigo, l.titulo as titulo, l.descricao as descricao, 
        l.genero as genero, l.autor as autor, l.quantidade as quantidade, g.nome as genero_nome, a.nome as autor_nome
        from livros l
        INNER join generos g 
        ON l.genero = g.codigo
        INNER JOIN autores a
        ON l.autor = a.codigo
        order by l.codigo`);
        return rows.map((livro) => new Livro(livro.codigo, livro.titulo, livro.descricao, 
            livro.genero, livro.autor, livro.quantidade, livro.genero_nome, livro.autor_nome));        
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addLivroDB = async (body) => {
    try { 
        const { titulo, descricao, genero, autor, quantidade } = body; 
        const results = await pool.query(`INSERT INTO livros (titulo, descricao, genero, autor, quantidade) 
            VALUES ($1, $2, $3, $4, $5)
            returning codigo, titulo, descricao, genero, autor, quantidade`,
        [titulo, descricao, genero, autor, quantidade]);
        const livro = results.rows[0];
        const novoLivro = new Livro(livro.codigo, livro.titulo, livro.descricao,
            livro.genero, livro.autor, livro.quantidade, "");
        console.log(novoLivro)
        return novoLivro;
    } catch (err) {
        throw "Erro ao inserir o livro: " + err;
    }    
}

const updateLivroDB = async (body) => {
    try {   
        const { codigo, titulo, descricao, genero, autor, quantidade }  = body; 
        const results = await pool.query(`UPDATE livros set titulo = $2 , descricao = $3, genero = $4, 
        autor = $5, quantidade = $6 where codigo = $1 
        returning codigo, titulo, descricao, genero, autor, quantidade`,
        [codigo, titulo, descricao, genero, autor, quantidade]);        
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser alterado`;
        }
        const livro = results.rows[0];
        return new Livro(livro.codigo, livro.titulo, livro.descricao,
            livro.genero, livro.autor, livro.quantidade, "");
    } catch (err) {
        throw "Erro ao alterar o livro: " + err;
    }      
}

const deleteLivroDB = async (codigo) => {
    try {           
        const results = await pool.query(`DELETE FROM livros where codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw `Nenhum registro encontrado com o código ${codigo} para ser removido`;
        } else {
            return "Livro removido com sucesso";
        }       
    } catch (err) {
        throw "Erro ao remover o livro: " + err;
    }     
}

const getLivroPorCodigoDB = async (codigo) => {
    try {           
        const results = await pool.query(`select l.codigo as codigo, l.titulo as titulo, l.descricao as descricao, 
        l.genero as genero, g.nome as genero_nome, l.autor as autor, a.nome as autor_nome, l.quantidade as quantidade
        from livros l
        join generos g on l.genero = g.codigo
        join autores a on l.autor = a.codigo
		where l.codigo = $1`,
        [codigo]);
        if (results.rowCount == 0){
            throw "Nenhum registro encontrado com o código: " + codigo;
        } else {
            const livro = results.rows[0];
            return new Livro(livro.codigo, livro.titulo, livro.descricao,
                livro.genero, livro.autor, livro.quantidade, livro.genero_nome, livro.autor_nome, "");
        }       
    } catch (err) {
        throw "Erro ao recuperar o livro: " + err;
    }     
}

module.exports = {
    getLivrosDB, addLivroDB, updateLivroDB, deleteLivroDB, getLivroPorCodigoDB
}