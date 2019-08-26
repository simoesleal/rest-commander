<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-creative-commons-nc" main="Consultar CFOP"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: COMPRAS DE ENERGIA ELÉTRICA"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCfop"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarCfop', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo CFOP</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCfop.length > 0">
          <b-table hover striped bordered fixed :items="listOfCfop" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCfop', params: { actionMode:'edit', selectedCfop: data.item }}">
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
  name: 'CrudCFOP',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCfop: [],
			cfopDBReturn: [
				{
					id: '01',
					cfop: '1.100',
          description: 'COMPRAS PARA INDUSTRIALIZAÇÃO, COMERCIALIZAÇÃO OU PRESTAÇÃO DE SERVIÇOS',
          typeCfop: 'cfop',
          typeTaxMoviment: 'entriesOnly',
          destinationOperation: 'insideState',
          tax: {
            icms: 'tc',
            subsTributaria: 'int',
            ipi: 'tc',
            iss: 'iicms',
            cst: '50'
          }
				},
				{
					id: '02',
					cfop: '1.101',
          description: ' Compra para industrialização ou produção rural ',
				},
				{
					id: '03',
					cfop: '1.102',
          description: 'Compra para comercialização',
				},
				{
					id: '04',
					cfop: '1.111',
          description: 'Compra para industrialização de mercadoria recebida anteriormente em consignação industrial',
				},
				{
					id: '05',
					cfop: '1.124',
          description: ' Industrialização efetuada por outra empresa',
				},
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'cfop', label: 'CFOP', sortable: true
				},				
				{
					key: 'description', label: 'Descrição', sortable: true
				},				
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getCfop() {
			this.listOfCfop = this.cfopDBReturn
		}
	}

}
</script>

<style>

</style>