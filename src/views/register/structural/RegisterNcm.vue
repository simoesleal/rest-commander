<template>
	<div class="register-ncm">
    <template  v-if="this.$route.path === '/cadastro-estrutural/ncm'">
      <page-title icon="fab fa-creative-commons-nc" main="Cadastrar NCM"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="cst-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="ncm.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>NCM*</label>
              <b-form-input id="cst-cst" class="mb-3" v-model="ncm.ncm" required type="text" placeholder="Exemplo: 2201.10.00"></b-form-input>
              <label>Observações</label>
							<b-form-textarea id="customer-obs" v-model="ncm.description" placeholder="Exemplo: Bebidas, líquidos alcoólicos e vinagres." rows="3" max-rows="6"></b-form-textarea>
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
  name: 'CrudNCM',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedNcm: Object,
  },
  data() {
    return {
      ncm: {
        id: 0,
        ncm: '',
				description: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedNcm) {
      this.ncm = this.selectedNcm    
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
      this.ncm.id = 0,
      this.ncm.ncm = ''
      this.ncm.description = ''
    },
  }
}
</script>

<style>

</style>