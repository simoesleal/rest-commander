<template>
	<div>
		<b-container fluid>
			<b-row>
				<b-col class="d-flex justify-content-center align-items-center">
					<b-button variant="outline-primary" size="lg" block><i class="fas fa-plus"></i> NOVO PEDIDO <i class="far fa-edit"></i> </b-button> 
				</b-col>
			</b-row>
			<hr>
				<b-row>
					<b-col cols="4" md="3" lg="2" v-for="(mesa, index) in listOfTables" :key="index">
						<b-button class="mesas text-nowrap shadow-sm" variant="outline-primary"><i class="fab fa-buromobelexperte"></i> {{mesa}}</b-button>
					</b-col>
				</b-row>
			<hr>
				<label class="text-uppercase">Ultimos pedidos</label>
				<b-table responsive hover striped bordered :items="ultimoPediodos" :fields="fields">
				</b-table>
		</b-container>
	</div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle'

export default {
	 name: 'ListaDeMesas',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfTables: [],
			mesas: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
			ultimoPediodos: [
        { num: '01', item: 'Original', qtd:'02'},
        { num: '03', item: 'Moqueca de Peixe com Camarão', qtd:'01'},
        { num: '15', item: 'Casquinha de Siri', qtd:'06'},
			],
			fields: [
        { key: 'num', label: 'Mesa', sortable: true},
        { key: 'item', label: 'Produto', sortable: true },
        { key: 'qtd', label: 'QTD', sortable: true },
      ]
		}
	},
	created() {
		this.listOfTables = this.mesas
	}

}
</script>

<style scoped>
 .mesas {
	 margin-bottom: 30px;
	 padding: 15px;
 }
</style>