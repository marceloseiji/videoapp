<template>
  <div class="container">
    <h1>Seus Vídeos</h1>
    <div class="row">
      <div
        class="col-sm-12 col-md-6 mb-4"
        v-for="item in list"
        :key="item.video_id"
      >
        <div class="card text-white bg-dark">
          <div class="card-header">
          <i class="fas fa-video"></i>
          {{ item.video_title }}
        </div>
        <div class="card-body">
          <div class="embed-responsive embed-responsive-4by3">
            <video v-bind:src="item.video_path" controls></video>
          </div>
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    props: {},
    data() {
      return {
        list: null
      };
    },
    methods: {
      dataList() {
        this.$galleryService
          .getAll()
          .then(response => {
            if (response.error) {
              this.showAlert(response, "erro");
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
            this.showAlert(response, "erro");
          });
      },
      showAlert(msg, type) {
        let msgData = "";
        if (type === "success") {
          msgData = `<div class='alert alert-success' role='alert'>
                                <strong>${msg}</strong>
                              </div>`;
        } else if (type === "error") {
          msgData = `<div class='alert alert-danger' role='alert'>
                                <strong>${msg}</strong>
                              </div>`;
        }
        this.message = msgData;
      }
    },
    mounted() {
      this.dataList();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
