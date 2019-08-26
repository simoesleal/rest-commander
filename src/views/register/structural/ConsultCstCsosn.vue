<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-creative-commons-nc" main="Consultar CST/CSOSN"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Não tributada pelo Simples Nacional"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCst"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarCstCsosn', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo CST</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCstCsosn.length > 0">
          <b-table hover striped bordered fixed :items="listOfCstCsosn" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCstCsosn', params: { actionMode:'edit', selectedCstCsosn: data.item }}">
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
  name: 'CrudCstCsosn',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCstCsosn: [],
			cstDBReturn: [
				{
					id: '01',
					origin: '0 - Nacional, exceto as indicadas nos códigos 3 a 5',
					cst: '000',
					description: 'Tributada integralmente',
					typeTaxMoviment: 'entriesOnly',
          typeCstCsosn: 'nr',
				},
				{
					id: '02',
					origem: '1 - Estrangeira - Importação direta, exceto a indicada no código 6',
					cst: '10',
					description: 'Tributada e com cobrança do ICMS por substituição tributária',
					typeTaxMoviment: 'CSOSN'
				},				
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'cst', label: 'CST', sortable: true
				},				
				{
					key: 'description', label: 'Descrição'
				},				
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getCst() {
			this.listOfCstCsosn = this.cstDBReturn
		}
	}

}
</script>

<style>

</style>