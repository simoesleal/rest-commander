<template>
	<div class="register-provider">
		<page-title icon="fas fa-truck" main="Cadastrar Fornecedores"></page-title> 
		<b-form class="form-panel mb-3">
			<b-form-group
				id="informacoes-basicas"
				description="*Campos obrigatórios">
					<b-form-row>
						<b-col cols="12" sm="8">
							<label>CPF/CNPJ</label>
							<the-mask id="provider-cpfCnpj" type="text" class="form-control mb-3" v-model.trim="provider.cpfCnpj" :mask="['###.###.###-##', '##.###.###/####-##']" :masked="false" placeholder="Exemplo: 11.111.111/1111-11" :required="true"/>
						</b-col>
							<b-col cols="12" sm="4">
							<label>Tipo de Fornecedor</label>
							<b-form-select v-model="provider.typeProvider" :options="typeProvider"></b-form-select>
						</b-col>
					</b-form-row>
					<b-form-row>
						<label>Nome Fantasia</label>
						<b-form-input id="provider-nomefantasia" class="mb-3" v-model="provider.nomeFantasia" required type="text" placeholder="Exemplo: Empresa Fantasia"></b-form-input>
						<label>Razão Social</label>
						<b-form-input id="provider-razaoSocial" class="mb-3" v-model="provider.razaoSocial" required type="text" placeholder="Exemplo: Empresa Séria SA LTDE"></b-form-input>
					</b-form-row>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Inscrição Estadual</label>
							<b-form-input id="provider-inscestadual" class="mb-3" v-model="provider.inscEstadual" required type="text" placeholder="Exemplo: 111.11111-11"></b-form-input>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Inscrição Municipal</label>
							<b-form-input id="provider-inscMunicipal" class="mb-3" v-model="provider.inscMunicipal" required type="text" placeholder="Exemplo: 111.11111-11"></b-form-input>
						</b-col>
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
						<the-mask id="provider-phone" type="text" class="form-control mb-3" v-model.trim="provider.telefone" :mask="['+## (##) ####-####']" :masked="false" placeholder="Exemplo: +55 (45) 3025-1144" :required="true"/>
					</b-col>
					<b-col cols="12" sm="6">
						<label>Celular</label>
						<the-mask id="provider-cellphone" type="text" class="form-control mb-3" v-model.trim="provider.celular" :mask="['+## (##) #####-####']" :masked="false" placeholder="Exemplo: +55 (45) 98404-5443" :required="true"/>
					</b-col>
				</b-form-row>										
				<b-form-row>
					<label>E-mail</label>
					<b-form-input id="provider-email" class="mb-3" v-model="provider.email" type="email" placeholder="Exemplo: simoeslealneto@gmail.com"></b-form-input>
				</b-form-row>				
				<b-form-row>
					<label>Site</label>
					<b-form-input id="provider-site" class="mb-3" v-model="provider.homePage" type="text" placeholder="Exemplo: www.restcontroller.tech"></b-form-input>
				</b-form-row>				
			</b-form-group>
    </b-form>

		<b-form class="form-panel">		
			<b-form-group
				id="informacoes-endereco"
				description="*Campos obrigatórios">
					<label>Endereço</label>
					<b-form-input id="provider-street" class="mb-3" v-model="provider.rua" type="text" placeholder="Exemplo: Rua dos Bobos"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Número</label>
							<b-form-input id="provider-number" class="mb-3" v-model="provider.numero" type="text" placeholder="Exemplo: 0000"></b-form-input>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Bairro</label>
							<b-form-input id="provider-district" class="mb-3" v-model="provider.bairro" type="text" placeholder="Exemplo: Jardim Esmero"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>CEP</label>
							<the-mask id="provider-cep" type="text" class="form-control mb-3" v-model.trim="provider.cep" :mask="['#####-###']" :masked="false" placeholder="Exemplo: 00000-000" :required="true"/>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Complemento</label>
							<b-form-input id="provider-complement" class="mb-3" v-model="provider.complemento" type="text" placeholder="Exemplo: Casa"></b-form-input>
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
	name: 'CadastroDeFornecedor',
	components: {
		'page-title': PageTitle,
		TheMask
	},
	props: {
    actionMode: {
			type: String,
			default: 'save',
		},
    selectedProvider: Object,
  },
	data() {
		return {
			provider: {
				id: 0,
				idEndereco: 0,
				status: false,
				typeProvider: '',
				cpfCnpj: '',
				nomeFantasia: '',
				razaoSocial: '',
				inscEstadual: '',
				inscMunicipal: '',
				cep: '',
				rua: '',
				numero: '',
				bairro: '',
				complemento: '',
				nomeFuncao: '',
				pais: '',
				estado: '',
				cidade: '',
				email: '',
				telefone: '',
				celular: '',
				homePage: '',
			},
			ufSelected: '',
			countrySelected: '',
			citySelected: '',
			ufBrazilianStates: [],
      countryList: [],
			citiesList: [],
			countryId: 0,
			stateId: 0,
      typeProvider: [
        { value: 'juridica', text: 'Pessoa Jurídica' },
        { value: 'fisica', text: 'Pessoa Fisíca' },
      ],
		}
	},

	computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

	async mounted() {
    if(this.selectedProvider) {
      await this.getProviderById(this.selectedProvider.id)
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

		async getProviderById(id) {
			let response
			try {
				response = await RestConnection.get('fornecedores/consultar/fornecedor/'+id)
				const payload = response.data.conteudo
				await this.populateFields(payload)
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getProviderById")
        this.backOnePage()
			}
		},

		async populateFields(payload){
			this.provider = payload.supplier.info			
			this.countrySelected = ({value: payload.supplier.country.id, text: `${payload.supplier.country.sigla} - ${payload.supplier.country.nomePt}`})
			this.countryId = this.countrySelected.value			
			this.ufSelected = ({value: payload.supplier.state.id, text: `${payload.supplier.state.uf} - ${payload.supplier.state.nome}`})
			this.stateId = this.ufSelected.value			
			this.citySelected = ({value: payload.supplier.city.id, text: `${payload.supplier.city.nomeCidade}`})
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
				nome_fantasia: this.provider.nomeFantasia,
				razao_social: this.provider.razaoSocial,
				cpf_cnpj: this.provider.cpfCnpj,
				insc_municipal: this.provider.inscMunicipal,
				insc_estadual: this.provider.inscEstadual,
				status: this.provider.status,
				email: this.provider.email,
				phone: this.provider.telefone,
				cellphone: this.provider.celular,
				id_endereco: idAdress,	
      }
      try {
        response = await RestConnection.post('fornecedores/cadastrar/fornecedor/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar este Fornecedor.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

		async saveNewAdress() {
			let response
			let parameters = {
					zipcode: this.provider.cep,
					street: this.provider.rua,
					number:  this.provider.numero,
					block:  this.provider.bairro,
					complement:  this.provider.complemento,
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
            return alert('Não foi possível salvar o endereço do Fornecedor.')
          }
      }
			return response.data.conteudo[0].id
		},

    async alterRecord() {
     	let response, idAdress
      let parameters = {
				id: this.provider.id,
				nome_fantasia: this.provider.nomeFantasia,
				razao_social: this.provider.razaoSocial,
				cpf_cnpj: this.provider.cpfCnpj,
				insc_municipal: this.provider.inscMunicipal,
				insc_estadual: this.provider.inscEstadual,
				status: this.provider.status,
				email: this.provider.email,
				phone: this.provider.telefone,
				cellphone: this.provider.celular,
				id_endereco:  this.provider.idEndereco,				
      }
      try {
        response = await RestConnection.put('fornecedores/atualizar/fornecedor/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este Fornecedor.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('fornecedores/deletar/fornecedor/' + this.provider.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este Fornecedor.')
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