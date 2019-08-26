<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-money-bill-alt" main="Consultar Moedas"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Bitcoin"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCoin"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Cotação</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCoins.length > 0">
          <b-table hover striped bordered fixed :items="listOfCoins" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'edit', selectedCoin: data.item }}">
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
  name: 'CrudCoin',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfCoins: [],
			coinsDBReturn: [
				{
					id: '01',
					coin: 'real',
					symbol: "R$",
				},
				{
					id: '02',
					coin: 'dolar',
					symbol: "U$",
				},
				{
					id: '02',
					coin: 'peso',
					symbol: "P$",
				},
				{
					id: '04',
					coin: 'euro',
					symbol: "€",
				},
				{
					id: '05',
					coin: 'bitcoin',
					symbol: "₿",
				},
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'symbol', label: '$$', sortable: true
				},			
				{
					key: 'coin', label: 'Moeda', sortable: true
				},			
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getCoin() {
			this.listOfCoins = this.coinsDBReturn
		}
	}

}
</script>

<style>

</style>