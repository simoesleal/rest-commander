<template>
	<div class="register-customer">
		<page-title icon="fas fa-user-astronaut" main="Cadastrar Cliente"></page-title>
		<b-form class="form-panel mb-3">
			<b-form-group
				id="informacoes-basicas"
				description="*Campos obrigatórios">
					<label>Nome*</label>
					<b-form-input id="customer-name" class="mb-3" v-model.trim="customer.nome" required type="text" placeholder="Exemplo: Geni Machado"></b-form-input>
					<label>Sobrenome*</label>
					<b-form-input id="customer-name" class="mb-3" v-model.trim="customer.sobrenome" required type="text" placeholder="Exemplo: Geni Machado"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Documento*</label>
							<b-form-input id="customer-docs" class="mb-3" v-model.trim="customer.docs" required type="text" placeholder="Exemplo: 111.111.111-11"></b-form-input>
						</b-col>
							<b-col cols="12" sm="2">
							<label>Sexo*</label>
							<b-form-select v-model="customer.sexo" :options="typeSex"></b-form-select>
						</b-col>
						<b-col cols="12" sm="2">
							<label>Tipo do Documento</label>
							<b-form-input id="customer-docType" class="mb-3" v-model.trim="customer.tipoDoc" type="text" placeholder="Exemplo: RG"></b-form-input>
						</b-col>
						<b-col cols="12" sm="2">
							<label>Org. Exp.</label>
							<b-form-input id="customer-orgExp" class="mb-3" v-model.trim="customer.orgExp" type="text" placeholder="Exemplo: SSP-PR"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<label>Observações</label>
						<b-form-textarea id="customer-obs" v-model="customer.preferencias" placeholder="Exemplo: Não gosta de cebola." rows="3" max-rows="6"></b-form-textarea>
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
						<the-mask id="customer-telefone" type="text" class="form-control mb-3" v-model.trim="customer.telefone" :mask="['+## (##) ####-####']" :masked="false" placeholder="Exemplo: +55 (45) 3025-1144" :required="true"/>
					</b-col>
					<b-col cols="12" sm="6">
						<label>Celular</label>
						<the-mask id="customer-celular" type="text" class="form-control mb-3" v-model.trim="customer.celular" :mask="['+## (##) #####-####']" :masked="false" placeholder="Exemplo: +55 (45) 98404-5443" :required="true"/>
					</b-col>
				</b-form-row>										
				<b-form-row>
					<label>E-mail</label>
					<b-form-input id="customer-email" class="mb-3" v-model="customer.email" type="email" placeholder="Exemplo: simoeslealneto@gmail.com"></b-form-input>
				</b-form-row>						
			</b-form-group>
    </b-form>	
		<b-form class="form-panel">		
			<b-form-group
				id="informacoes-endereco"
				description="*Campos obrigatórios">
					<label>Endereço</label>
					<b-form-input id="customer-street" class="mb-3" v-model="customer.rua" type="text" placeholder="Exemplo: Rua dos Bobos"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Número</label>
							<b-form-input id="customer-number" class="mb-3" v-model="customer.numero" type="text" placeholder="Exemplo: 0000"></b-form-input>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Bairro</label>
							<b-form-input id="customer-district" class="mb-3" v-model="customer.bairro" type="text" placeholder="Exemplo: Jardim Esmero"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>CEP</label>
							<the-mask id="customer-cep" type="text" class="form-control mb-3" v-model.trim="customer.cep" :mask="['#####-###']" :masked="false" placeholder="Exemplo: 00000-000" :required="true"/>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Complemento</label>
							<b-form-input id="customer-complement" class="mb-3" v-model="customer.complemento" type="text" placeholder="Exemplo: Casa"></b-form-input>
						</b-col>
					</b-form-row>
					<label>País</label>
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
					<label>Estado</label>
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
										<b-button variant="primary"><i class="fas fa-university"></i></b-button>
									</router-link>
								</template>
							</v-select>
						</b-col>  
						<b-col cols="1" class="btn-new-register">
							<router-link :to="{ name: 'ConsultarEstado', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-university fa-sm"></i></b-button>
							</router-link>
						</b-col>  
					</b-row>
					<label>Cidade</label>
					<b-row>
						<b-col cols="11">
							<v-select
								class="mb-3" 
								v-model="citySelected"
								:required="!citySelected" 
								label="text" 
								:options="citiesList">
								<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
									<router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'save' }}">
										<b-button variant="primary"><i class="fas fa-city"></i></b-button>
									</router-link>
								</template>
							</v-select>
						</b-col>  
						<b-col cols="1" class="btn-new-register">
							<router-link :to="{ name: 'ConsultarCidade', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-city fa-sm"></i></b-button>
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
	</div>
