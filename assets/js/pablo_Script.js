async function fetchProducts() {
  try {
    const response = await fetch('productos.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function setupMenu() {
  const data = await fetchProducts();
  const categories = data.categorias;
  const products = data.productos;

  const menuContainer = document.querySelector('.menu');
  categories.forEach(category => {
    const categoryButton = document.createElement('button');
    categoryButton.classList.add('btn', 'btn-primary');
    categoryButton.textContent = category;
    categoryButton.addEventListener('click', () => filterItems(category));
    menuContainer.appendChild(categoryButton);
  });

  filterItems('todos');
}

async function filterItems(category) {
  const data = await fetchProducts();
  const products = data.productos;

  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    if (category === 'todos' || product.categoria === category) {
      // Card
      const productDiv = document.createElement('div');
      productDiv.classList.add('product', 'card', 'col-sm-12', 'col-md-6', 'col-lg-3', 'border-0', 'py-2');
      // Slide 1
      const slide1Div = document.createElement('div');
      slide1Div.classList.add('slide', 'slide1');
      const content1Div = document.createElement('div');
      content1Div.classList.add('content');
      const container1Div = document.createElement('div');
      container1Div.classList.add('container');
      const image = document.createElement('img');
      image.src = product.imagen;
      image.classList.add('card-img-top', 'box-img');
      container1Div.appendChild(image);
      content1Div.appendChild(container1Div);
      slide1Div.appendChild(content1Div);
      // Slide 2
      const slide2Div = document.createElement('div');
      slide2Div.classList.add('slide', 'slide2');
      const content2Div = document.createElement('div');
      content2Div.classList.add('content');
      const h3 = document.createElement('h3');
      h3.textContent = 'Hello there!';
      const p = document.createElement('p');
      p.textContent = 'Trust yourself and keep going.';
      content2Div.appendChild(h3);
      content2Div.appendChild(p);
      slide2Div.appendChild(content2Div);

      productList.appendChild(productDiv);
      productDiv.appendChild(slide1Div);
      productDiv.appendChild(slide2Div);
    }
  });
}

setupMenu();
