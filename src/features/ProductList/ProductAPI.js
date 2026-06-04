// A mock function to mimic making an async request for data
export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/products', 
      {
        method: "POST",
        body: JSON.stringify(product),    
        headers: {'content-type' : 'application/json'}
      }
    )
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function deleteProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/products/' + product.id,
      {
        method: 'DELETE',
        // body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' }
      }
    )
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchProductsByFilter({ filter, sort, pagination, admin }) {
  // filter object 
  //filter = {"category" : ["electronics", "smartphones"]}
  //sort object
  //sort = {_sort: "price", _order: "desc"}
  //sort object
  //pagination = {_page: 1, _per_page: 10}


  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key]
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  // if(admin) 
  //   queryString += `admin=true`

  console.log("queryString", queryString)
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/products?' + queryString)
    const data = await response.json();

    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } })

    // resolve({data})

  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/products/' + id)
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/brands')
    const data = await response.json();
    resolve({ data })
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/categories')
    const data = await response.json();
    resolve({ data })
  }
  );
}

