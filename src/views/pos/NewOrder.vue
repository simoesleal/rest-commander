<template>
  <div>
    <template >
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="far fa-edit" main="Novo Pedido"></page-title>           
          </b-col>
        </b-row>
				<b-form class="form-panel">
          <b-form-group
            id="selected-table"
            description="*Campos obrigatórios">             
						<label>Mesa</label>
              <b-input-group>
                <b-form-select v-model="tableSelected" :options="tableList"></b-form-select>
              </b-input-group>
          </b-form-group>
          <b-input-group>
						<b-form-input id="selected-product" class="mb-3" v-model="selectedProduct" type="text" placeholder="Exemplo: Original"></b-form-input>
						<b-input-group-append>
							<router-link :to="{ name: '', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-search"></i></b-button>
							</router-link>
						</b-input-group-append>
					</b-input-group>
        </b-form>
        <hr>
        <label class="text-uppercase">Resudo do Pedido</label>
				<b-table responsive hover striped bordered :items="itensPedido" :fields="fields">
				</b-table>
      </b-container>	
    </template>
  </div>
</template>
<script>
import PageTitle from '../../components/template/PageTitle'

export default {
 name: 'NovoPedido',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			tableSelected: '',
      tableList: [
        { value: null, text: 'Selecione uma mesa' }, 
        { value: '01', text: '01' },
        { value: '02', text: '02' },
        { value: '03', text: '03' },
        { value: '04', text: '04' },
        { value: '05', text: '05' },
        { value: '06', text: '06' },
        { value: '07', text: '07' },
        { value: '08', text: '08' },
        { value: '09', text: '09' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' },
        { value: '13', text: '13' },
        { value: '14', text: '14' },
        { value: '15', text: '15' },
        { value: '16', text: '16' },
        { value: '17', text: '17' },
        { value: '18', text: '18' },
        { value: '19', text: '19' },
        { value: '20', text: '20' },
      ],
			selectedProduct: '',
      productList: [
        { value: null, text: 'Selecione um produto' }, 
        { value: '01', text: 'Original' },
        { value: '02', text: 'Brahma' },
        { value: '03', text: 'Refrigerante' },
      ],
      itensPedido: [
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
	}
}

</script>

<style>

</style>