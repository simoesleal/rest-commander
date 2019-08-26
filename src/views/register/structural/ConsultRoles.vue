<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-black-tie" main="Consultar Funções"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Caixa"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getRoles"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarFuncao', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Função</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfRoles.length > 0">
          <b-table hover striped bordered fixed :items="listOfRoles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarFuncao', params: { actionMode:'edit', selectedRole: data.item }}">
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
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudFuncoes',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfRoles: [],
			rolesDBReturn: [
				{
					id: '01',
					description: 'Administrador',
				},
				{
					id: '02',
					description: 'Caixa',
				},
				{
					id: '03',
					description: 'Garçom',
				},
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'description', label: 'Função', sortable: true
				},
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getRoles() {
			this.listOfRoles = this.rolesDBReturn
		}
	}

}
</script>

<style>

</style>