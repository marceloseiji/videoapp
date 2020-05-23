<template>
  <div class="container gallery">
    <h1 class="title">Cadastro de Vídeos</h1>
    <div id="msg" v-html="message"></div>

    <div class="video-list format" v-show="showListForm">
      <button class="btn btn-primary" id="btn-show" type="button"
        v-on:click="prepareRegister()"
      >
        Cadastrar
      </button>

      <div class="gallery-list">
        <div class="table-responsive">
          <table class="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Título</th>
                <th scope="col">Vídeo</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list" :key="item.video_id">
                <td>{{ item.video_id }}</td>
                <td>{{ item.video_title }}</td>
                <td>
                  <video v-bind:src="item.video_path" width="320" height="240" controls></video>
                </td>
                <td>
                  <button class="btn btn-warning"
                  id="btn-edit"
                  v-on:click="edit(item.video_id)"
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger"
                  id="btn-edit"
                  v-on:click="delRegister(item.video_id)"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="video-form" v-show="!showListForm">
      <form method="POST" action="/" id="gallery-form" v-on:submit.prevent="save">
        <label for="gallery-form">Cadastrar vídeo</label>
        <div class="form-group row">
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="id_gallery_video"
              value="Código"
              name="id_gallery_video"
              disabled
              v-model="register.id_gallery_video"
            >
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="title_video"
              name="title_video"
              placeholder="Título do Vídeo"
              v-model="register.title_video"
            >
          </div>
        </div>
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="video-file" name="videoFile"
            ref="file"
            v-on:change="loadVideo($event)"
          >
          <label class="custom-file-label" for="video-file">Selecione o video...</label>
        </div>

        <div class="d-flex flex-column">
          <div class="my-3">
            <video v-bind:src="urlVideo" width="320" height="240" controls></video>
            <p>Visualizar vídeo</p>
          </div>
        </div>

        <div class="form-inline">
          <button id="btn-register" type="submit" class="btn-show-form btn btn-primary">Salvar</button>
          <button
          id="btn-cancel"
          type="button"
          class="btn-show-form btn btn-warning"
          v-on:click="cancelOperation()"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Gallery",
    props: {},
    data() {
      return {
        showListForm: true,
        list: null,
        message: "",
        urlVideo: "",
        videoFile: "",
        register: {
          id_gallery_video: "",
          title_video: ""
        },
        registerformData: ""
      };
    },
    methods: {
      dataList() {
        this.$galleryService.getAll().then(response => {
            if (response.error) {
              // eslint-disable-next-line no-console
              console.log(response);
            } else {
              this.list = response.data.map(function(obj) {
                return {
                  video_id: obj.video_id,
                  video_title: obj.video_title,
                  video_path: this + obj.video_path
                };
              }, this.$server);
            }
          })
          .catch(response => {
            // eslint-disable-next-line no-console
            console.log(response);
          });
      },
      showAlert(msg, type) {
        let msgData = "";
        if(type === 'success') {
          msgData = `<div class='alert alert-success' role='alert'>
                        <strong>${msg}</strong>
                      </div>`;
        }else if(type === 'error') {
          msgData = `<div class='alert alert-danger' role='alert'>
                        <strong>${msg}</strong>
                      </div>`;
        }
        this.message = msgData;
      },
      clearMsg() {
        this.message = '';
      },
      prepareRegister() {
        this.clearMsg();
        this.showListForm = false;
      },
      loadVideo() {
        if(this.$refs.file.files.length > 0) {
          const reader = new FileReader();
          const file = this.$refs.file.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
            const dataUrl = reader.result;
            this.urlVideo = dataUrl;
            this.videoFile = file;
          }
        }
      },
      save() {
        this.registerformData = new FormData();
        this.registerformData.append('video_id', this.register.id_gallery_video);
        this.registerformData.append('video_title', this.register.title_video);
        this.registerformData.append('video_path', this.videoFile);

         for (var key of this.registerformData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        
        if(this.register.id_gallery_video > 0) {
          this.saveEdit(this.registerformData);
        } else {
          this.registerVideo(this.registerformData);
        }
      },
      registerVideo(dataFormData) {
        this.$galleryService.addVideo(dataFormData).then(response => {
          if(!response.error) {
            this.showAlert("Video cadastrado", "success");
            this.clearForm();
            this.showListForm = true;
            this.dataList()
          } else {
            this.showAlert(response.msg, "error");
          }
        }).catch(response => {
          this.showAlert(response, "error");
        });
      },
      clearForm() {
        let formHtml = document.getElementById("gallery-form");
        formHtml.reset();
        this.urlVideo = "";
        this.videoFile = "";
        this.registerformData = new FormData();
        this.register = {
          id_gallery_video: null,
          title_video: ""
        }
      },
      edit(id) {
        this.clearMsg();
        this.$galleryService.getId(id).then(response => {
          if(!response.error) {
            this.register.id_gallery_video = response.data[0].video_id;
            this.register.title_video = response.data[0].video_title;
            if(response.data[0].video_path != null) {
              this.urlVideo = this.$server + response.data[0].video_path;
              this.register.video_id = response.data[0].video_id;
            }
            this.showListForm = false;
          } else {
            this.showAlert(response.msg, "error");
          }
        }).catch(response => {
          this.showAlert("Erro ao editar..." + response, "error");
        });
      },
      cancelOperation() {
        this.clearForm();
        this.clearMsg();
        this.showListForm = true;
      },
      saveEdit(dataFormData) {
        this.$galleryService.saveEdit(dataFormData).then(response => {
          if(!response.error) {
            this.clearForm();
            this.dataList();
            this.showListForm = true;
          } else {
            this.showAlert("Erro ao salvar a edição", response.msg, "error");
          }
        }).catch(response => {
          this.showAlert("Erro ao salvar a edição", "error");
        })
      },
      delRegister(id) {
        this.$galleryService.delRegister(id).then(response => {
          if(!response.error) {
            this.dataList();
            this.showAlert("Excluido..", "success");
          } else {
            this.showAlert("Erro ao excluir" + response.msg, "error");
          }
        }).catch(response => {
          this.showAlert("Erro ao excluir", "error");
        })
      }
    },
    mounted() {
      this.dataList();
    }
  };
</script>
