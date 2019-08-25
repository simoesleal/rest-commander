<template>
  <div>
    <template v-if="this.$route.path === '/cadastros-geografico/paises'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="9">
            <page-title icon="fas fa-flag" main="Consultar Países"></page-title>       
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Brasil"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getPaises"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo País</b-button>
            </router-link>
          </b-col>
        </b-row>
        <b-alert v-model="alertAlteradoComSucesso" variant="success" dismissible class="m-3 text-left">
          Pais alterado com sucesso!
         </b-alert>
        <b-alert v-model="alertCriadoComSucesso" variant="success" dismissible class="m-3 text-left">
          País criado com sucesso!
         </b-alert>
        <b-alert v-model="alertDeletadoComSucesso" variant="danger" dismissible class="m-3 text-left">
          País deletado com sucesso!
         </b-alert>
        <b-row class="mt-3" v-if="(listaPais.length > 0)">
          <b-col>
             <table class="table m-b-2 bg-fff">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">País</th>
                    <th scope="col">Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(pais, index) in listaPais" :key="index">
                    <td>{{ pais.id }}</td>
                    <td>{{ pais.nomePais }}</td>
                    <td>
                      <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'edit', selectedCountry: pais }}">
                        <b-button variant="outline-info" class="mr-5" @click="showModalAlterarPais(pais)"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
                      </router-link>                   
                    </td>
                    </tr>
                    </tbody>
                  </table>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'Cadastros'}">
            <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
            <div class="text-uppercase font-300">Voltar</div>
          </router-link>
        </div>
      </b-container>
    </template>
  <b-modal ref="modal-novo-pais" id="adicionar-pais" title="Adicionar Pais" size="md" header-bg-variant="light">
    <b-form>
      <label>ID pais*</label>
      <b-form-input id="id-pais" class="mb-3" type="text" v-model="idPais" trim placeholder="Exemplo: 01"></b-form-input>
      <label>Nome pais*</label>
      <b-form-input id="nome-pais" class="mb-3" type="text" v-model="nomePais" trim placeholder="Exemplo: Brasil"></b-form-input>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="salvarPais">Salvar</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalNovoPais">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campos Obrigatórios!</small></p>
  </b-modal>

  <b-modal ref="modal-alterar-pais" id="alterar-pais" title="Alterar Pais" size="md" header-bg-variant="light">
    <b-form>
      <label>ID pais*</label>
      <b-form-input id="id-pais" class="mb-3" type="text" v-model="idPais" trim placeholder="Exemplo: 01" disabled></b-form-input>
      <label>Nome pais*</label>
      <b-form-input id="nome-pais" class="mb-3" type="text" v-model="nomePais" trim placeholder="Nome do Pais"></b-form-input>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="alterarPais">Salvar Alteração</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalAlterarPais">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campo Obrigatório!</small></p>
  </b-modal>
  </div>
</template>


<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudPais',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      paisesDB: [
        { id: '01', nomePais: 'Brasil'},
        { id: '02', nomePais: 'Argentina'},
        { id: '03', nomePais: 'Paraguai'},
        { id: '04', nomePais: 'Chile'},
        { id: '05', nomePais: 'Peru'},
        { id: '06', nomePais: 'Costa Rica'},
        { id: '07', nomePais: 'Bolivia'},
        { id: '08', nomePais: 'México'},
      ],
      listaPais: [],
      idPais: '',
      nomePais: '',
      alertAlteradoComSucesso: false,
      alertCriadoComSucesso: false,
      alertDeletadoComSucesso: false
    }
  },
/*   watch: {
		$route(to, from){}
	}, */
  methods: {
    getPaises() {
      this.listaPais = this.paisesDB
    },

    novoPais() {
      this.showModalNovoPais()
    },

    salvarPais() {
      if (this.idPais.length <= 0) {
        alert('O campo ID do País é obrigátorio')
      } else if (this.nomePais.length <= 0) {
        alert('O campo Nome do País é obrigátorio')
      } else {
        const parametros = {
          id: this.idPais,
          nomePais: this.nomePais
        }
        this.listaPais.push(parametros)
        this.hideModalNovoPais()
        this.alertCriadoComSucesso = true
      }
    },

    alterarPais() {
      if (this.idPais.length <= 0) {
        alert('O campo ID do País é obrigátorio')
      } else if (this.nomePais.length <= 0) {
        alert('O campo Nome do País é obrigátorio')
      } else {
        const parametros = {
          id: this.idPais,
          nomePais: this.nomePais
        }
      let index = this.listaPais.findIndex(i => i.id === this.idPais)
      this.listaPais[index] = parametros
      this.hideModalAlterarPais()
      this.alertAlteradoComSucesso = true
      }
      
    },

    deletarPais() {
      let index = this.listaPais.findIndex(i => i.id === this.idPais)
      this.listaPais.splice(index, 1)
      this.alertDeletadoComSucesso = true      
    },

    showModalNovoPais() {
      this.$root.$emit('bv::show::modal', 'adicionar-pais', '#btnShow')      
    },
    hideModalNovoPais() {
      this.$root.$emit('bv::hide::modal', 'adicionar-pais', '#btnShow')
      this.limparDadosReativos()
    },
    showModalAlterarPais(pais) {
      this.idPais = pais.id
      this.nomePais = pais.nomePais
      this.$root.$emit('bv::show::modal', 'alterar-pais', '#btnShow')      
    },
    hideModalAlterarPais() {
      this.$root.$emit('bv::hide::modal', 'alterar-pais', '#btnShow')
      this.limparDadosReativos()
    },

    limparDadosReativos(){
      this.idPais = '',
      this.nomePais = ''
      this.alertAlteradoComSucesso = false,
      this.alertCriadoComSucesso = false
      this.alertDeletadoComSucesso = false
    },
  }
}

</script>

<style>

</style>
