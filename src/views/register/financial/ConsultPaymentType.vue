<template>
  <div v-if="this.$route.path === '/cadastro-financeiro/consulta-tipo-pagamento'">
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-money-check-alt" main="Consultar Formas de Pagamento"></page-title>   
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: À Vista"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarTipoPagamento', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfPaymentType.length > 0">
          <b-table hover striped bordered :items="listOfPaymentType" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarTipoPagamento', params: { actionMode:'edit', selectedPaymentType: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <template v-if="searchStatus === 400">
          <b-alert class="mt-3 w-75 alert-link" variant="warning" show dismissible>Nenhuma Forma de Pagamento encontrads.</b-alert> 
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
			listOfPaymentType: [],
			selectedPaymentType: '',
      searchItem: '',
      searchStatus: 0,
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'forma', label: 'Forma de Pagamento', sortable: true
				},						
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
    getItem () {
      this.clearReactiveData()	
      if (this.searchItem.length === 0) {
        this.getPaymentType()
      } else {
        this.getPaymentTypeByName(this.searchItem)
      }
    },

    async getPaymentType () {
      let response
      try {
        response = await RestConnection.get('formas-pagamento/consultar/')
        if (response.data.conteudo.length > 0) {
          this.listOfPaymentType = response.data.conteudo
        } else {
          this.searchStatus = 400
        }	
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de formas de pagamento.")
          }
      }      
    },

    async getPaymentTypeByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('formas-pagamento/consultar/')
          if (response.data.conteudo.length > 0) {
          this.listOfPaymentType = response.data.conteudo
          } else {
            this.searchStatus = 400
          }	
          //response = await RestConnection.get('bancos/consultar/banco/descricao/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum forma de pagamento com este nome encontrado.')
            }
        }
      },

    clearReactiveData() {
      this.listOfPaymentType = []
      this.searchStatus = 0
    }		
	}

}
</script>

<style>

</style>