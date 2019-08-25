<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/pais'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-flag" main="Cadastrar País"></page-title>       
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="country-id" class="mb-2" :disabled="setInputFieldDisabled" v-model="country.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>Nome*</label>
              <b-form-input id="country-name" class="mb-3" v-model="country.nomePais" required type="text" placeholder="Exemplo: Brasil"></b-form-input>
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
  name: 'CrudPais',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedCountry: Object,
  },
  data() {
    return {
      country: {
        id: 0,
        nomePais: ''
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCountry) this.country = this.selectedCountry    
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
      this.country.id = 0,
      this.country.nome = ''
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
