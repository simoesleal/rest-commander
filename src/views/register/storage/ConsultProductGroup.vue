<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-estoque/consulta-grupo-produto'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-hamburger" main="Consultar Grupo de Produtos"></page-title>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Bebidas"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarGrupoProdutos', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Grupo</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfItens.length > 0">
          <b-table hover striped bordered :items="listOfItens" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarGrupoProdutos', params: { actionMode:'edit', selectedProductGroup: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <template v-if="searchStatus === 400">
          <b-alert class="mt-3 w-75 alert-link" variant="warning" show dismissible>Nenhum Grupo de Produto encontrado.</b-alert> 
        </template>	
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
  name: 'ConsultarGrupoProdutos',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfItens: [],
      searchItem: '',
      searchStatus: 0,
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomeGrupo', label: 'Grupo', sortable: true },
        { key: 'descricao', label: 'Descrição', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },

  methods: {
    backOnePage () {
      this.$router.back()
    },

    getItem () {
      this.clearReactiveData()
      if (this.searchItem.length === 0) {
        this.getProductGroup()
      } else {
        this.getProductGroupByName(this.searchItem)
      }
    },

    async getProductGroup () {
      let response
      try {
        response = await RestConnection.get('grupos-produto/consultar/')
        if (response.data.conteudo.length > 0) {
          this.listOfItens = response.data.conteudo
        } else {
          this.searchStatus = 400
        }	
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível buscar a lista de Grupos de Produtos.')
          }
      }
     
    },

    async getProductGroupByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('grupos-produto/consultar/nome/' + searchItem)
          if (response.data.conteudo.length > 0) {
          this.listOfItens = response.data.conteudo
        } else {
          this.searchStatus = 400
        }	
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Grupo de Produto com este nome encontrado.')
            }
        }
    },
    clearReactiveData() {
        this.listOfItens = []
        this.searchStatus = 0
      }	
  }
}

</script>

<style>

</style>
