const CARPETA_IMAGENES = "/front/dist/assets/";

let books = [];

const container = document.getElementById('scrollContainer');
const recommended = document.getElementById('information');
const gridContainer = document.getElementById('gridContainer');

let images = [];
let current = 0;

function cargarCarrusel() {
    let htmlContenido = "";

    books.forEach(book => {
        htmlContenido += `<img src="${CARPETA_IMAGENES + book.imagen}" 
                        style="height: 400px; width: auto; flex-shrink: 0; scroll-snap-align: center;" 
                        alt="${book.titulo}">`;
        });

    container.innerHTML = htmlContenido;
    images = Array.from(container.querySelectorAll('img'));
}

function bookSelected(index) {
    const book = books[index];
    const textoCorto = book.descripcion.substring(0, 150) + "...";

    recommended.innerHTML = `
    <img src="${CARPETA_IMAGENES + book.imagen}" 
         class="img-fluid rounded"
         style="
             height: clamp(150px, 40vh, 400px);
             width: clamp(120px, 30vw, 300px);
             object-fit: cover;
             flex-shrink: 0;
         " 
         alt="${book.titulo}">
    <div class="description d-flex flex-column">
        <h3 class="display-9">${book.tipo}</h3>
        <h1 class="display-5">${book.titulo}</h1>
        <p class="fs-3">${textoCorto}</p>
    </div>
`;
}

function goTo(index) {
    if (index < 0 || index >= images.length) return;

    images.forEach(img => img.classList.remove('active-book'));
    current = index;
    images[current].classList.add('active-book');
    images[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    bookSelected(current);
}

document.getElementById('btnNext').addEventListener('click', () => goTo(current + 1));
document.getElementById('btnPrev').addEventListener('click', () => goTo(current - 1));

function cargarGrilla() {
    let htmlGrilla = "";

    books.slice(0 , 8).forEach((book) => {
        htmlGrilla += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm border-0 grid-card" style=" background-color: rgb(251, 202, 134); cursor: pointer; transition: transform 0.2s;">
                    <img src="${CARPETA_IMAGENES + book.imagen}" class="card-img-top p-3" style="height: 280px; object-fit: contain;" alt="${book.titulo}">
                    <div class="card-body d-flex flex-column justify-content-between text-center pt-0">
                        <h6 class="card-title fw-bold mb-2">${book.titulo}</h6>
                        <span class="badge bg-dark align-self-center">${book.tipo}</span>
                    </div>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = htmlGrilla;
}

async function cargarLibros() {
    const respuesta = await fetch("/api/libros");
    const data = await respuesta.json();
    books = data.libros;

    cargarCarrusel();
    cargarGrilla();
    goTo(0);
}

cargarLibros();
