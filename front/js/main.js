const books = [
    {name: "One Hundred Years of Solitude",
    info: "One Hundred Years of Solitude is an epic story of seven generations of the Buendía family spanning one hundred years of turbulent Latin American history, from the post-colonial era of 1820 to that of 1920. The patriarch José Arcadio Buendía founds the utopian city of Macondo in the middle of a swamp.",
    urlImg: "../front/dist/assets/cien-años.webp",
    type: "Book"},

    {name: "Cuentos de amor de locura y de muerte",
    info: "lorem",
    urlImg: "../front/dist/assets/amor-locura-muerte.jpg",
    type: "Book"},

    {name: "Re: Starting Life in Another World from Zero",
    info: "lorem",
    urlImg: "../front/dist/assets/re-zero-volume-1.webp",
    type: "Light novel"},

    {name: "One Hundred Years of Solitude",
    info: "One Hundred Years of Solitude is an epic story of seven generations of the Buendía family spanning one hundred years of turbulent Latin American history, from the post-colonial era of 1820 to that of 1920. The patriarch José Arcadio Buendía founds the utopian city of Macondo in the middle of a swamp.",
    urlImg: "../front/dist/assets/cien-años.webp",
    type: "Book"},

    {name: "Cuentos de amor de locura y de muerte",
    info: "lorem",
    urlImg: "../front/dist/assets/amor-locura-muerte.jpg",
    type: "Book"},

    {name: "Re: Starting Life in Another World from Zero",
    info: "lorem",
    urlImg: "../front/dist/assets/re-zero-volume-1.webp",
    type: "Light novel"},
    {name: "One Hundred Years of Solitude",
    info: "One Hundred Years of Solitude is an epic story of seven generations of the Buendía family spanning one hundred years of turbulent Latin American history, from the post-colonial era of 1820 to that of 1920. The patriarch José Arcadio Buendía founds the utopian city of Macondo in the middle of a swamp.",
    urlImg: "../front/dist/assets/cien-años.webp",
    type: "Book"},

    {name: "Cuentos de amor de locura y de muerte",
    info: "lorem",
    urlImg: "../front/dist/assets/amor-locura-muerte.jpg",
    type: "Book"},

    {name: "Re: Starting Life in Another World from Zero",
    info: "lorem",
    urlImg: "../front/dist/assets/re-zero-volume-1.webp",
    type: "Light novel"},
]



const container = document.getElementById('scrollContainer');
function cargarCarrusel() {
    let htmlContenido = "";

    books.forEach(book => {
        htmlContenido += `<img src="${book.urlImg}" 
                        style="height: 400px; width: auto; flex-shrink: 0; scroll-snap-align: center;" 
                        alt="${book.name}">`;
        });

    container.innerHTML = htmlContenido;
}
cargarCarrusel();

const recommended = document.getElementById('information');


function bookSelected(index) {
    const book = books[index];
    const textoCorto = book.info.substring(0, 150) + "...";

    recommended.innerHTML = `
    <img src="${book.urlImg}" 
         class="img-fluid rounded"
         style="
             height: clamp(150px, 40vh, 400px);
             width: clamp(120px, 30vw, 300px);
             object-fit: cover;
             flex-shrink: 0;
         " 
         alt="${book.name}">
    <div class="description d-flex flex-column">
        <h3 class="display-9">${book.type}</h3>
        <h1 class="display-5">${book.name}</h1>
        <p class="fs-3">${textoCorto}</p>
    </div>
`;

    
}

const images = Array.from(container.querySelectorAll('img'));
let current = 0;

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

goTo(0);

const gridContainer = document.getElementById('gridContainer');

function cargarGrilla() {
    let htmlGrilla = "";

    books.slice(0 , 8).forEach((book, index) => {
        htmlGrilla += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm border-0 grid-card" onclick=".............." style=" background-color: rgb(251, 202, 134); cursor: pointer; transition: transform 0.2s;">
                    <img src="${book.urlImg}" class="card-img-top p-3" style="height: 280px; object-fit: contain;" alt="${book.name}">
                    <div class="card-body d-flex flex-column justify-content-between text-center pt-0">
                        <h6 class="card-title fw-bold mb-2">${book.name}</h6>
                        <span class="badge bg-dark align-self-center">${book.type}</span>
                    </div>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = htmlGrilla;
}

cargarGrilla();

