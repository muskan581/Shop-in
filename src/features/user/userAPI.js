// A mock function to mimic making an async request for data
export function fetchLoggedInUserOrders(userId) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://https://shop-in-yaeu.onrender.com/orders/user/' + userId)
      const data = await response.json();
      console.log("UserAPI : ", data)
      resolve({ data: data })
    }
    );
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/users/' + userId)

    const data = await response.json();
    resolve({ data })
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://https://shop-in-yaeu.onrender.com/users/' +update.id,
      {
        method: 'PATCH',
        body : JSON.stringify(update),
        headers : {'content-type' : 'application/json'}
      }
    )

    const data = await response.json();
    resolve({ data })
  }
  );
}
