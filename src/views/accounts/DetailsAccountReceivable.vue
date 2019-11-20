<template>
	<div>
		<div v-if="this.$route.path === '/contas-receber/detalhes-conta-receber'">
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-copy" main="Detalhes Duplitaca a Receber"></page-title> 
          </b-col>
        </b-row>

				<b-form class="form-panel">		
					<b-form-group
						id="informacoes-gerais"
						description="*Campos obrigatórios">
							
							<b-form-row>
								<b-col cols="12">
									<label>Código*</label>
									<b-form-input disabled v-model="codigoParcelamento" id="account-id" class="mb-3" type="text" placeholder="Exemplo: 0000"></b-form-input>
								</b-col>
							</b-form-row>

							<b-form-row>
								<b-col cols="12">
									<label>Fornecedor*</label>
									<v-select
										class="mb-3" 
										v-model="customerSelected"
										:required="!customerSelected" 
										label="text" 
										:options="customerList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarCliente', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-user-astronaut"></i></b-button>
											</router-link>
										</template>
									</v-select>
								</b-col>
							</b-form-row>
							<b-form-row>
								<b-col cols="12" sm="4">
									<label>Tipo Documento*</label>
									<v-select
										class="mb-3" 
										v-model="documentTypeSelected"
										:required="!documentTypeSelected" 
										label="text" 
										:options="documentTypeList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarTipoDocumento', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="far fa-file-alt"></i></b-button>
											</router-link>
										</template>
									</v-select>
								</b-col>
								<b-col cols="12" sm="4">
									<label>Conta Bancaria*</label>
									<v-select
										class="mb-3" 
										v-model="accountSelected"
										:required="!accountSelected" 
										label="text" 
										:options="bankAccountList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarContaBancaria', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-piggy-bank"></i></b-button>
											</router-link>
										</template>
									</v-select>
								</b-col>
								<b-col cols="12" sm="4">
									<label>Moeda*</label>
									<v-select
										class="mb-3" 
										v-model="coinSelected"
										:required="!coinSelected" 
										label="text" 
										:options="coinList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-money-bill-alt"></i></b-button>
											</router-link>
										</template>
									</v-select>
								</b-col>
							</b-form-row>

					</b-form-group>		
				</b-form>

				<b-form class="form-panel mt-3">
					<b-form-group
						id="informacoes-valores"
						description="*Campos obrigatórios">
							<b-form-row>
							<b-col cols="12" sm="6">
								<label>Quantidade de Parcelas*</label>
								<b-form-input disabled id="qtd-parcelas" class="mb-3" v-model="qtdParcelas" type="number" min="1" max="24" required placeholder="Exemplo: 01"></b-form-input>
							</b-col>
							<b-col cols="12" sm="6">
								<label>Valor Total*</label>
								<v-money disabled id="valor-total" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="valorLiquido" v-bind="money" number trim></v-money>
							</b-col>
						</b-form-row>								
					</b-form-group>
				</b-form>
				<div class="mt-3 form-panel">
						<table class="table table-bordeless">
							<thead class="thead-dark">
								<tr>
									<th scoped="col">#Parcela</th>
									<th scoped="col">Código</th>
									<th scoped="col">Valor</th>
									<th scoped="col">Valor Total</th>
									<th scoped="col">Emissão</th>
									<th scoped="col">Vencimento</th>
									<th scoped="col">Situação</th>
									<th scoped="col">Ações</th>
								</tr>
							</thead>
							<tbody v-for="(parcela) in listaParcelas" :key="parcela.id">
								<tr class="text-center">
									<td>{{parcela.numeroParcela}}</td>
									<td>{{parcela.codigo}}</td>
									<td><v-money disabled id="valor-parcela" class="form-control text-center" type="text" required placeholder="Exemplo: R$ 1000.00" v-model="parcela.valorParcela" v-bind="money" number trim></v-money></td>
									<td><v-money disabled id="valor-total" type="text" class="form-control text-center" required placeholder="Exemplo: R$ 1000.00" v-model="parcela.valorTotal" v-bind="money" number trim></v-money></td>
									<td><the-mask disabled id="data-emissao" type="text" class="form-control text-center" v-model="parcela.dataEmissao" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/></td>
									<td><the-mask disabled id="data-emissao" type="text" class="form-control text-center" v-model="parcela.dataVencimento" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/></td>
									<td><b-form-input v-model="parcela.status" disabled id="parcela-status" class="form-control text-center" type="text"></b-form-input></td>
									<td>
										<router-link :to="{ name: 'DetalhesParcelaReceber', params: { actionMode:'edit', selectedInstallment: parcela }}">
											<b-button variant="outline-info" class="mt-2 mx-auto"><i class="fas fa-pencil-alt"></i> Editar
											</b-button>
										</router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<b-container>
						<b-row class="mt-5">
							<b-col class="d-flex justify-content-start">
								<div @click="backOnePage">
									<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
									<div class="text-uppercase font-300">Voltar</div>
								</div>
							</b-col> 
							<b-col class="d-flex justify-content-end">
								<b-button @click="deleteRecord" class="text-uppercase text-center mx-3" variant="outline-danger"><i class="fas fa-trash-alt"></i> Excluir</b-button>
								<b-button @click="alterRecord" class="mr-3" variant="info">Salvar Alteração</b-button>
							</b-col>
						</b-row>
					</b-container>
			</b-container>
		</div>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'
