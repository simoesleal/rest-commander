<template>
	<div class="register-cstCsosn">
    <template  v-if="this.$route.path === '/cadastro-estrutural/cst-csosn-registro'">
      <page-title icon="fab fa-creative-commons-nc" main="Cadastrar CST/CSOSN"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="cst-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="cstCsosn.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>CST/CSOSN*</label>
              <b-form-input id="cst-cst" class="mb-3" v-model="cstCsosn.cst" required type="text" placeholder="Exemplo: 000"></b-form-input>
              <label>Origem*</label>
              <b-form-input id="cst-cst" class="mb-3" v-model="cstCsosn.origem" required type="text" placeholder="Exemplo: Nacional"></b-form-input>
              <label>Descrição*</label>
							<b-form-input id="cst-description" class="mb-3" v-model="cstCsosn.description" required type="text" placeholder="Exemplo: Tributada integralmente"></b-form-input>
          </b-form-group>
        </b-form>
				<b-form class="form-panel mb-3">
					<b-form-group
            id="informacoes-composicao-cst"
						description="*Campos obrigatórios">
						<b-form-row>
							<b-col cols="12" class="mb-3">
								<b-form-group label="Movimento Fiscal*" class="form-panel">
									<b-form-radio-group>
										<b-form-radio v-model="cstCsosn.typeTaxMoviment" name="cstCsosn-typeTaxMoviment" value="entriesAndExit">Entrada e Saída</b-form-radio>
										<b-form-radio v-model="cstCsosn.typeTaxMoviment" name="cstCsosn-typeTaxMoviment" value="entriesOnly">Somente Entrada</b-form-radio>
										<b-form-radio v-model="cstCsosn.typeTaxMoviment" name="cstCsosn-typeTaxMoviment" value="exitOnly">Somente Saída</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" class="mb-3">
								<b-form-group label="Tipo*" class="form-panel">
									<b-form-radio-group>
										<b-form-radio v-model="cstCsosn.typeCstCsosn" name="cstCsosn-typeCstCsosn" value="tc">Tributa/Credita</b-form-radio>
										<b-form-radio v-model="cstCsosn.typeCstCsosn" name="cstCsosn-typeCstCsosn" value="bc">Base de Calculo</b-form-radio>
										<b-form-radio v-model="cstCsosn.typeCstCsosn" name="cstCsosn-typeCstCsosn" value="nr">Natureza da Receita</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
						</b-form-row>
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
  name: 'CrudCstCsosn',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedCstCsosn: Object,
  },
	data() {
		return {
			cstCsosn: {
				id: '',
				origin: '',
				cst: '',
				description: '',
				typeTaxMoviment: '',
				typeCstCsosn: '',
			}
		}
	},
	computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCstCsosn) {
      this.cstCsosn = this.selectedCstCsosn  
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
      this.cstCsosn.id = 0
    },
  }
}
</script>
