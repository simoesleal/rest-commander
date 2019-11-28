<template>
	<div class="register-employee">
		<page-title icon="fas fa-user-tie" main="Cadastrar Funcionário"></page-title>
		<b-form class="form-panel mb-3">			
			<b-form-group
				id="informacoes-basicas"
				description="*Campos obrigatórios">
					<label>Nome*</label>
					<b-form-input id="employee-name" class="mb-3" v-model="employee.nome" required type="text" placeholder="Exemplo: Antonio"></b-form-input>
					<label>Sobrenome*</label>
					<b-form-input id="employee-lastname" class="mb-3" v-model="employee.sobrenome" required type="text" placeholder="Exemplo: Simões Leal Neto"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Login*</label>
							<b-form-input id="employee-login" class="mb-3" v-model="employee.login" :disabled="setInputFieldDisabled" required type="text" placeholder="Exemplo: simoesleal"></b-form-input>
						</b-col>
						<b-col cols="12" sm="6">	
							<label>Senha*</label>
							<b-form-input id="employee-password" class="mb-3" v-model="employee.password" required type="password"></b-form-input>						
						</b-col>
					</b-form-row>
			</b-form-group>
    </b-form>

		<b-form class="form-panel mb-3">			
			<b-form-group
				id="informacoes-pessoais"
				description="*Campos obrigatórios">
				<b-form-row>
					<b-col cols="12" sm="6">
						<label>CPF*</label>
						<the-mask id="employee-cpf" type="text" class="form-control mb-3" v-model.trim="employee.cpf" :mask="['###.###.###-##']" :masked="false" placeholder="Exemplo: 111.111.111-11" :required="true"/>
					</b-col>
					<b-col cols="12" sm="6">
						<label>RG</label>
						<b-form-input id="employee-rg" class="mb-3" v-model="employee.rg" required type="number" placeholder="Exemplo: 11.111.111-1"></b-form-input>
					</b-col>
				</b-form-row>					
				<b-form-row>
					<b-col cols="12" sm="6">
						<label>Nascimento*</label>
						<the-mask id="employee-birth" type="text" class="form-control" v-model="employee.dataNascimento"  :mask="['##/##/####']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
					</b-col>
					<b-col cols="12" sm="6">
						<label>Função*</label>
						<b-row>
						<b-col>
							<v-select
								class="mb-3" 
								v-model="roleSelected"
								:required="!roleSelected" 
								label="text" 
								:options="roleList">
								<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
									<router-link :to="{ name: 'CadastrarFuncao', params: { actionMode:'save' }}">
										<b-button variant="primary"><i class="fab fa-black-tie"></i></b-button>
									</router-link>
								</template>
							</v-select>
						</b-col>  
					</b-row>
					</b-col>
				</b-form-row>					
				<b-form-row>
					<b-col cols="12" sm="6">
						<label>Telefone*</label>
						<the-mask id="employee-phone" type="text" class="form-control mb-3" v-model.trim="employee.telefone" :mask="['+## (##) ####-####']" :masked="false" placeholder="Exemplo: +55 (45) 3025-1144" :required="true"/>
					</b-col>
					<b-col cols="12" sm="6">
						<label>Celular</label>
						<the-mask id="employee-cellphone" type="text" class="form-control mb-3" v-model.trim="employee.celular" :mask="['+## (##) #####-####']" :masked="false" placeholder="Exemplo: +55 (45) 98404-5443" :required="true"/>
					</b-col>
				</b-form-row>
				<b-form-row>
					<label>E-mail</label>
					<b-form-input id="employee-email" class="mb-3" v-model="employee.email" type="email" placeholder="Exemplo: simoeslealneto@gmail.com"></b-form-input>
				</b-form-row>				
			</b-form-group>
    </b-form>
		
		<b-form class="form-panel">		
			<b-form-group
				id="informacoes-endereco"
				description="*Campos obrigatórios">
					<label>Endereço*</label>
					<b-form-input id="employee-street" class="mb-3" v-model="employee.rua" type="text" placeholder="Exemplo: Rua dos Bobos"></b-form-input>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>Número*</label>
							<b-form-input id="employee-number" class="mb-3" v-model="employee.numero" type="text" placeholder="Exemplo: 0000"></b-form-input>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Bairro*</label>
							<b-form-input id="employee-district" class="mb-3" v-model="employee.bairro" type="text" placeholder="Exemplo: Jardim Esmero"></b-form-input>
						</b-col>
					</b-form-row>
					<b-form-row>
						<b-col cols="12" sm="6">
							<label>CEP*</label>
							<the-mask id="employee-cep" type="text" class="form-control mb-3" v-model.trim="employee.cep" :mask="['#####-###']" :masked="false" placeholder="Exemplo: 00000-000" :required="true"/>
						</b-col>
						<b-col cols="12" sm="6">
							<label>Complemento</label>
							<b-form-input id="employee-complement" class="mb-3" v-model="employee.complemento" type="text" placeholder="Exemplo: Casa"></b-form-input>
						</b-col>
					</b-form-row>
					<label>País*</label>
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
					<label>Estado*</label>
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
					<label>Cidade*</label>
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
	name: 'CadastroDeEmpregado',
	components: {
		'page-title': PageTitle,
		TheMask
	},

  props: {
    actionMode: {
			type: String,
			default: 'save',
		},
    selectedEmployee: Object,
  },

	data() {
		return {
			employee: {
				id: 0,
				idEndereco: 0,
				idFuncao: 0,
				nome: '',
				sobrenome: '',
				login: '',
				password: '',
				status: true,
				cpf: '',
				rg: '',
				ctps: '',
				dataNascimento: '',
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
			},
			roleSelected: '',
			ufSelected: '',
			countrySelected: '',
			citySelected: '',
			roleList: [],
			ufBrazilianStates: [],
      countryList: [],
			citiesList: [],
			countryId: 0,
			stateId: 0
		}		
	},
	
	async mounted() {
    if(this.selectedEmployee) {
			await this.getEmployeeById(this.selectedEmployee.id)
    } else {
			this.getCountries()
			this.getOccupationList()
		}
  },

	computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
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
					this.countryList = [],
					this.ufSelected = null,
					this.ufBrazilianStates = [],
					this.citySelected = null,
					this.citiesList = [],
					this.getCountries()
				}
			} else {
				if (this.countrySelected === null) {
					this.countryList = [],
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

		async getEmployeeById(id) {
			let response
			try {
				response = await RestConnection.get('funcionarios/consultar/funcionario/'+id)
				const payload = response.data.conteudo
				await this.populateFields(payload)
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getOccupationList")
        this.backOnePage()
			}
		},

		async populateFields(payload){
			this.employee = payload.employee.info
			
			this.roleSelected = ({value: payload.employee.occupation.id, text: `${payload.employee.occupation.nome}`})
			
			this.countrySelected = ({value: payload.employee.country.id, text: `${payload.employee.country.sigla} - ${payload.employee.country.nomePt}`})
			this.countryId = this.countrySelected.value
			
			this.ufSelected = ({value: payload.employee.state.id, text: `${payload.employee.state.uf} - ${payload.employee.state.nome}`})
			this.stateId = this.ufSelected.value
			
			this.citySelected = ({value: payload.employee.city.id, text: `${payload.employee.city.nomeCidade}`})

			return
		},

		async getOccupationList() {
			let response, roleList
			try {
				response = await RestConnection.get('funcoes/consultar/funcao')
				roleList = response.data.conteudo			 
				for (let i = 0; i < roleList.length; i++) {
					this.roleList.push({value: roleList[i].id, text: `${roleList[i].nome}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getOccupationList")
        this.backOnePage()
			}
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
			 if (!this.employee.nome) {
				alert(`Não identificamos o Nome do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.employee.sobrenome) { 
				alert(`Não identificamos o Sobrenome do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.employee.login) {
				alert(`Não identificamos o Login do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.employee.cpf) {
				alert(`Não identificamos o CPF do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.employee.dataNascimento) {
				alert(`Não identificamos a data de nascimento do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.employee.telefone) {
				alert(`Não identificamos o Telefone do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else if (!this.roleSelected.value) {
				alert(`Não identificamos a função do Funcionário e este é um campo obrigatório. Por favor, tente novamente.`)
			} else {
				idAdress = await this.saveNewAdress();
				if (idAdress) {
					let parameters = {
						name: this.employee.nome,
						lastName: this.employee.sobrenome,
						birth: this.employee.dataNascimento,
						login: this.employee.login,
						password: this.employee.password,
						status: this.employee.status,
						cpf: this.employee.cpf,
						email: this.employee.email,
						phone: this.employee.telefone,
						cellphone: this.employee.celular,
						id_endereco: idAdress,
						id_funcao: this.roleSelected.value				
					}
					try {
						response = await RestConnection.post('funcionarios/cadastrar/funcionario/', parameters)
					} catch (exception) {
							if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
								return alert(exception.response.data.mensagem)
							} else {
								return alert('Não foi Salvar este Funcionário.')
							}
					}
					alert(response.data.mensagem)
					this.backOnePage()
				} else {
					return
				}
			}
    },

		async saveNewAdress() {
			let response
			let parameters = {
					zipcode: this.employee.cep,
					street: this.employee.rua,
					number:  this.employee.numero,
					block:  this.employee.bairro,
					complement:  this.employee.complemento,
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
            return alert('Não foi possível salvar o endereço do funcionário.')
          }
      }
			return response.data.conteudo[0].id
		},

    async alterRecord() {
     	let response
      let parameters = {
				id: this.employee.id,
				name: this.employee.nome,
				lastName: this.employee.sobrenome,
				birth: this.employee.dataNascimento,
				login: this.employee.login,
				status: this.employee.status,
				cpf: this.employee.cpf,
				email: this.employee.email,
				phone: this.employee.telefone,
				cellphone: this.employee.celular,
				id_endereco: this.employee.idEndereco,
				id_funcao: this.roleSelected.value				
      }
      try {
        response = await RestConnection.put('funcionarios/atualizar/funcionario/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este Funcionário.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('funcionarios/deletar/funcionario/' + this.employee.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este Funcionário.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()     
    },
  }
}
</script>
