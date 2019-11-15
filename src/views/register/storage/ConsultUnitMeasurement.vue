<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-estoque/consulta-unidade-medida'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-weight-hanging" main="Consultar Unidades de Medida"></page-title>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Litro"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarUnidadeMedida', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Grupo</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfItens.length > 0">
          <b-table hover striped bordered fixed :items="listOfItens" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarUnidadeMedida', params: { actionMode:'edit', selectedUnit: data.item }}">
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
  name: 'ConsultarUnidadeMedida',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfItens: [],
      searchItem: '',
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomeUnidade', label: 'Unidade', sortable: true },
        { key: 'abreviatura', label: 'Abreviatura', sortable: true },
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
        this.getUnitMeasurement()
      } else {
        this.getUnitMeasurementByName(this.searchItem)
      }
    },

    async getUnitMeasurement () {
      let response
      try {
        response = await RestConnection.get('unidade-medida/consultar/')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível buscar a lista de Unidade de Medidas.')
          }
      }
      this.listOfItens = response.data.conteudo
    },

    async getUnitMeasurementByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('unidade-medida/consultar/nome/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhuma Unidade de Medida com este nome encontrado.')
            }
        }
        this.listOfItens = response.data.conteudo 
    }
  }
}

</script>

<style>

</style>
