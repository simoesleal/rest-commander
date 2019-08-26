<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-buromobelexperte" main="Consultar Mesas"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: 01"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getTables"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarMesa', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Mesa</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfTables.length > 0">
          <b-table hover striped bordered fixed :items="listOfTables" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarMesa', params: { actionMode:'edit', selectedTable: data.item }}">
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
  name: 'CrudMesa',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfTables: [],
			tablesDBReturn: [
				{
					id: '01',
					tableNumber: '01',
				},
				{
					id: '02',
					tableNumber: '02',
				},
				{
					id: '03',
					tableNumber: '03',
				},
				{
					id: '04',
					tableNumber: '04',
				},
				{
					id: '05',
					tableNumber: '05',
				},
				{
					id: '06',
					tableNumber: '06',
				},
				{
					id: '07',
					tableNumber: '07',
				},
				{
					id: '08',
					tableNumber: '08',
				},
				{
					id: '09',
					tableNumber: '09',
				},
				{
					id: '10',
					tableNumber: '10',
				},
			],
			fields: [
				{
					key: 'tableNumber', label: 'Número da Mesa', sortable: true
				},
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getTables() {
			this.listOfTables = this.tablesDBReturn
		}
	}

}
</script>

<style>

</style>