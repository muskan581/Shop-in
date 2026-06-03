// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/signup',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
        credentials: "include"
      }
    )

    const data = await response.json();
    resolve({ data })
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login',
        {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
          credentials: "include"
        }
      )

      if (response.ok) {  //if password verified 
        const data = await response.json();
        resolve({ data })
      }
      else {
        const err = await response.json();
        reject({ err })
      }
    }
    catch (err) {
      reject({ err })
    }
  }
  );
}

export async function signOut() {
  try {
    const response = await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      credentials: 'include', // Ensure cookies are included in the request
    });
    if (response.ok) {
      console.log('Logged out successfully');
      window.location.href = '/login';
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('An error occurred during logout:', error);
  }
}