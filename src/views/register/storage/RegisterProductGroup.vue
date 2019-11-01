<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-hamburger" main="Cadastrar Grupo de Produtos"></page-title> 
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Grupo*</label>
              <b-form-input id="productgroup-name" class="mb-3" v-model="productGroup.nomeGrupo" required type="text" placeholder="Exemplo: Bebidas"></b-form-input>
              <label>Descrição</label>
              <b-form-input id="productgroup-description" class="mb-3" v-model="productGroup.descricao" required type="text" placeholder="Exemplo: Alcoolicas"></b-form-input>
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
      </b-container>
    </template>
  </div>
</template>


<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudGrupoProdutos',
  components: {
		'page-title': PageTitle
  },
  props: {
    actionMode: String,
    selectedProductGroup: Object,
  },
  data() {
    return {
      productGroup: {
        id: 0,
        nomeGrupo: '',
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
    if(this.selectedProductGroup) {
      this.productGroup = this.selectedProductGroup    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        name: this.productGroup.nomeGrupo,
        details: this.productGroup.descricao,
        status: true,
      }
      try {
        response = await RestConnection.post('grupos-produto/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar este Grupo de Produtos.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.productGroup.id,
        name: this.productGroup.nomeGrupo,
        details: this.productGroup.descricao,
        status: true,
      }
      try {
        response = await RestConnection.put('grupos-produto/atualizar/', parameters)
      } catch (exception) {
        if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
          return alert(exception.response.data.mensagem)
        } else {
          return alert('Não foi possível Atualizar este Grupo de Produtos.')
        }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
        response = await RestConnection.delete('grupos-produto/deletar/' + this.productGroup.id)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Deletar este Grupo de Produtos.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()    
    }
  }
}

</script>
