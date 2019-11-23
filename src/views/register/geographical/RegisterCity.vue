<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-city" main="Cadastrar Cidade"></page-title>          
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Nome*</label>
              <b-form-input id="city-name" class="mb-3" v-model="city.nomeCidade" required type="text" placeholder="Exemplo: Paraná"></b-form-input>
              <label>UF*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="ufSelected"
                    :required="!ufSelected" 
                    label="text" 
                    :options="ufBrazilianStates">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-flag"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-flag fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
              <!-- <b-input-group>
               <b-form-select class="mb-3" v-model="ufSelected" :options="ufBrazilianStates"></b-form-select>
                <b-input-group-append>
                  <router-link :to="{ name: 'ConsultarEstado', params: { actionMode:'save' }}">
                    <b-button variant="primary"><i class="fas fa-university fa-lg"></i></b-button>
                  </router-link>
                </b-input-group-append>
              </b-input-group> -->
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
  name: 'CrudCidade',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedCity: Object,
  },
  data() {
    return {
      city: {
        id: 0,
        nomeCidade: '',
        idEstado: 0,
        nomeEstado: '',
        uf: '',
      },
      ufSelected: null,
      ufBrazilianStates: [],
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

  watch: {
    ufSelected() {
      if (this.ufSelected) this.city.idEstado = this.ufSelected.value
      if (this.ufSelected === null) {
        this.getInfos()
      }
    }
  },


  mounted() {
    if(this.selectedCity) {
      this.city = this.selectedCity
      this.ufSelected = {value: this.city.idEstado, text: `${this.city.uf} - ${this.city.nomeEstado}`}
    } else {
      this.getInfos()
    }
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    async getInfos() {
			let response, stateList
			try {
				response = await RestConnection.get('estados/consultar/estado')
				stateList = response.data.conteudo			 
				for (let i = 0; i < stateList.length; i++) {
					this.ufBrazilianStates.push({value: stateList[i].id, text: `${stateList[i].uf} - ${stateList[i].nome}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
			}
		},

    async saveRecord() {
      let response
      let parameters = {
        name: this.city.nomeCidade,
        state: this.ufSelected.value,
      }
      try {
        response = await RestConnection.post('cidades/cadastrar/cidade/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar esta Cidade.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.city.id,
        name: this.city.nomeCidade,
        state: this.ufSelected.value,
      }
      try {
        response = await RestConnection.put('cidades/atualizar/cidade/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Atualizar esta Cidade.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('cidades/deletar/cidade/' + this.city.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Cidade.')
            }
        }
        this.listOfCountries = response.data.conteudo   
      alert(response.data.mensagem)
      this.backOnePage()    
    },

    clearReactiveData(){
      this.state.id = 0,
      this.state.nameState = ''
      this.state.uf = ''
      this.state.idCountry = ''
      this.state.nameCountry = ''
      this.ufSelected = null
      this.countrySelected = null
      this.actionMode = ''
      this.isFieldActive = false
    },
  }
}

</script>
