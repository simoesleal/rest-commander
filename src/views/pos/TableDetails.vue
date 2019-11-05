<template>
	<div>
		<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-buromobelexperte" main="Resumo"></page-title><strong class="h2">Mesa {{mesa.numero}}</strong> <strong class="h2"> - {{mesa.status}}</strong>
          </b-col>
        </b-row>
		</b-container>
		<b-container fluid>
			<div class="my-5">
          <label class="text-uppercase">Resudo do Pedido</label>
          <b-table responsive hover striped bordered :items="itensPedido" :fields="fields">
          </b-table>
        </div>
        <b-row class="mt-5 p-5">
          <b-col>
            <b-button block variant="outline-danger">Fechar Mesa</b-button>
          </b-col>
        </b-row> 
		</b-container>
		<b-row>
			<b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
				<div @click="backOnePage">
						<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
						<div class="text-uppercase font-300">Voltar</div>
				</div>
			</b-col>
		</b-row>
	</div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle'

export default {
	name: 'ResumoMesa',
  components: {
		'page-title': PageTitle
	},
  props: {
    selectedTable: Object,
  },
	data() {
		return {
			mesa: {
				id: 0,
				numero: 0,
				detalhes: '',
				status: '',
			},
			itensPedido: [],
			fields: [
        { key: 'idProduto', label: 'Código', sortable: true},
        { key: 'produto', label: 'Produto', sortable: true},
        { key: 'quantidade', label: 'QTD', sortable: true},
        { key: 'observacao', label: 'Obs', sortable: true},
      ],
		}
	},
  mounted() {
    if(this.selectedTable) {
			console.log(this.selectedTable)
      this.mesa = this.selectedTable  
    }
	},
	methods: {
		backOnePage() {
      this.$router.back()
    },
	}
}
</script>

<style scoped>
</style>