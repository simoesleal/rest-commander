<template>
	<div class="register-quotation">
    <template  v-if="this.$route.path === '/cadastro-estrutural/mesa'">
      <page-title icon="fab fa-buromobelexperte" main="Cadastrar Mesa"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Número da Mesa*</label>
							<b-form-input id="quotation" class="mb-3" v-model="table.numero" required type="text" placeholder="Exemplo: 01"></b-form-input>
              <label>Detalhe</label>
              <b-form-input id="quotation-id" class="mb-3" v-model="table.detalhes" required type="text" placeholder="Exemplo: Familia"></b-form-input>              
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
  name: 'CrudMesa',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: {
      default: 'save',
      type: String
    },
    selectedTable: Object,
  },
  data() {
    return {
      table: {
        id: 0,
        numero: '',
        detalhes: '',
        status: 'ABERTA'
      },
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedTable) {
      this.table = this.selectedTable  
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        number: this.table.numero,
        details: this.table.detalhes,
        status: this.table.status
      }
      try {
        response = await RestConnection.post('mesas/cadastrar/mesa/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar esta Mesa.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.table.id,
        number: this.table.numero,
        details: this.table.detalhes,
        status: this.table.status
      }
      try {
        response = await RestConnection.put('mesas/atualizar/mesa/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar esta Mesa.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('mesas/deletar/mesa/' + this.table.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta mesa.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()    
      }   
    },
}
</script>

<style>

</style>