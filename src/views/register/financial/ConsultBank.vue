<template>
  <div v-if="this.$route.path === '/cadastro-financeiro/consulta-banco'">
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-university" main="Consultar Bancos"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Banco do Brasil"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarBanco', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Banco</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfBanks.length > 0">
          <b-table hover striped bordered fixed :items="listOfBanks" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarBanco', params: { actionMode:'edit', selectedBank: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'CadastroFinanceiro'}">
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
  name: 'ConsultBanks',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfBanks: [],
			searchItem: '',
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'banco', label: 'Banco', sortable: true
				},						
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
    getItem () {
      if (this.searchItem.length === 0) {
        this.getBank()
      } else {
        this.getBankByName(this.searchItem)
      }
    },

    async getBank () {
      let response
      try {
        response = await RestConnection.get('bancos/consultar/banco/')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Bancos.")
          }
      }
      this.listOfBanks = response.data.conteudo
    },

    async getBankByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('bancos/consultar/banco/descricao/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Banco com este nome encontrado.')
            }
        }
        this.listOfBanks = response.data.conteudo
      }
	}

}
</script>

<style>

</style>