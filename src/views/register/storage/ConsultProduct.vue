<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-estoque/consulta-produto'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-hamburger" main="Consultar de Produtos"></page-title> 
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Arroz"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarProduto', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Produto</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfItens.length > 0">
          <b-table hover striped bordered fixed :items="listOfItens" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarProduto', params: { actionMode:'edit', selectedProduct: data.item }}">
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
  name: 'ConsultarProdutos',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfItens: [],
      searchItem: '',
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomeProduto', label: 'Produto', sortable: true },
        { key: 'descricaoProduto', label: 'Descrição', sortable: true },
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
        this.getProduct()
      } else {
        this.getProductByName(this.searchItem)
      }
    },

    async getProduct () {
      let response
      try {
        response = await RestConnection.get('produtos/consultar/produto/')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível buscar a lista de Produtos.')
          }
      }
      this.listOfItens = response.data.conteudo
    },

    async getProductByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('produtos/consultar/produto/descricao/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Produto com este nome encontrado.')
            }
        }
        this.listOfItens = response.data.conteudo 
    }
  }
}

</script>

<style>

</style>
