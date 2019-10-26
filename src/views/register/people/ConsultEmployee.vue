<template>
  <div>
    <template  v-if="this.$route.path === '/cadastro-pessoas/funcionarios'">
      <b-container>
				<b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-user-tie" main="Consultar Funcionários"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Ana"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarFuncionario', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Funcionário</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfEmployees.length > 0">
          <b-table hover striped bordered :items="listOfEmployees" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarFuncionario', params: { actionMode:'edit', selectedEmployee: data.item }}">
                <b-button variant="outline-info" class="justify-content-end mt-auto mx-auto"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
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
	name: 'ConsultarDeEmpregado',
	components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfEmployees: [],
      searchItem: '',
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nome', label: 'Nome', sortable: true },
        { key: 'cpf', label: 'CPF' },
        { key: 'status', label: 'Situação' },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },

  methods: {

    getItem () {
      if (this.searchItem.length === 0) {
        this.getEmployeeList()
      } else {
        this.getEmployeeByName(this.searchItem)
      }
    },

    async getEmployeeList () {
      let response
      try {
        response = await RestConnection.get('funcionarios/consultar/funcionario')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Funcionários.")
          }
      }
      this.listOfEmployees = response.data.conteudo
    },

    async getEmployeeByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('funcionarios/consultar/funcionario/nome/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Funcionário com este nome encontrado.')
            }
        }
        this.listOfEmployees = response.data.conteudo
      }
  }
}
</script>

<style>

</style>