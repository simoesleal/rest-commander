<template>
	<div>
		<div v-if="this.$route.path === '/contas-pagar'">
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-file-invoice" main="Contas a Pagar"></page-title> 
          </b-col>
        </b-row>
				<b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: LUZ"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'NovaContaPagar', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Duplicata</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3 table-responsive" v-if="listOfAccountsPayable.length > 0">
          <b-table hover striped bordered :items="listOfAccountsPayable" :fields="fields">
						<template v-slot:cell(actions)="data">
							<router-link :to="{ name: 'DetalhesContaPagar', params: { actionMode:'edit', selectedAccountPayable: data.item }}">
                <b-button variant="outline-info" class="mt-2 mx-auto"><i class="fas fa-info-circle"></i> Detalhes</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
			</b-container>
      <template v-if="searchStatus === 400">
          <b-alert class="mt-3 w-75 alert-link" variant="warning" show dismissible>Nenhuma Conta a Pagar encontrada.</b-alert> 
      </template>	
    </div>
		<router-view></router-view>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'

export default {
  name: 'ContasPagar',
  components: {
		'page-title': PageTitle
	},

	data() {
		return {
			listOfAccountsPayable: [],
			searchItem: '',
      searchStatus: 0,
			fields: [
        { key: 'id', label: 'ID', sortable: true},
        { key: 'codigo', label: 'Código', sortable: true},
        { key: 'tipoDocumento', label: 'Documento' },
        { key: 'qtdParcela', label: '# Parcelas' },
        { key: 'rsFornecedor', label: 'Fornecedor' },
        { key: 'docFornecedor', label: 'CNPJ/CPF' },
        { key: 'valorTotal', label: 'Valor Total' },
        { key: 'actions', label: 'Ações' }
      ]
		}
	},

	methods: {
		backOnePage() {
      this.$router.back()
    },

    getItem () {
      this.clearReactiveData()
      if (this.searchItem.length === 0) {
        this.getAccountPayablesList()
      } else {
        this.getAccountPayableByNumber(this.searchItem)
      }
    },

    async getAccountPayablesList () {
      let response
      try {
        response = await RestConnection.get('contas-a-pagar/consultar/')
        if (response.data.conteudo.length > 0) {
          this.listOfAccountsPayable = response.data.conteudo
        } else {
          this.searchStatus = 400
        }		
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Clientes.")
          }
      }      
    },

    async getAccountPayableByNumber (searchItem) {
      let response
      try {
          response = await RestConnection.get('contas-a-pagar/consultar/numeracao/' + searchItem)
          response = await RestConnection.get('contas-a-pagar/consultar/')
            if (response.data.conteudo.length > 0) {
              this.listOfAccountsPayable = response.data.conteudo
            } else {
              this.searchStatus = 400
            }
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhuma Conta a Pagar com este nome encontrado.')
            }
        }
      },

    clearReactiveData() {
      this.listOfAccountsPayable = []
      this.searchStatus = 0
    }
  }	
}
</script>

<style scoped>
</style>