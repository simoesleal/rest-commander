<template>
	<div>
    <template v-if="this.$route.path === '/cadastro-financeiro/cadastrar-banco'">
      <page-title icon="fas fa-university" main="Cadastrar Banco"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
							<label>Banco*</label>
							<b-form-input id="nome-banco" class="mb-3" v-model="bank.banco" required type="text" placeholder="Exemplo: Banco Novo"></b-form-input>
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
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedBank: Object,
  },
  data() {
    return {
      bank: {
        id: 0,
        banco: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedBank) {
      this.bank = this.selectedBank    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        name: this.bank.banco,
      }
      try {
        response = await RestConnection.post('bancos/cadastrar/banco/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Salvar este Banco.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.bank.id,
        name: this.bank.banco,
      }
      try {
        response = await RestConnection.put('bancos/atualizar/banco/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este Banco.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('bancos/deletar/banco/' + this.bank.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este Banco.')
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