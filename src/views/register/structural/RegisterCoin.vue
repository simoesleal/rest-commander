<template>
	<div class="register-coin">
    <template  v-if="this.$route.path === '/cadastro-estrutural/moeda'">
      <page-title icon="fas fa-money-bill-alt" main="Cadastrar Moeda"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="coin-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="coin.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
							<label>Simbolo</label>
							<b-form-input id="coin" class="mb-3" :disabled="setInputFieldDisabled" v-model="coin.symbol" required type="text" placeholder="Exemplo: R$"></b-form-input>
              <label>Cotação</label>
							<b-form-input id="coin" class="mb-3" :disabled="setInputFieldDisabled" v-model="coin.coin" required type="text" placeholder="Exemplo: Real"></b-form-input>
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
    selectedCoin: Object,
  },
  data() {
    return {
      coin: {
        id: 0,
        coin: '',
				symbol: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCoin) {
      this.coin = this.selectedCoin    

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
      this.coin.id = 0,
      this.coin.coin = ''
      this.coin.symbol = ''
    },
  }
}
</script>

<style>

</style>