<template>
	<div class="register-coin">
    <template  v-if="this.$route.path === '/cadastro-estrutural/moeda'">
      <page-title icon="fas fa-money-bill-alt" main="Cadastrar Moeda"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="coin-id" class="mb-3" v-model="coin.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
							<label>Simbolo</label>
							<b-form-input id="coin" class="mb-3" v-model="coin.simbolo" required type="text" placeholder="Exemplo: R$"></b-form-input>
              <label>Nome Moeda</label>
							<b-form-input id="coin" class="mb-3" v-model="coin.nomeMoeda" required type="text" placeholder="Exemplo: Real"></b-form-input>
              <label>Nome Plural</label>
							<b-form-input id="coin" class="mb-3" v-model="coin.nomeMoedaPlural" required type="text" placeholder="Exemplo: Real"></b-form-input>
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
import { RestConnection } from '../../../rest/rest.connection'
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
        nomeMoeda: '',
				nomeMoedaPlural: '',
        simbolo: '',
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

    async saveRecord() {
      let response
      let parameters = {
        name: this.coin.nomeMoeda,
        pluralName: this.coin.nomeMoedaPlural,
        symbol: this.coin.simbolo
      }
      try {
        response = await RestConnection.post('moedas/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar esta Moeda.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.coin.id,
        name: this.coin.nomeMoeda,
        pluralName: this.coin.nomeMoedaPlural,
        symbol: this.coin.simbolo
      }
      try {
        response = await RestConnection.put('moedas/atualizar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar esta Moeda.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('moedas/deletar/' + this.coin.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta moeda.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()    
      }  
    }
}
</script>

<style>

</style>