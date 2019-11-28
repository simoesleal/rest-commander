<template>
  <div v-if="this.$route.path === '/cadastro-financeiro/consulta-conta-bancaria'">
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-piggy-bank" main="Consultar Contas Bancária"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: 00001"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarContaBancaria', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfBankAccount.length > 0">
          <b-table hover striped bordered :items="listOfBankAccount" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarContaBancaria', params: { actionMode:'edit', selectedBankAccount: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <template v-if="searchStatus === 400">
          <b-alert class="mt-3 w-75 alert-link" variant="warning" show dismissible>Nenhuma Conta Bancária encontrada.</b-alert> 
        </template>	
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
			listOfBankAccount: [],
			selectedBankAccount: '',
      searchItem: '',
      searchStatus: 0,
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'contaBancaria', label: 'Conta', sortable: true
				},
				{
					key: 'agencia', label: 'Agência', sortable: true
				},						
				{
					key: 'digitoAgencia', label: '#', sortable: true
				},						
				{
					key: 'numeroConta', label: 'Número', sortable: true
				},						
				{
					key: 'digitoConta', label: '#', sortable: true
				},						
				{
					key: 'nomeBanco', label: 'Banco', sortable: true
				},						
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
    getItem () {
      this.clearReactiveData()
      if (this.searchItem.length === 0) {
        this.getBankAccount()
      } else {
        this.getBankAccountByName(this.searchItem)
      }
    },

    async getBankAccount () {
      let response
      try {
        response = await RestConnection.get('contas-bancarias/consultar/conta-bancaria/')
        if (response.data.conteudo.length > 0) {
          this.listOfBankAccount = response.data.conteudo
        } else {
          this.searchStatus = 400
        }		
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Contas Bancárias.")
          }
      }      
    },

    async getBankAccountByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('contas-bancarias/consultar/conta-bancaria/descricao/' + searchItem)
          if (response.data.conteudo.length > 0) {
          this.listOfBankAccount = response.data.conteudo
        } else {
          this.searchStatus = 400
        }	
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhuma Conta Bancária com este nome encontrado.')
            }
        }
      },

    clearReactiveData() {
      this.listOfBankAccount = []
      this.searchStatus = 0
    }	
	}

}
</script>

<style>

</style>