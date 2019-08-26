<template>
	<div class="register-customer">
		<page-title icon="fas fa-user-astronaut" main="Cadastrar Cliente"></page-title>
		<b-form class="form-panel mb-3">
			<b-form-group
				id="informacoes-basicas"
				description="*Campos obrigatórios">
					<label>Código*</label>
					<b-form-input id="customer-id" class="mb-3" :disabled="setInputFieldDisabled" v-model="customer.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
					<label>Nome*</label>
					<b-form-input id="customer-name" class="mb-3" v-model="customer.name" required type="text" placeholder="Exemplo: Geni Machado"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="8">
							<label>CPF*</label>
							<b-form-input id="customer-docs" class="mb-3" v-model="customer.docs" required type="text" placeholder="Exemplo: 111.111.111-11"></b-form-input>
						</b-col>
							<b-col cols="12" sm="4">
							<label>Sexo*</label>
							<b-form-select v-model="customer.sex" :options="typeSex"></b-form-select>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Documento</label>
							<b-form-input id="customer-doc" class="mb-3" v-model="customer.doc" type="text" placeholder="Exemplo: 11.111.111-1"></b-form-input>
						</b-col>
						<b-col cols="12" sm="3">
							<label>Tipo do Documento</label>
							<b-form-input id="customer-docType" class="mb-3" v-model="customer.docType" type="text" placeholder="Exemplo: RG"></b-form-input>
						</b-col>
						<b-col cols="12" sm="3">
							<label>Org. Exp.</label>
							<b-form-input id="customer-orgExp" class="mb-3" v-model="customer.orgExp" type="text" placeholder="Exemplo: SSP-PR"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<label>Observações</label>
						<b-form-textarea id="customer-obs" v-model="customer.observation" placeholder="Exemplo: Não gosta de cebola." rows="3" max-rows="6"></b-form-textarea>
					</b-form-row>
			</b-form-group>
		</b-form>	
		<b-form class="form-panel mb-3">			
			<b-form-group
				id="informacoes-contato"
				description="*Campos obrigatórios">
				<b-form-row>
					<b-col cols="12" sm="6">
						<label>Telefone</label>
						<b-form-input id="customer-phone" class="mb-3" v-model="customer.contact.phone" required type="number" placeholder="Exemplo: +55 (45) 3025-1144"></b-form-input>
					</b-col>
					<b-col cols="12" sm="6">
						<label>Celular</label>
						<b-form-input id="customer-cellphone" class="mb-3" v-model="customer.contact.cellphone" required type="number" placeholder="Exemplo: +55 (45) 98404-5443"></b-form-input>
					</b-col>
				</b-form-row>										
				<b-form-row>
					<label>E-mail</label>
					<b-form-input id="customer-email" class="mb-3" v-model="customer.contact.email" type="email" placeholder="Exemplo: simoeslealneto@gmail.com"></b-form-input>
				</b-form-row>						
			</b-form-group>
    </b-form>	
		<b-form class="form-panel">		
			<b-form-group
				id="informacoes-endereco"
				description="*Campos obrigatórios">
					<label>Endereço</label>
					<b-form-input id="customer-street" class="mb-3" v-model="customer.logradouro.street" type="text" placeholder="Exemplo: Rua dos Bobos"></b-form-input>
					<b-form-row>
						<b-col>
							<label>Número</label>
							<b-form-input id="customer-number" class="mb-3" v-model="customer.logradouro.number" type="text" placeholder="Exemplo: 0000"></b-form-input>
						</b-col>
						<b-col>
							<label>Bairro</label>
							<b-form-input id="customer-district" class="mb-3" v-model="customer.logradouro.district" type="text" placeholder="Exemplo: Jardim Esmero"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col>
							<label>CEP</label>
							<b-form-input id="customer-cep" class="mb-3" v-model="customer.logradouro.cep" type="text" placeholder="Exemplo: 00000-000"></b-form-input>
						</b-col>
						<b-col>
							<label>Complemento</label>
							<b-form-input id="customer-complement" class="mb-3" v-model="customer.logradouro.complement" type="text" placeholder="Exemplo: Casa"></b-form-input>
						</b-col>
					</b-form-row>
					<label>País</label>
					<b-input-group>
						<b-form-select v-model="countrySelected" :options="countryList"></b-form-select>
						<b-input-group-append>
							<router-link :to="{ name: 'CadastrarPais', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-flag"></i></b-button>
							</router-link>
						</b-input-group-append>
					</b-input-group>
					<label>Estado</label>
					<b-input-group>
						<b-form-select v-model="ufSelected" :options="ufBrazilianStates"></b-form-select>
						<b-input-group-append>
							<router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-university"></i></b-button>
							</router-link>
						</b-input-group-append>
					</b-input-group>
					<label>Cidade</label>
					<b-input-group>
						<b-form-input id="customer-city" class="mb-3" v-model="customer.logradouro.city" type="text" placeholder="Exemplo: Foz do Iguaçu"></b-form-input>
						<b-input-group-append>
							<router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-city"></i></b-button>
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
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
	name: 'CadastroDeCliente',
	components: {
		'page-title': PageTitle
	},
	props: {
    actionMode: String,
    selectedCustomer: Object,
  },
	data() {
		return {
			customer: {
				id: 0,
				name: '',
				cpf: '',
				birthDate: '',
				doc: '',
				docType: '',
				orgExp: '',
				sex: '',
				status: 'ativo',
				observation: '',
				contact: {
					phone: '',
					cellphone: '',
				},
				logradouro: {
					cep: '',
					street: '',
					number: '',
					district: '',
					complement: '',
					country: '',
					uf: '',
					city: '',
				}
			},
			ufSelected: '',
			countrySelected: '',
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
      ],
      typeSex: [
        { value: 'm', text: 'Masculino' },
        { value: 'f', text: 'Feminino' },
        { value: 'x', text: 'Outros' },
      ],
		}
	},
	computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

	mounted() {
    if(this.selectedCustomer) {
      this.customer = this.selectedCustomer
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
      this.customer.id = 0
    },
  }	
}
</script>

<style>

</style>