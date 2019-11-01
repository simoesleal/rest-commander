<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-buromobelexperte" main="Consultar Mesas"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: 01"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarMesa', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Mesa</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfTables.length > 0">
          <b-table hover striped bordered fixed :items="listOfTables" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarMesa', params: { actionMode:'edit', selectedTable: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'CadastrosEstruturais'}">
            <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
            <div class="text-uppercase font-300">Voltar</div>
          </router-link>
        </div>
      </b-container>
    </template>
  </div>
</template>

<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'ConsultMesa',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfTables: [],
			searchItem: '',
			fields: [
				{
					key: 'numero', label: 'Número da Mesa', sortable: true
				},
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {

    getItem () {
      if (this.searchItem.length === 0) {
        this.getTables()
      } else {
        this.getTablesByNumber(this.searchItem)
      }
    },

    async getTables () {
      let response
      try {
        response = await RestConnection.get('mesas/consultar/mesa')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Mesas.")
          }
      }
      this.listOfTables = response.data.conteudo
    },

    async getTablesByNumber (searchItem) {
      let response
      try {
          response = await RestConnection.get('mesas/consultar/mesa/numero/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Mesa com este número encontrado.')
            }
        }
        this.listOfTables = response.data.conteudo
      }
	  }
}
</script>

<style>

</style>