<template>
  <div>
    <template v-if="this.$route.path === '/cadastro-estrutural/cestes'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-creative-commons-nc" main="Consultar CEST"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: 03.021.00"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCest"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarCest', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo CEST</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCests.length > 0">
          <b-table hover striped bordered fixed :items="listOfCests" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCest', params: { actionMode:'edit', selectedCest: data.item }}">
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
  name: 'CrudCEST',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCests: [],
			cestDBReturn: [
				{
					id: '01',
					cest: '03.021.00',
          ncm: '2203.00.00',
          segment: 'Cervejas, chopes, refrigerantes, águas e outras bebidas',
					description: 'Cerveja',
				},
				{
					id: '02',
					cest: '03.023.00 ',
          ncm: '2203.00.00',
          segment: 'Cervejas, chopes, refrigerantes, águas e outras bebidas',
					description: 'Chope',
				},
				{
					id: '03',
					cest: '28.062.00',
          ncm: '2203.00.00',
          segment: 'Venda de mercadorias pelo sistema porta a porta',
					description: 'Produtos das indústrias alimentares e bebidas ',
				}
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'description', label: 'Descrição', sortable: true
				},				
				{
					key: 'cest', label: 'CEST', sortable: true
				},				
				{
					key: 'ncm', label: 'NCM', sortable: true
				},				
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getCest() {
			this.listOfCests = this.cestDBReturn
		}
	}

}
</script>

<style>

</style>