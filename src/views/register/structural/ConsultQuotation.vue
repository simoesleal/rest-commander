<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-money-bill-alt" main="Consultar Cotação"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input :disabled="true" placeholder="Exemplo: Bitcoin"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getQuotationList"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarCotacao', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Cotação</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfQuotation.length > 0">
          <b-table hover striped bordered fixed :items="listOfQuotation" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarCotacao', params: { actionMode:'edit', selectedQuotation: data.item }}">
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
  name: 'CrudCotacao',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfQuotation: [],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'cotacao', label: 'Cotação', sortable: true
				},			
				{
					key: 'simbolo', label: '$$', sortable: true
				},			
				{
					key: 'nomeMoeda', label: 'Moeda', sortable: true
				},			
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		async getQuotationList () {
      let response
      try {
        response = await RestConnection.get('cotacoes/consultar/')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Cotações.")
          }
      }
      this.listOfQuotation = response.data.conteudo
    },
	}

}
</script>

<style>

</style>