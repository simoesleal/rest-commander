<template>
  <div>
    <template v-if="this.$route.path === '/cadastros-geografico/estados'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-university" main="Consultar Estados"></page-title>        
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Paraná"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Estado</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfStates.length > 0">
          <b-table hover striped bordered :items="listOfStates" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'edit', selectedState: data }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <b-row>
           <b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
            <div @click="backOnePage">
                <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
                <div class="text-uppercase font-300">Voltar</div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </div>
</template>


<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudEstado',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfStates: [],
      searchItem: '',
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nome', label: 'Estado', sortable: true },
        { key: 'uf', label: 'UF', sortable: true },
        { key: 'paisNome', label: 'País', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    backOnePage () {
      this.$router.back()
    },
    
    getItem () {
      if (this.searchItem.length === 0) {
        this.getStates()
      } else {
        this.getStatesByName(this.searchItem)
      }
    },

    async getStates () {
      let response
      try {
        response = await RestConnection.get('estados/consultar/estado')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Estados.")
          }
      }
      this.listOfStates = response.data.conteudo
    },

    async getStatesByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('estados/consultar/estado/descricao/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Estado com este nome encontrado.')
            }
        }
        this.listOfStates = response.data.conteudo
      }
  }
}


</script>

<style>

</style>
