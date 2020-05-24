import { ConfigClass } from "../classes/configClass";

let path = `${ConfigClass.getUrlApi().toString()}/videos/`;
export default class GalleryService {
  static getAll() {
    return fetch(path).then(response => {
      return response.json();
    })
  }

  static getId(id) {
    return fetch(`${path}/${id}`).then(response => {
      return response.json();
    })
  }

  static addVideo(formData) {
    return fetch(path, {method: 'POST', body: formData})
    .then(response => {
      return response.json();
    })
  }

  static saveEdit(formData) {
    return fetch(path, {method: 'PUT', body: formData})
    .then(response => {
      return response.json();
    })
  }

  static delRegister(id) {
    return fetch(`${path}/${id}`, {method: 'DELETE'})
    .then(response => {
      return response.json();
    })
  }
}