</template>

<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'
import {TheMask} from 'vue-the-mask'

export default {
	name: 'CadastroDeCliente',
	components: {
		'page-title': PageTitle,
		TheMask
	},
	props: {
    actionMode: {
			type: String,
			default: 'save',
		},
    selectedCustomer: Object,
  },
	data() {
		return {
			customer: {
				id: 0,
				idEndereco: 0,
				nome: '',
				sobrenome: '',
				cpf: '',
				dataNascimento: '',
				docs: '',
				orgExp: '',
				sexo: '',
				status: true,
				preferencias: '',
				email: '',
				telefone: '',
				celular: '',
				cep: '',
				rua: '',
				numero: '',
				bairro: '',
				complemento: '',
				nomeFuncao: '',
				pais: '',
				estado: '',
				cidade: '',
				tipoDoc: '',
			},
			ufSelected: '',
			countrySelected: '',
			citySelected: '',
			ufBrazilianStates: [],
      countryList: [],
			citiesList: [],
			countryId: 0,
			stateId: 0,
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

	async mounted() {
    if(this.selectedCustomer) {
      await this.getCustomerById(this.selectedCustomer.id)
    } else {
			this.getCountries()
		}
  },

	watch: {
		countrySelected() {
			if (this.actionMode === 'save') {
				if (this.countrySelected && this.countrySelected.value) {
					this.countryId = this.countrySelected.value
					this.ufSelected = '',
					this.ufBrazilianStates = [],
					this.citySelected = '',
					this.citiesList = [],
					this.getStates(this.countryId)
				} else if (this.countrySelected === null) {
					this.ufSelected = null,
					this.ufBrazilianStates = [],
					this.citySelected = null,
					this.citiesList = [],
					this.getCountries()
				}
			} else {
				if (this.countrySelected === null) {
					this.ufSelected = null,
					this.ufBrazilianStates = [],
					this.citySelected = null,
					this.citiesList = [],
					this.getCountries()
				} else {
					if (!this.ufSelected) {
						this.countryId = this.countrySelected.value
						this.getStates(this.countryId)
					} else if (this.ufSelected && this.countryId !== this.countrySelected.value) {
						this.ufSelected = null,
						this.ufBrazilianStates = [],
						this.citySelected = null,
						this.citiesList = []
					}
				}
			}
		},
		ufSelected() {
			if (this.actionMode === 'save') {
				if (this.ufSelected && this.ufSelected.value) {
					this.stateId = this.ufSelected.value
					this.citySelected = '',
					this.citiesList = [],
					this.getCities(this.stateId)
				} else if (this.ufSelected === null) {
					this.citySelected = null,
					this.citiesList = []
				}
			} else {
				if (this.ufSelected === null) {
					this.citySelected = null,
					this.citiesList = []
				} else {
					if (!this.citySelected) {
						this.stateId = this.ufSelected.value
						this.getCities(this.stateId)
					}	else if (this.citySelected && this.stateId !== this.ufSelected.value) {
						this.citySelected = null,
						this.citiesList = []
					}		 		
				}
			}
		}
	},

	methods: {
    backOnePage() {
      this.$router.back()
    },

		async getCustomerById(id) {
			let response
			try {
				response = await RestConnection.get('clientes/consultar/cliente/'+id)
				const payload = response.data.conteudo
				await this.populateFields(payload)
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getCustomerById")
        this.backOnePage()
			}
		},

		async populateFields(payload){
			this.customer = payload.customer.info
			
			this.countrySelected = ({value: payload.customer.country.id, text: `${payload.customer.country.sigla} - ${payload.customer.country.nomePt}`})
			this.countryId = this.countrySelected.value
			
			this.ufSelected = ({value: payload.customer.state.id, text: `${payload.customer.state.uf} - ${payload.customer.state.nome}`})
			this.stateId = this.ufSelected.value
			
			this.citySelected = ({value: payload.customer.city.id, text: `${payload.customer.city.nomeCidade}`})

			return
		},

		async getCountries() {
			let response, countryList
			try {
				response = await RestConnection.get('paises/consultar/pais')
				countryList = response.data.conteudo			 
				for (let i = 0; i < countryList.length; i++) {
					this.countryList.push({value: countryList[i].id, text: `${countryList[i].sigla} - ${countryList[i].nomePt}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getCountries")
        this.backOnePage()
			}
		},

		async getStates(id) {
			let response, ufBrazilianStates
			try {
				response = await RestConnection.get('estados/consultar/estado/pais/'+id)
				ufBrazilianStates = response.data.conteudo		 
				for (let i = 0; i < ufBrazilianStates.length; i++) {
					this.ufBrazilianStates.push({value: ufBrazilianStates[i].id, text: `${ufBrazilianStates[i].uf} - ${ufBrazilianStates[i].nome}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
			}
		},

		async getCities(id) {
			let response, list
			try {
				response = await RestConnection.get('cidades/consultar/cidade/estado/'+id)
				list = response.data.conteudo		 
				for (let i = 0; i < list.length; i++) {
					this.citiesList.push({value: list[i].id, text: `${list[i].nomeCidade}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
			}
		},

    async saveRecord() {
     	let response, idAdress
			idAdress = await this.saveNewAdress();
			//Criar validação se o idAdress existe e se o status foi 200
      let parameters = {
				name: this.customer.nome,
				lastName: this.customer.sobrenome,
				sex: this.customer.sexo,
				status: this.customer.status,
				docs: this.customer.docs,
				docType: this.customer.tipoDoc,
				orgExp: this.customer.orgExp,
				email: this.customer.email,
				phone: this.customer.telefone,
				cellphone: this.customer.celular,
				preferences: this.customer.preferencias,			
				id_endereco: idAdress,
      }
      try {
        response = await RestConnection.post('clientes/cadastrar/cliente/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar este Cliente.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

		async saveNewAdress() {
			let response
			let parameters = {
					zipcode: this.customer.cep,
					street: this.customer.rua,
					number:  this.customer.numero,
					block:  this.customer.bairro,
					complement:  this.customer.complemento,
					country: this.countrySelected.value,
					state: this.ufSelected.value,
					city: this.citySelected.value
			 }
			 try {
        response = await RestConnection.post('enderecos/cadastrar/endereco/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível salvar o endereço do Cliente.')
          }
      }
			return response.data.conteudo[0].id
		},

    async alterRecord() {
     	let response
      let parameters = {
				id: this.customer.id,
				name: this.customer.nome,
				lastName: this.customer.sobrenome,
				sex: this.customer.sexo,
				status: this.customer.status,
				docs: this.customer.docs,
				docType: this.customer.tipoDoc,
				orgExp: this.customer.orgExp,
				email: this.customer.email,
				phone: this.customer.telefone,
				cellphone: this.customer.celular,
				preferences: this.customer.preferencias,
				id_endereco: this.customer.idEndereco,			
      }
      try {
        response = await RestConnection.put('clientes/atualizar/cliente/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este Cliente.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('clientes/deletar/cliente/' + this.customer.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este Cliente.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()     
		},
	}
}
</script>

<style>

</style>