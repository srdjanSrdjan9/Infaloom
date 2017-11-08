//DEPRECATED
export default function getData() {
  console.log('asdasd');
    return fetch('./products.json', {
      method: 'GET'
    }).then(response => respone.json());
  }
  