import PageTitle from '../../components/template/PageTitle'

export default {
  name: 'DetalhesContaPagar',
  components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},
	props: {
		selectedAccountReceivable: Object,
		actionMode: String,
	},

	data() {
		return {
			codigoParcelamento: '',
			customerSelected: '',
			customerList: [],
			documentTypeSelected: '',
			documentTypeList: [],
			coinSelected: '',
			coinList: [],
			accountSelected: '',
			bankAccountList: [],
			dataApropriacao: '',
			valorBruto: 0,
			valorDesconto: 0,
			valorLiquido: 0,
			qtdParcelas: 1,
			valorParcela: 0,
			periodoDias: 1,
			numeroParcela: 1,
			listaParcelas: [],
			observacoes: '',
			alertValorTotal: false,
			money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
			fields: [
        { key: 'numeroParcela', label: '# Parcela', sortable: true},
        { key: 'codigo', label: 'Código' },
        { key: 'valorParcela', label: 'Valor' },
        { key: 'dataEmissao', label: 'Emissão' },
        { key: 'dataVencimento', label: 'Vencimento' },
        { key: 'valorTotal', label: 'Valor Total' },
        { key: 'actions', label: 'Ações' }
      ]
		}
	},	

	mounted() {
		if (this.selectedAccountReceivable) {
			this.getInfos(this.selectedAccountReceivable.id)
		} else {
			this.backOnePage()
		}
	},

	watch: {
		customerSelected() {
			if (this.customerSelected == null) { 
				this.customerList = []
				this.getCustomerList() 
			}
		},
		documentTypeSelected() {
			if (this.documentTypeSelected == null) {				
				this.documentTypeList = []
				this.getTypeDocument() 
			}
		},
		accountSelected() {
			if (this.accountSelected == null) { 
				this.bankAccountList = []
				this.getBankAccount()
			}
		},
		coinSelected() {
			if (this.coinSelected == null) {
				this.coinList = []	
				this.getCoins() 
			}
		}
	},


	methods: {
		backOnePage() {
      this.$router.back()
    },

		async getInfos(id) {
			let response, installments
			try {
				response = await RestConnection.get('parcelas-a-receber/consultar/' + id)
				installments = response.data.conteudo		
				this.listaParcelas = installments
				this.codigoParcelamento = installments[0].codigo
				this.valorLiquido = this.selectedAccountReceivable.valorTotal
				this.qtdParcelas = this.selectedAccountReceivable.qtdParcela

				this.customerList.push({value: this.selectedAccountReceivable.idCliente, text: `${this.selectedAccountReceivable.nomeCliente} ${this.selectedAccountReceivable.sobrenomeCliente}`})
				this.customerSelected = this.customerList.pop()

				this.documentTypeList.push({value: this.selectedAccountReceivable.idTd, text: `${this.selectedAccountReceivable.tipoDocumento}`})
				this.documentTypeSelected = this.documentTypeList.pop()

				this.bankAccountList.push({value: this.selectedAccountReceivable.idCb, text: `${this.selectedAccountReceivable.conta} / ${this.selectedAccountReceivable.numeroAgencia}-${this.selectedAccountReceivable.digitoAgencia} / ${this.selectedAccountReceivable.numeroConta}-${this.selectedAccountReceivable.digitoConta}`})
				this.accountSelected = this.bankAccountList.pop()

				this.coinList.push({value: this.selectedAccountReceivable.idMoeda, text: `${this.selectedAccountReceivable.simboloMoeda} - ${this.selectedAccountReceivable.moeda}`})
				this.coinSelected = this.coinList.pop()
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
			}
		},

		async getCustomerList () {
      let response, customerList
      try {
        response = await RestConnection.get('clientes/consultar/cliente')
				customerList = response.data.conteudo
				for (let i = 0; i < customerList.length; i++) {
					this.customerList.push({value: customerList[i].id, text: `${customerList[i].nome} ${customerList[i].sobrenome} / ${customerList[i].telefone}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Clientes.")
          }
      }
    },

		async getBankAccount () {
      let response, bankAccountList
      try {
        response = await RestConnection.get('contas-bancarias/consultar/conta-bancaria/')
				bankAccountList = response.data.conteudo
				for (let i = 0; i < bankAccountList.length; i++) {
					this.bankAccountList.push({value: bankAccountList[i].id, text: `${bankAccountList[i].contaBancaria} / ${bankAccountList[i].agencia}-${bankAccountList[i].digitoAgencia} / ${bankAccountList[i].numeroConta}-${bankAccountList[i].digitoConta}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Contas Bancárias.")
          }
      }
      this.listOfBankAccount = response.data.conteudo
    },

		async getTypeDocument () {
      let response, documentTypeList
      try {
        response = await RestConnection.get('tipo-documento/consultar/')
				documentTypeList = response.data.conteudo
				for (let i = 0; i < documentTypeList.length; i++) {
					this.documentTypeList.push({value: documentTypeList[i].id, text: `${documentTypeList[i].tipoDocumento}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Tipos de Documentos.")
          }
      }
    },

		async getCoins () {
      let response, coinList
      try {
        response = await RestConnection.get('moedas/consultar/')
				coinList = response.data.conteudo
				for (let i = 0; i < coinList.length; i++) {
					this.coinList.push({value: coinList[i].id, text: `${coinList[i].simbolo} - ${coinList[i].nomeMoeda}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Moedas.")
          }
      }
    },

		async alterRecord() {
			let response
			let parameters = {
					id: this.selectedAccountReceivable.id, 
					idCliente: this.customerSelected.value,
					idContaBancaria: this.accountSelected.value,
					idTipoDocumento: this.documentTypeSelected.value,
					idMoeda: this.coinSelected.value,
			}
			try {
				response = await RestConnection.put('contas-a-receber/atualizar/', parameters)
			} catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível atualizar as informações desta conta a receber. Por favor, tente novamente.')
          }
				}				
				alert(response.data.mensagem)
		},

		async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('contas-a-receber/deletar/' + this.selectedAccountReceivable.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Conta a Receber e suas Parcelas.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()     
		},
	}
}
</script>

<style scoped>
  .btn-new-register {
    position: relative;
    margin-left:-30px;
  }
</style>