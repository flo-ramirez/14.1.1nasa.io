document.getElementById('btnBuscar').addEventListener('click', function() {
    const inputBuscar = document.getElementById('inputBuscar').value;
    const contenedor = document.getElementById('contenedor');
    const apiUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(inputBuscar)}`;

    // Limpiar el contenedor antes de mostrar los resultados
    contenedor.innerHTML = '';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.collection.items.length > 0) {
                data.collection.items.forEach(item => {
                    if (item.links && item.links.length > 0) {
                        // Crear columna
                        const column = document.createElement('div');
                        column.className = 'col-md-4 d-flex align-items-stretch';

                        // Crear tarjeta de Bootstrap
                        const card = document.createElement('div');
                        card.className = 'card mb-4 shadow-sm';
                        card.style.width = '100%';

                        // Imagen
                        const img = document.createElement('img');
                        img.src = item.links[0].href;
                        img.className = 'card-img-top';
                        img.alt = item.data[0].title;

                        // Cuerpo de la tarjeta
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';

                        // Título
                        const title = document.createElement('h5');
                        title.className = 'card-title';
                        title.innerText = item.data[0].title;

                        // Descripción con scroll
                        const description = document.createElement('div');
                        description.className = 'card-text overflow-auto';
                        description.innerText = item.data[0].description || 'No description available';

                        const date = document.createElement('p');
                        date.className = 'text-muted mt-2';
                        const dateCreated = new Date(item.data[0].date_created);
                        date.innerText = `Fecha de publicación: ${dateCreated.toLocaleDateString()}`;

                        // Añadir elementos al cuerpo de la tarjeta
                        cardBody.appendChild(title);
                        cardBody.appendChild(description);

                        // Añadir imagen y cuerpo a la tarjeta
                        card.appendChild(img);
                        card.appendChild(cardBody);

                        // Añadir tarjeta a la columna
                        column.appendChild(card);

                        // Añadir columna al contenedor
                        contenedor.appendChild(column);
                    }
                });
            } else {
                const noResults = document.createElement('p');
                noResults.innerText = 'No se encontraron resultados para tu búsqueda.';
                contenedor.appendChild(noResults);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('p');
            errorMessage.innerText = 'Hubo un error al realizar la búsqueda. Intenta nuevamente.';
            contenedor.appendChild(errorMessage);
        });
});

