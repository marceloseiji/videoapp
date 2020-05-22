import { ConfigClass } from "../classes/configClass";

let path = `${ConfigClass.getUrlApi().toString()}/videos/`;
export default class GalleryService {
  static getAll() {
    return fetch(path).then(response => {
      return response.json();
    })
  }

  static addVideo(formData) {
    return fetch(path, 
        {
          method: 'POST',
          body: formData
        }
      ).then(response => {
      return response.json();
    })
  }
}
