/*----------Ejercicio 1: Promesas Encadenadas---------*/
const firstPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 100));
    }, 2000);
  })
    .then((randomNumber) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(randomNumber * randomNumber);
        }, 3000);
      });
    })
    .then((squaredNumber) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Math.sqrt(squaredNumber));
        }, 1000);
      });
    });
};

firstPromise()
  .then((result) => console.log("Resultado del primer ejercicio:", result))
  .catch((error) =>
    console.error("Hubo un error en el primer ejercicio:", error)
  );

/*--------Ejercicio 2: Promesa de Múltiples Solicitudes---------*/
const secondPromise = (arrayURLs) => {
  const promises = arrayURLs.map((url) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          console.log("Error en el resultado de la petición");
        }
        return response.json();
      })
      .catch((error) => {
        console.log("Error en la solicitud");
      });
  });
  return Promise.all(promises);
};

const arrayURLs = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];
secondPromise(arrayURLs)
  .then((results) => {
    console.log("Resultados de las URLs:", results);
  })
  .catch((error) => {
    console.error("Error en una de las URLs:", error);
  });

/*-------Ejercicio 3: Promesas Paralelas---------*/

const thirdPromise = (arrayPromise) => {
  return Promise.all(arrayPromise)
    .then((results) => results)
    .catch((error) => {
      console.log("Una promesa falló :(");
    });
};

const promise1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Resultado 1"), 2000));
const promise2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Resultado 2"), 1500));
const promise3 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Resultado 3"), 1000));

const arrayPromise = [promise1(), promise2(), promise3()];

thirdPromise(arrayPromise)
  .then((results) => {
    console.log("Resultados de las promesas:", results);
  })
  .catch((error) => {
    console.error("Error en alguna promesa:", error);
  });

/*---------Ejercicio 4: Promesas en Cadena con Retraso---------*/

const fourthPromise = (N) => {
  const promises = [];

  for (let i = 0; i < N; i++) {
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          console.log("Número actual del bucle:", i);
          resolve(i);
        }, N * 1000);
      })
    );
  }

  return Promise.all(promises).then(() => {
    return new Promise((resolve) => {
      resolve("Todas las promesas se resolvieron");
    });
  });
};

fourthPromise(5)
  .then((results) => {
    console.log("Resultado del cuarto ejercicio:", results);
  })
  .catch((error) => {
    console.error("Error en el caurto ejercicio: ", error);
  });

/*---------Ejercicio 5: Promesa con Cancelación---------*/

const fiftPromises = () => {
  let canceled = false;
  let timer;

  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      if (!canceled) {
        resolve("La promesa se ha completado");
      } else {
        reject("Promesa cancelada");
      }
    }, 5000);
  });

  promise.cancel = () => {
    canceled = true;
    clearTimeout(timer);
  };

  return promise;
};

const cancelPromises = fiftPromises();

cancelPromises
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

cancelPromises.cancel();
