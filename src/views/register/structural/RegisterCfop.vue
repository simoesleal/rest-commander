<template>
  <div class="register-cfop">
    <template  v-if="this.$route.path === '/cadastro-estrutural/cfop'">
      <page-title icon="fab fa-creative-commons-nc" main="Cadastrar CFOP"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="cfop-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="cfop.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>CFOP*</label>
              <b-form-input id="cfop-cfop" class="mb-3" v-model="cfop.cfop" required type="text" placeholder="Exemplo: 1.100"></b-form-input>
              <label>Descrição*</label>
							<b-form-input id="cfop-description" class="mb-3" v-model="cfop.description" required type="text" placeholder="Exemplo: COMPRAS PARA INDUSTRIALIZAÇÃO, COMERCIALIZAÇÃO OU PRESTAÇÃO DE SERVIÇOS"></b-form-input>
          </b-form-group>
        </b-form>

				<b-form class="form-panel mb-3">
					<b-form-group
            id="informacoes-composicao-cfop"
						description="*Campos obrigatórios">
						<b-form-row>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="Tipo*" class="form-panel">
									<b-form-radio-group>
										<b-form-radio v-model="cfop.typeCfop" name="cfop-typeCfop" value="cfop">CFOP</b-form-radio>
										<b-form-radio v-model="cfop.typeCfop" name="cfop-typeCfop" value="cfps">CFPS</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="Movimento Fiscal*" class="form-panel">
									<b-form-radio-group>
										<b-form-radio v-model="cfop.typeTaxMoviment" name="cfop-typeTaxMoviment" value="entriesOnly">Somente Entrada</b-form-radio>
										<b-form-radio v-model="cfop.typeTaxMoviment" name="cfop-typeTaxMoviment" value="exitOnly">Somente Saída</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="Destino Operação*" class="form-panel">
									<b-form-radio-group stacked>
										<b-form-radio v-model="cfop.destinationOperation" name="cfop-destinationOperation" value="insideState">Dentro do Estado</b-form-radio>
										<b-form-radio v-model="cfop.destinationOperation" name="cfop-destinationOperation" value="outsideState">Fora do Estado</b-form-radio>
										<b-form-radio v-model="cfop.destinationOperation" name="cfop-destinationOperation" value="outsideCountry">Fora do País</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="ICMS*" class="form-panel">
									<b-form-radio-group stacked> 
										<b-form-radio v-model="cfop.tax.icms" name="cfop-tax-icms" value="tc">Tributa/Credita</b-form-radio>
										<b-form-radio v-model="cfop.tax.icms" name="cfop-tax.icms" value="in">Isenta/Não Tributada</b-form-radio>
										<b-form-radio v-model="cfop.tax.icms" name="cfop-tax.icms" value="o">Outras</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="Substituição Tributária*" class="form-panel">
									<b-form-radio-group stacked> 
										<b-form-radio v-model="cfop.tax.subsTributaria" name="cfop-tax-subsTributaria" value="int">Isenta/Não Tributada</b-form-radio>
										<b-form-radio v-model="cfop.tax.subsTributaria" name="cfop-tax.subsTributaria" value="nsa">Não se aplica</b-form-radio>
										<b-form-radio v-model="cfop.tax.subsTributaria" name="cfop-tax.subsTributaria" value="o">Outras</b-form-radio>
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" sm="6" class="mb-3">
								<b-form-group label="ISS*" class="form-panel">
									<b-form-radio-group stacked> 
										<b-form-radio v-model="cfop.tax.iss" name="cfop-tax-iss" value="iicms">Isenta ICMS</b-form-radio>
										<b-form-radio v-model="cfop.tax.iss" name="cfop-tax.iss" value="oicms">Outras ICMS</b-form-radio>
										<b-form-radio v-model="cfop.tax.iss" name="cfop-tax.iss" value="o">Outras</b-form-radio>										
									</b-form-radio-group>
								</b-form-group>
							</b-col>
							<b-col cols="12" class="mb-3">
								<b-form-group label="IPI*" class="form-panel">
									<b-form-radio-group> 
										<b-form-radio v-model="cfop.tax.ipi" name="cfop-tax-ipi" value="tc">Tributa/Credita</b-form-radio>
										<b-form-radio v-model="cfop.tax.ipi" name="cfop-tax.ipi" value="in">Isenta/Não Tributada</b-form-radio>
										<b-form-radio v-model="cfop.tax.ipi" name="cfop-tax.ipi" value="o">Outras</b-form-radio>										
										<b-form-radio v-model="cfop.tax.ipi" name="cfop-tax.ipi" value="na">Não se Aplica</b-form-radio>										
									</b-form-radio-group>
								</b-form-group>
							</b-col>        
							<b-col cols="12" class="mb-3">
								<b-form-group label="CST*" class="form-panel">
									<b-input-group class="mb-3">
										<b-form-select v-model="cfop.tax.cst" :options="cstList"></b-form-select>
										<b-input-group-append>
											<router-link :to="{ name: 'CadastrarCST', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fab fa-creative-commons-nc"></i></b-button>
											</router-link>
										</b-input-group-append>
									</b-input-group>
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
  name: 'CrudCFOP',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: String,
    selectedCfop: Object,
  },
  data() {
    return {
      cfop: {
        id: '',
        cfop: '',
        description: '',
        typeCfop: '',
				typeTaxMoviment: '',
				destinationOperation: '',
				tax: {
					icms: '',
					subsTributaria: '',
					ipi: '',
					iss: '',
					cst: '',
				},        
      },
			cstList: [
        { value: null, text: 'Selecione o CST' }, 
        { value: '50', text: '000 - Tributada integralmente' }]
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCfop) {
      this.cfop = this.selectedCfop  
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
      this.cfop.id = 0
    },
  }
}
</script>

<style scoped>
	.formel {
		background: #333;
    margin: 0px 10px;
    padding: 20px;
    border: 10px solid #AAA;
    border-radius: 5px;
  }
</style>