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
              <label>Código*</label>
              <b-form-input id="city-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="city.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>Nome*</label>
              <b-form-input id="city-name" class="mb-3" v-model="city.nameCity" required type="text" placeholder="Exemplo: Paraná"></b-form-input>
              <label>UF*</label>
              <b-row>
                <b-col cols="11">
                  <b-form-select class="mb-3" v-model="ufSelected" :options="ufBrazilianStates"></b-form-select>
                </b-col>
                <b-col cols="1">
                  <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
                    <b-button variant="primary"><i class="fas fa-university fa-lg"></i></b-button>
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
        nameCity: '',
        ufID: 0,
        uf: ''
      },
      ufSelected: null,
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
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

  mounted() {
    if(this.selectedCity) {
      this.city = this.selectedCity
      this.ufSelected = this.city.uf
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

<style scoped>
  .form-panel {
    flex: 1;
    background: #FFF;
    margin: 0px 10px;
    padding: 20px;
    border: 1px solid #AAA;
    border-radius: 5px;
  }
</style>
