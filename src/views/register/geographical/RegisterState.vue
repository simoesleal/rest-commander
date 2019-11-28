<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/estado'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-university" main="Cadastrar Estado"></page-title>       
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Estado*</label>
              <b-form-input id="state-name" class="mb-3" v-model="state.nome" required type="text" placeholder="Exemplo: Paraná"></b-form-input>
              <label>UF*</label>
              <b-form-input id="state-uf" class="mb-3" v-model="state.uf" required type="text" placeholder="Exemplo: PR"></b-form-input>   
              <label>Pais*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="countrySelected"
                    :required="!countrySelected" 
                    label="text" 
                    :options="countryList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-flag"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarPais', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-flag fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>        
                
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
  name: 'CrudState',
  components: {
		'page-title': PageTitle,
	},
  props: {
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedState: Object,
  },
  data() {
    return {
      state: {
        id: 0,
        nome: '',
        uf: '',
        paisId: 0,
        paisNome: ''
      },
      countrySelected: null,
      countryList: [],
    }
  },

  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

  mounted() {
    if(this.selectedState && this.selectedState.item) {
      this.state = this.selectedState.item
      this.countrySelected = {value: this.state.paisId, text: `${this.state.paisNome}`}
    } else {
      this.getInfos()
    }
  },

  watch: {
    countrySelected() {
      if (this.countrySelected) this.state.paisId = this.countrySelected.value
      if (this.countrySelected === null) {
        this.countryList = []
        this.countrySelected = ''
        this.getInfos()
      }
    }
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    async getInfos() {
			let response, countryList
			try {
				response = await RestConnection.get('paises/consultar/pais')
				countryList = response.data.conteudo			 
				for (let i = 0; i < countryList.length; i++) {
					this.countryList.push({value: countryList[i].id, text: `${countryList[i].sigla} - ${countryList[i].nomePt}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
			}
		},

    async saveRecord() {
      let response
      if (!this.countrySelected) {
        alert('Não identificamos nenhum País selecionado e este é um campo obrigatório. Por favor, tente novamente.')
      } else {
        let parameters = {
          name: this.state.nome,
          uf: this.state.uf,
          ibge: 0,
          pais: this.countrySelected.value
        }
        try {
          response = await RestConnection.post('estados/cadastrar/estado/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Salvar este Estado.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      }
    },

    async alterRecord() {
      let response
      if (!this.countrySelected) {
        alert('Não identificamos nenhum País selecionado e este é um campo obrigatório. Por favor, tente novamente.')
      } else {
        let parameters = {
          id: this.state.id,
          name: this.state.nome,
          uf: this.state.uf,
          ibge: 0,
          pais: this.countrySelected.value
        }
        try {
          response = await RestConnection.put('estados/atualizar/estado/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Atualizar este Estado.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      }
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('estados/deletar/estado/' + this.state.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este estado.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()    
    }
  },
}

</script>

<style scoped>
  .btn-new-register {
    position: relative;
    margin-left:-30px;
  }
</style>