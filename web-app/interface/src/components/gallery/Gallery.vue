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
              <tr v-for="item in list">
                <td>{{ item.video_id }}</td>
                <td>{{ item.video_title }}</td>
                <td>
                  <video v-bind:src="item.video_path" width="320" height="240" controls></video>
                </td>
                <td>Editar</td>
                <td>Excluir</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="video-form" v-show="!showListForm">
      <form method="post" action="/" id="fallery-form">
        <label for="fallery-form">Cadastrar vídeo</label>
        <div class="form-group row">
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="video-id"
              value="Código"
              name="video-id"
              disabled
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-12">
            <input
              type="text"
              class="form-control"
              id="video-title"
              name="video-title"
              placeholder="Título do Vídeo"
            />
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
          <button id="btn-cancel" type="button" class="btn-show-form btn btn-warning">Cancelar</button>
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
        videoFile: ""
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
          console.log(file)
          reader.readAsDataURL(file);
          reader.onload = () => {
            const dataUrl = reader.result;
            this.urlVideo = dataUrl;
            this.videoFile = file;
          }
        }
      }
    },
    mounted() {
      this.dataList();
    }
  };
</script>