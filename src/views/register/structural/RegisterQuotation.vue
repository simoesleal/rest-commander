<template>
	<div class="register-quotation">
    <template  v-if="this.$route.path === '/cadastro-estrutural/cotacao'">
      <page-title icon="fas fa-money-bill-alt" main="Cadastrar Cotação"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="quotation-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="quotation.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>Moeda*</label>
              <b-input-group class="mb-3">
                <b-form-select v-model="quotation.coin" :options="coinList" :disabled="setInputFieldDisabled"></b-form-select>
                <b-input-group-append>
                  <router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
                    <b-button variant="primary"><i class="fas fa-money-bill-alt"></i></b-button>
                  </router-link>
                </b-input-group-append>
              </b-input-group>
              <label>Cotação</label>
							<b-form-input id="quotation" class="mb-3" :disabled="setInputFieldDisabled" v-model="quotation.currentQuotation" required type="number" placeholder="Exemplo: 4.00"></b-form-input>
          </b-form-group>
        </b-form>
				<b-row>
          <b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
            <div @click="backOnePage">
              <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
              <div class="text-uppercase font-300">Voltar</div>
            </div>
          </b-col>
          <template v-if="actionMode==='save'">
            <b-col class="d-flex justify-content-end m-3 mt-5">
              <b-button variant="outline-primary" @click="saveRecord">Salvar</b-button>
            </b-col>            
          </template>
          <template v-else>
            <b-col class="d-flex justify-content-end m-3 mt-5">
              <b-button class="mr-3" variant="outline-info" @click="alterRecord">Salvar Alteração</b-button>
              <b-button variant="outline-danger" @click="deleteRecord">Excluir</b-button>
            </b-col>
          </template>
        </b-row>
    </template>
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudCotacoes',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedQuotation: Object,
  },
  data() {
    return {
      quotation: {
        id: 0,
        coin: '',
				symbol: '',
				currentQuotation: '',
				dataOfCreation: ''
      },
			coinList: [
				{ value: null, text: 'Selecione a Moeda' }, 
        { value: 'real', text: 'Real - R$' },
        { value: 'dolar', text: 'Dolar - U$' }, 
        { value: 'peso', text: 'Peso - P$' }, 
        { value: 'euro', text: 'Euro - €' }, 
        { value: 'bitcon', text: 'Bitcoin - ₿' }, 
			]
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedQuotation) {
      this.quotation = this.selectedQuotation    

    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    saveRecord() {
      console.log('saveRecord')
    },

    alterRecord() {
      console.log('alterRecord')
    },

    deleteRecord() {
      console.log('deleteRecord')      
    },

    clearReactiveData(){
      this.quotation.id = 0,
      this.quotation.coin = ''
      this.quotation.symbol = ''
      this.quotation.currentQuotation = ''
      this.quotation.dataOfCreation = ''
    },
  }
}
</script>

<style>

</style>