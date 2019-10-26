<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-pessoas/fornecedores'">
      <b-container>
				<b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-truck" main="Consultar Fornecedores"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Mercado"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarFornecedor', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Fornecedor</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfProviders.length > 0">
          <b-table hover fixed striped bordered :items="listOfProviders" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarFornecedor', params: { actionMode:'edit', selectedProvider: data.item }}">
                <b-button variant="outline-info" class="mt-2 mx-auto"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'CadastroPessoas'}">
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
	name: 'CadastroDeFornecedor',
	components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfProviders: [],
      searchItem: '',
			fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomeFantasia', label: 'Nome Fantasia' },
        { key: 'razaoSocial', label: 'Razão Social' },
        { key: 'cpfCnpj', label: 'CNPJ' },
        { key: 'actions', label: 'Ações' }
      ]
		}
	},

  methods: {

    getItem () {
      if (this.searchItem.length === 0) {
        this.getProvidersList()
      } else {
        this.getProviderByName(this.searchItem)
      }
    },

    async getProvidersList () {
      let response
      try {
        response = await RestConnection.get('fornecedores/consultar/fornecedor')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Fornecedores.")
          }
      }
      this.listOfProviders = response.data.conteudo
    },

    async getProviderByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('fornecedores/consultar/fornecedor/razao-social/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Fornecedor com este nome encontrado.')
            }
        }
        this.listOfProviders = response.data.conteudo
      }
  }

}
</script>

<style>

</style>