<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-pessoas/clientes'">
      <b-container>
				<b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-user-astronaut" main="Consultar Clientes"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Geni Machado"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCustomers"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarCliente', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Cliente</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCustomers.length > 0">
          <b-table hover fixed striped bordered :items="listOfCustomers" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCliente', params: { actionMode:'edit', selectedEmployee: data.item }}">
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
import PageTitle from '../../../components/template/PageTitle'

export default {
	name: 'CadastroDeCliente',
	components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCustomers: [],
			customersReturnDB: [
				{
					id: '01',
					name: 'Antonio Neto',
					phone: '+55 (45) 98404-5443'
				}
			],
			fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'name', label: 'Nome do Cliente' },
        { key: 'phone', label: 'Telefone' },
        { key: 'actions', label: 'Ações' }
      ]
		}
	},

	methods: {
    getCustomers() {
      this.listOfCustomers = this.customersReturnDB
    }
  }

}
</script>

<style>

</style>