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
              <label>Código*</label>
              <b-form-input id="state-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="state.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>Nome*</label>
              <b-form-input id="state-name" class="mb-3" v-model="state.nameState" required type="text" placeholder="Exemplo: Paraná"></b-form-input>
              <label>UF*</label>
              <b-form-select class="mb-3" v-model="ufSelected" :options="ufBrazilianStates"></b-form-select>
              <label>Pais*</label>              
              <b-input-group>
                <b-form-select v-model="countrySelected" :options="countryList"></b-form-select>
                <b-input-group-append>
                  <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'save' }}">
                    <b-button variant="primary"><i class="fas fa-flag fa-lg"></i></b-button>
                  </router-link>
                </b-input-group-append>
              </b-input-group>
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
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudEstado',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedState: Object,
  },
  data() {
    return {
      state: {
        id: 0,
        nameState: '',
        uf: '',
        idCountry: '',
        nameCountry: ''
      },
      ufSelected: null,
      countrySelected: null,
      ufBrazilianStates: [
        { value: null, text: 'Selecione a UF' },
        { value: 'AC', text: 'AC' },
        { value: 'AL', text: 'AL' },
        { value: 'AP', text: 'AP' },
        { value: 'AM', text: 'AM' },
        { value: 'BA', text: 'BA' },
        { value: 'CE', text: 'CE' },
        { value: 'DF', text: 'DF' },
        { value: 'ES', text: 'ES' },
        { value: 'GO', text: 'GO' },
        { value: 'MA', text: 'MA' },
        { value: 'MT', text: 'MT' },
        { value: 'MS', text: 'MS' },
        { value: 'MG', text: 'MG' },
        { value: 'PA', text: 'PA' },
        { value: 'PB', text: 'PB' },
        { value: 'PR', text: 'PR' },
        { value: 'PE', text: 'PE' },
        { value: 'PI', text: 'PI' },
        { value: 'RJ', text: 'RJ' },
        { value: 'RN', text: 'RN' },
        { value: 'RS', text: 'RS' },
        { value: 'RO', text: 'RO' },
        { value: 'RR', text: 'RR' },
        { value: 'SC', text: 'SC' },
        { value: 'SP', text: 'SP' },
        { value: 'SE', text: 'SE' },
        { value: 'TO', text: 'TO' },
        { value: 'XX', text: 'XX' },
      ],
      countryList: [
        { value: null, text: 'Selecione o País' }, 
        { value: 'Brasil', text: 'Brasil' },
        { value: 'Argentina', text: 'Argentina' },
        { value: 'Paraguai', text: 'Paraguai' },
        { value: 'Chile', text: 'Chile' }
      ]
    }
  },

  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

  mounted() {
    if(this.selectedState) {
      this.state = this.selectedState
      this.ufSelected = this.state.uf
      this.countrySelected = this.state.nameCountry
    }
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    saveRecord() {
      console.log('saveRecord')
    },

    alterRecord() {
      console.log('alterRecord')
    },

    deleteRecord() {
      console.log('deleteRecord')      
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