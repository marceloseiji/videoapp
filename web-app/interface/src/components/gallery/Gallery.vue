<template>
  <div class="container gallery">
    <h1 class="title">Cadastro de Vídeos</h1>
    <div id="msg"></div>

    <div class="video-list">
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
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="video-form">
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
          <input type="file" class="custom-file-input" id="video-file" />
          <label class="custom-file-label" for="video-file">Selecione o video...</label>
        </div>

        <div class="d-flex flex-column">
          <div class="my-3">
            <video src width="320" height="240" controls></video>
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
    props: {}
  };
</script>