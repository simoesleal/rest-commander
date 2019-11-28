<template>
	<div>
    <template  v-if="this.$route.path === '/cadastro-financeiro/cadastrar-tipo-documento'">
      <page-title icon="far fa-file-alt" main="Cadastrar Tipo de Documento"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
							<label>Documento*</label>
							<b-form-input id="tipo-documento" class="mb-3" v-model="documentType.tipoDocumento" required type="text" placeholder="Exemplo: Boleto"></b-form-input>
              <label>Descrição</label>
              <textarea id="informacoes-adicionais" name="informacoes-adicionais" class="form-control" maxlength="150" v-model="documentType.descricao"></textarea>
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
  name: 'CrudTipoDocumento',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedDocumentType: Object,
  },
  data() {
    return {
      documentType: {
        id: 0,
        tipoDocumento: '',
				descricao: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedDocumentType) {
      this.documentType = this.selectedDocumentType    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        typeDocument: this.documentType.tipoDocumento,
        description: this.documentType.descricao,
        status: true
      }
      try {
        response = await RestConnection.post('tipo-documento/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Salvar este tipo de documento.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.documentType.id,
        typeDocument: this.documentType.tipoDocumento,
        description: this.documentType.descricao,
        status: true
      }
      try {
        response = await RestConnection.put('tipo-documento/atualizar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este Tipo de Documento.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('tipo-documento/deletar/' + this.documentType.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este Tipo de Documento.')
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