<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/cidades'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-city" main="Consultar Cidades"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Foz do Iguaçu"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Cidade</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCities.length > 0">
          <b-table hover striped bordered fixed :items="listOfCities" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'edit', selectedCity: data.item }}">
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
  name: 'CrudCidade',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfCities: [],
      searchItem: '',
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomeCidade', label: 'Nome', sortable: true },
        { key: 'uf', label: 'UF', sortable: true },
        { key: 'nomeEstado', label: 'Estado', sortable: true },
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
        this.getCities()
      } else {
        this.getCitiesByName(this.searchItem)
      }
    },

    async getCities () {
      let response
      try {
        response = await RestConnection.get('cidades/consultar/cidade')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Cidades.")
          }
      }
      this.listOfCities = response.data.conteudo
    },

    async getCitiesByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('cidades/consultar/cidade/descricao/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhuma Coidade com este nome encontrado.')
            }
        }
        this.listOfCities = response.data.conteudo
      }
  }
}

</script>

<style>

</style>
