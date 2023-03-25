const {nanoid} = require{'nanoid'};

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(16);

    const finished = pageCount === readPage;

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });

        response.code(400);
        return response;

    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
        response.code(400);
        return response;

    }

    // Bila buku berhasil dimasukkan, server harus mengembalikan respons dengan: Status Code : 201

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        }
    });

    response.code(201);
    return response;


};


const getAllBooksHandler = (request, h) => {
    const {name, reading, finished} = request.query;

    const response = h.response({
        status: 'success',
        data: {
            books: [
                {
                    id: '1',
                    name: 'Buku A',
                    publisher: 'Penerbit A'
                },
                {
                    id: '2',
                    name: 'Buku B',
                    publisher: 'Penerbit B'
                }
            ]
        }
    });

    response.code(200);

    return response;
};

const getBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const response = h.response({
        status: 'success',
        data: {
            book: {
                id: bookId,
                name: 'Buku A',
                publisher: 'Penerbit A'
            }
        }
    });

    response.code(200);

    return response;
};

const editBookByIdHandler = (request, h) => {

    const {bookId} = request.params;

    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;

    const finished = pageCount === readPage;

    const updatedAt = new Date().toISOString();

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });

        response.code(400);
        return response;

    }

    if (readPage > pageCount) {

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });

        response.code(400);
        return response;

    }

    const response = h.response({

        status: 'success',
        message: 'Buku berhasil diperbarui'

    });

    response.code(200);
    
    return response;

};

const deleteBookByIdHandler = (request, h) => {
    const {bookId} = request.params;
    
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    });

    response.code(200);

    return response;

};



module.exports = {addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler};
