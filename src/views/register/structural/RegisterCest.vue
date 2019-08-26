<template>
  <div class="register-cest">
    <template  v-if="this.$route.path === '/cadastro-estrutural/cest'">
      <page-title icon="fab fa-creative-commons-nc" main="Cadastrar CEST"></page-title>  
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="cest-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="cest.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>CEST*</label>
              <b-form-input id="cest" class="mb-3" v-model="cest.cest" required type="text" placeholder="Exemplo: 03.021.00"></b-form-input>
              <label>NCM*</label>
              <b-input-group class="mb-3">
                <b-form-select v-model="cest.ncm" :options="ncmList"></b-form-select>
                <b-input-group-append>
                  <router-link :to="{ name: 'CadastrarNcm', params: { actionMode:'save' }}">
                    <b-button variant="primary"><i class="fab fa-creative-commons-nc"></i></b-button>
                  </router-link>
                </b-input-group-append>
              </b-input-group>
              <label>Segmento*</label>
              <b-form-input id="cest" class="mb-3" v-model="cest.segment" required type="text" placeholder="Exemplo: Cervejas, chopes, refrigerantes, águas e outras bebidas"></b-form-input>
              <label>Descrição*</label>
              <b-form-textarea id="cest-obs" v-model="cest.description" placeholder="Exemplo: Cerveja" rows="3" max-rows="6"></b-form-textarea>
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
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudCEST',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedCest: Object,
  },
  data() {
    return {
      cest: {
        id: '',
        cest: '',
        ncm: '',
        segment: '',
        description: '',
      },
      ncmList: [
        { value: null, text: 'Selecione o NCM' }, 
        { value: '2201.10.00', text: '2201.10.00' },
        { value: '2203.00.00', text: '2203.00.00' },        
      ]
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCest) {
      this.cest = this.selectedCest    
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
      this.cest.id = 0
    },
  }
}

</script>
