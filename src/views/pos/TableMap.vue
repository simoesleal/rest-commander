<template>
	<div>
		<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title  icon="fab fa-buromobelexperte" main="Mapa de Mesas"></page-title>       
          </b-col>
        </b-row>
		</b-container>
		<b-container fluid>
			<b-row>
				<b-col class="d-flex justify-content-center align-items-center">
					<router-link :to="{ name: 'NovoPedido'}">
						<b-button variant="primary" size="lg"><i class="fas fa-plus"></i> NOVO PEDIDO <i class="far fa-edit"></i> </b-button> 
					</router-link>						
				</b-col>
			</b-row>
			<hr>
				<b-row>
					<b-col cols="4" md="3" lg="2" v-for="(mesa, index) in listOfTables" :key="index">
							<router-link :to="{ name: 'ResumoMesa', params: { selectedTable: mesa }}">
								<template v-if="mesa.status === 'OCUPADA' ">
									<b-button class="mesas text-nowrap shadow-sm" variant="outline-danger"><i class="fab fa-buromobelexperte"></i> {{mesa.numero}}</b-button>
								</template>
								<template v-else>
									<b-button class="mesas text-nowrap shadow-sm" variant="outline-primary"><i class="fab fa-buromobelexperte"></i> {{mesa.numero}}</b-button>
								</template>								
							</router-link>
					</b-col>
				</b-row>
			<hr>
			<template v-if="searchStatus === 400">
				<b-alert class="mt-3 w-75 alert-link" variant="warning" show dismissible>Nenhuma Mesa encontrada.</b-alert> 
			</template>	
		</b-container>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'

export default {
	name: 'MapaMesas',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfTables: [],
			searchStatus: 0,
		}
	},
	mounted() {
		this.getTables()
	},
	methods: {
		async getTables () {
			this.clearReactiveData()	
      let response
      try {
        response = await RestConnection.get('mesas/consultar/mesa')
				if (response.data.conteudo.length > 0) {
					this.listOfTables = response.data.conteudo
				} else {
					this.searchStatus = 400
				}	
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Mesas.")
          }
      }      
    },

		clearReactiveData() {
      this.listOfTables = []
      this.searchStatus = 0
    }	
	}
}
</script>

<style scoped>

 .mesas {
	 margin-bottom: 30px;
	 padding: 15px;
 }

.map-item {
	 box-sizing: border-box;
	 border: 1px solid #eb4034;
	 padding: 10px;
	 margin: 5px;
	 width: 50%;
	 text-align: center;
}
</style>