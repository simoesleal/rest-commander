<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-bars" main="Cadastrar Grupo do Cardápio"></page-title> 
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Grupo*</label>
              <b-form-input id="productgroup-name" class="mb-3" v-model="menuGroup.nomeGrupo" required type="text" placeholder="Exemplo: Bebidas"></b-form-input>
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
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedMenuGroup: Object,
  },
  data() {
    return {
      menuGroup: {
        id: 0,
        nomeGrupo: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedMenuGroup) {
      this.menuGroup = this.selectedMenuGroup    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        name: this.menuGroup.nomeGrupo,
        status: true,
      }
      try {
        response = await RestConnection.post('grupos-cardapio/cadastrar/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar este Grupo do Cardápio.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.menuGroup.id,
        name: this.menuGroup.nomeGrupo,
        status: true,
      }
      try {
        response = await RestConnection.put('grupos-cardapio/atualizar/', parameters)
      } catch (exception) {
        if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
          return alert(exception.response.data.mensagem)
        } else {
          return alert('Não foi possível Atualizar este Grupo do Cardápio.')
        }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
        response = await RestConnection.delete('grupos-cardapio/deletar/' + this.menuGroup.id)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Deletar este Grupo de Cadápio.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()    
    }
  }
}

</script>
