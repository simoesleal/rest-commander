<template>
	<div>
    <template v-if="this.$route.path === '/cadastro-financeiro/cadastrar-tipo-pagamento'">
      <page-title icon="fas fa-money-check-alt" main="Cadastrar Forma de Pagamento"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
							<label>Tipo do Pagamento</label>
							<b-form-input id="tipo-pagamento" class="mb-3" v-model="tipoPagamento.forma" required type="text" placeholder="Exemplo: Crédito em Conta"></b-form-input>
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
  name: 'CrudBanks',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedPaymentType: Object,
  },
  data() {
    return {
      tipoPagamento: {
        id: 0,
        forma: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedPaymentType) {
      this.tipoPagamento = this.selectedPaymentType    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        typePayment: this.tipoPagamento.forma,
        status: true,
      }
      try {
        response = await RestConnection.post('formas-pagamento/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Salvar esta Forma de Pagamento.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.tipoPagamento.id,
        typePayment: this.tipoPagamento.forma,
        status: true,
      }
      try {
        response = await RestConnection.put('formas-pagamento/atualizar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar esta Forma de Pagamento.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('formas-pagamento/deletar/' + this.tipoPagamento.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Forma de Pagamento.')
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