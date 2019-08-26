<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-creative-commons-nc" main="Consultar CST PIS/COFINS"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Operações de Saída"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCst"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarCstPisCofins', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo CST</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCstPisCofins.length > 0">
          <b-table hover striped bordered fixed :items="listOfCstPisCofins" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCstPisCofins', params: { actionMode:'edit', selectedCstPisCofins: data.item }}">
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
  name: 'CrudCstPisCofins',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCstPisCofins: [],
			cstDBReturn: [
				{
					id: '01',
					cst: '50',
					description: 'Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Tributada no Mercado Interno',
					typeTaxMoviment: 'entriesOnly',
					typeCstCsosn: 'nr',
				},
				{
					id: '02',
					cst: '55',
					description: 'Operação com Direito a Crédito – Vinculada a Receitas Não Tributadas Mercado Interno e de Exportação',
					typeTaxMoviment: 'ENTRADAS'
				},
				{
					id: '03',
					cst: '01',
					description: 'Operação Tributável com Alíquota Básica',
					typeTaxMoviment: 'SAIDAS'
				},
				{
					id: '05',
					cst: '02',
					description: 'Operação Tributável com Alíquota por Unidade de Medida de Produto',
					typeTaxMoviment: 'SAIDAS'
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
			this.listOfCstPisCofins = this.cstDBReturn
		}
	}

}
</script>

<style>

</style>