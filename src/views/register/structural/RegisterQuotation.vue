<template>
	<div class="register-quotation">
    <template  v-if="this.$route.path === '/cadastro-estrutural/cotacao'">
      <page-title icon="fas fa-money-bill-alt" main="Cadastrar Cotação"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Moeda*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="selectedCoin"
                    :required="!selectedCoin" 
                    label="text" 
                    :options="coinList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-money-bill-alt"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarMoeda', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-money-bill-alt fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
              <label>Cotação</label>
              <v-money id="quotation" type="text" class="form-control " required placeholder="Exemplo: 4.00" v-model.number="quotation.cotacao" v-bind="money"></v-money>
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
import {Money} from 'v-money'

export default {
  name: 'CrudCotacoes',
  components: {
		'page-title': PageTitle,
    'v-money': Money
	},
  props: {
    actionMode: {
			type: String,
			default: 'save',
		},
    selectedQuotation: Object,
  },
  data() {
    return {
      quotation: {
        id: 0,
				cotacao: '',
        nomeMoeda: '',
        simbolo: '',
        idMoeda: 0,
      },
      selectedCoin: null,
			coinList: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 3,
        masked: false
      }
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
      this.selectedCoin = {value: this.quotation.idMoeda, text: `${this.quotation.simbolo} - ${this.quotation.nomeMoeda}`}
    }
    this.getCoins();
  },

  watch: {
    selectedCoin() {
      if (this.selectedCoin) this.quotation.idMoeda = this.selectedCoin.value
    }
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    async getCoins () {
      let response, coinList
      try {
        response = await RestConnection.get('moedas/consultar/')
        coinList = response.data.conteudo
        for (let i = 0; i < coinList.length; i++) {
					this.coinList.push({value: coinList[i].id, text: `${coinList[i].simbolo} - ${coinList[i].nomeMoeda}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Moedas.")
          }
          this.backOnePage()
      }
    },

    async saveRecord() {
      let response
      let parameters = {
        quotation: this.quotation.cotacao,
        id_coin: this.quotation.idMoeda
      }
      try {
        response = await RestConnection.post('cotacoes/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar esta Cotaçaõ.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.quotation.id,
        quotation: this.quotation.cotacao,
        id_coin: this.quotation.idMoeda
      }
      try {
        response = await RestConnection.put('cotacoes/atualizar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Atualizar esta Moeda.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('cotacoes/deletar/' + this.quotation.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Cotacão.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()      
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