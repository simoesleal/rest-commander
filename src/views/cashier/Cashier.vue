<template>
	<div>
		<b-container  v-if="this.$route.path === '/caixa'">
			<div v-if="this.caixa && this.caixa.id > 0">
				<b-row class="mt-2">
					<b-col cols="12" md="9">
						<page-title icon="fas fa-cash-register" main="Caixa"></page-title>       
					</b-col>
				</b-row>	
				<b-row class="mb-3">
					<b-col cols="4">
						<span>Data: {{caixa.dataHoraInicio}}</span>
					</b-col>
					<b-col cols="8">
						<span>Operador: {{caixa.nomefunc}} {{caixa.sobrefunc}}</span>	
					</b-col>
				</b-row>
				<div class="text-muted">
					<div class="table-responsive">
						<table class="table table-striped table-bordered ">
							<thead class="thead-dark">
								<tr>
									<th scope="col"></th>
									<th scope="col">Fundo</th>
									<th scope="col">Fechamentos</th>
									<th scope="col">Total</th>
									<th scope="col"></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th class="table-success" scope="row">Dinheiro (R$)</th>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fundoReal" v-bind="money"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fechamentosReal" v-bind="money"></v-money></td>
									<td><v-money :value="parseFloat(caixa.fundoReal) + parseFloat(caixa.fechamentosReal)" disabled placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>						
									<td></td>
								</tr>
								<tr>
									<th class="table-success" scope="row">Dolar (U$)</th>
									<td><v-money disabled placeholder="Exemplo: U$ 0.00" required v-model="caixa.fundoDolar" v-bind="moneyU$"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: U$ 0.00" required v-model="caixa.fechamentosDolar" v-bind="moneyU$"></v-money></td>
									<td><v-money :value="parseFloat(caixa.fundoDolar) + parseFloat(caixa.fechamentosDolar)" disabled placeholder="Exemplo: U$ 0.00" required v-bind="moneyU$"></v-money></td>	
									<td><v-money :value="converteTotalDolar" disabled placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
								</tr>
								<tr>
									<th class="table-success" scope="row">Peso (P$)</th>
									<td><v-money disabled placeholder="Exemplo: P$ 0.00" required v-model="caixa.fundoPeso" v-bind="moneyP$"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: P$ 0.00" required v-model="caixa.fechamentosPeso" v-bind="moneyP$"></v-money></td>
									<td><v-money :value="parseFloat(caixa.fundoPeso) + parseFloat(caixa.fechamentosPeso)" disabled placeholder="Exemplo: P$ 0.00" required v-bind="moneyP$"></v-money></td>	
									<td><v-money :value="converteTotalPeso" disabled placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
								</tr>
								<tr>
									<th class="bg-info" scope="row">Total à Vista</th>
									<td class="bg-info"><v-money disabled placeholder="Exemplo: U$ 0.00" required :value="parseFloat(caixa.fundoReal) + parseFloat(caixa.fundoDolar) + parseFloat(caixa.fundoPeso)" v-bind="moneyU$"></v-money></td>
									<td class="bg-info"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="parseFloat(caixa.fechamentosReal) + parseFloat(caixa.fechamentosDolar) + parseFloat(caixa.fechamentosPeso)" v-bind="money"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="calculaTotalAVista" v-bind="money"></v-money></td>
									<td></td>
								</tr>
								<tr>
									<th class="table-success" scope="row">Cartão Crédito</th>
									<td></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fechamentosCartaoCred" v-bind="money"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fechamentosCartaoCred" v-bind="money"></v-money></td>
									<td></td>
								</tr>
								<tr>
									<th class="table-success" scope="row">Cartão Débito</th>
									<td></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fechamentosCartaoDeb" v-bind="money"></v-money></td>
									<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="caixa.fechamentosCartaoDeb" v-bind="money"></v-money></td>
									<td></td>
								</tr>
								<tr>
									<th class="bg-info" scope="row">Total à Prazo</th>
									<td class="bg-info"><v-money disabled placeholder="Exemplo: R$ 0.00" required value="0.00" v-bind="money"></v-money></td>
									<td class="bg-info"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="parseInt(caixa.fechamentosCartaoCred, 10) + parseInt(caixa.fechamentosCartaoDeb, 10)" v-bind="money"></v-money></td>
									<td class="bg-info"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="parseInt(caixa.fechamentosCartaoCred, 10) + parseInt(caixa.fechamentosCartaoDeb, 10)" v-bind="money"></v-money></td>
									<td></td>
								</tr>
								<tr>
									<th class="bg-success" scope="row">Total Geral</th>
									<td class="bg-success"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="calculaTotalGeralFundo" v-bind="money"></v-money></td>
									<td class="bg-success"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="calculaTotalGeralFechamentos" v-bind="money"></v-money></td>
									<td class="bg-success"><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="calculaTotalGeralTotal" v-bind="money"></v-money></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<b-row class="mt-3">
					<b-col cols="4">
						<b-col>
							<span>Cotação Dolar: </span>
							<v-money class="d-inline" disabled placeholder="Exemplo: U$ 0.00" required :value="caixa.cotacaoDolar || 0.00" v-bind="moneyU$"></v-money>
						</b-col>						
					</b-col>
					<b-col cols="4">
						<span>Cotação Peso: </span>
						<v-money class="d-inline" disabled placeholder="Exemplo: P$ 0.00" required :value="caixa.cotacaoPeso || 0.00" v-bind="moneyP$"></v-money>
					</b-col>
					<b-col cols="4">
						<span>Cotação Guarani: </span>
						<v-money class="d-inline" disabled placeholder="Exemplo: G$ 0.00000" required :value="caixa.cotacaoGuarani || 0.00" v-bind="moneyG$"></v-money>
					</b-col>
				</b-row>
				<b-row class="mt-5">
					<b-col class="d-flex justify-content-end">
						<b-button size="lg" variant="outline-dark" class="m-1" v-b-modal.modal-fechamentos><i class="fas fa-check-double"></i> Fechamentos</b-button>
						<b-button size="lg" variant="outline-primary" class="m-1" @click="fecharMesa"><i class="fab fa-buromobelexperte"></i> Fechar Mesa</b-button>
						<b-button size="lg" variant="outline-danger" class="m-1" @click="fecharCaixa"><i class="fas fa-archive"></i> Fechar Caixa</b-button>
					</b-col>   
				</b-row>
				<div>
					<b-modal id="modal-fechamentos" title="Fechamentos Efetivados">
						<div class="table-responsive">
							<table class="table table-striped table-sm">
								<thead class="thead-dark">
									<tr>
										<th scoped="col">Mesa</th>
										<th scoped="col">Forma de Pagamento</th>
										<th scoped="col">Valor Total</th>
									</tr>
								</thead>
								<tbody>
									<tr  v-for="(fechamento, index) in listaFechamentosEfetuados" :key="index">
										<td>{{fechamento.numeroMesa}}</td>
										<td>{{fechamento.formaPagamento}}</td>
										<td><v-money disabled placeholder="Exemplo: R$ 0.00" required v-model="fechamento.valorTotal" v-bind="money"></v-money></td>
									</tr>
								</tbody>
							</table>
						</div>
					</b-modal>
				</div>
			</div>
			<div v-else>
				<b-row class="mt-2">
					<b-col cols="12" md="9">
						<page-title icon="fas fa-cash-register" main="Caixa"></page-title>       
					</b-col>
				</b-row>
				<b-alert show variant="primary">Nenhum caixa aberto no momento. Preencha as informações abaixo e clique no botão Abrir Caixa</b-alert>
				<div class="form-panel">
					<h1 class="h2">Abertura de Caixa</h1>
					<b-row class="mt-4">
						<b-col><label>Funcionário</label></b-col>
					</b-row>
					<b-row class="mb-3">
						<b-col cols="11">
							<v-select
								class="mb-3" 
								v-model="employeeSelected"
								:required="!employeeSelected" 
								label="text" 
								:options="employeeList">
								<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
									<router-link :to="{ name: 'CadastrarFuncionario', params: { actionMode:'save' }}">
										<b-button variant="primary"><i class="fas fa-user-tie"></i></b-button>
									</router-link>
								</template>
							</v-select>
						</b-col>  
						<b-col cols="1" class="btn-new-register">
							<router-link :to="{ name: 'ConsultarFuncionarios', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-user-tie fa-sm"></i></b-button>
							</router-link>
						</b-col>  
					</b-row>
					<b-row class="mt-4">
						<b-col><label>Cotação Dolar</label></b-col>
					</b-row>
					<b-row class="mb-3">
						<b-col cols="11">
							<v-select
								class="mb-3" 
								v-model="quotationSelected"
								:required="!quotationSelected" 
								label="text" 
								:options="quotationList">
								<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
									<router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
										<b-button variant="primary"><i class="fas fa-money-bill-alt"></i></b-button>
									</router-link>
								</template>
							</v-select>
						</b-col>  
						<b-col cols="1" class="btn-new-register">
							<router-link :to="{ name: 'ConsultarMoeda', params: { actionMode:'save' }}">
								<b-button variant="primary"><i class="fas fa-money-bill-alt fa-sm"></i></b-button>
							</router-link>
						</b-col>  
					</b-row>
					<h2>Adicionar Fundos</h2>
					<b-row>
						<b-col>
							<b-row>
								<b-col cols="2">
									<span>Real R$</span>
								</b-col>
								<b-col cols="10" class="mb-2">
									<v-money type="text" class="form-control" required placeholder="Exemplo: R$ 0.00" v-model.number="fundo.real" v-bind="money" trim></v-money>
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="2">
									<span>Dolar R$</span>
								</b-col>
								<b-col cols="10" class="mb-2">
									<v-money type="text" class="form-control" required placeholder="Exemplo: U$ 0.00" v-model.number="fundo.dolar" v-bind="money" trim></v-money>
								</b-col>
							</b-row>
							<b-row>
								<b-col cols="2">
									<span>Peso P$</span>
								</b-col>
								<b-col cols="10" class="mb-2">
									<v-money type="text" class="form-control" required placeholder="Exemplo: P$ 0.00" v-model.number="fundo.peso" v-bind="money" trim></v-money>
								</b-col>
							</b-row>
						</b-col>
					</b-row>
					<b-row class="mt-5 p-5">
						<b-col>							
							<b-button block variant="outline-success" @click="abrirNovoCaixa"><i class="fas fa-cash-register"></i> Abrir Caixa</b-button>
						</b-col>
					</b-row>
				</div>
			</div>
		</b-container>
		<router-view></router-view>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'

export default {
 name: 'Caixa',
  components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},
	data() {
		return {
			caixa: {
				id: 0,
				saldoInicial: 0,
				saldoFinal: 0,
				dataHoraInicio: 0,
				dataHoraFim: 0,
				idFuncionario: 0,
				nomefunc: '',
				sobrefunc: '',
				idCotacao: 0,
				cotacao: 0,
				idMoeda: 0,
				moeda: "",
				fundoReal: 0,
				fundoDolar: 0,
				fundoPeso: 0,
				fechamentosReal: 0,
				fechamentosDolar: 0,
				fechamentosPeso: 0,
				fechamentosCartaoCred: 0,
				fechamentosCartaoDeb: 0,
				valor_total_fechamentos: 0,
				troco: 0,				
				totalAVista: 0
			},
			totalGeralFundo: 0,
			totaGeralFechamento: 0,
			geralTotal: 0,
			employeeSelected: '',
			employeeList: [],
			fundo: {
				real: 0,
				dolar: 0,
				peso: 0
			},
			quotationSelected: '',
			quotationList: [],
			saldoInicial: 0,
			listaFechamentosEfetuados: [],
				money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
				moneyU$: {
        decimal: ',',
        thousands: '.',
        prefix: 'U$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
				moneyP$: {
        decimal: ',',
        thousands: '.',
        prefix: 'P$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
				moneyG$: {
        decimal: ',',
        thousands: '.',
        prefix: 'G$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
		}
	},

	mounted() {
		this.getCurrentCashier()
	},

	computed: {
		calculaTotalAVista() {
			this.caixa.totalAVista = 
				parseInt(this.caixa.fundoReal, 10) + 
				parseInt(this.caixa.fundoDolar, 10) + 
				parseInt(this.caixa.fundoPeso, 10) + 
				parseInt(this.caixa.fechamentosReal, 10) +
				parseInt(this.caixa.fechamentosDolar, 10) + 
				parseInt(this.caixa.fechamentosPeso, 10)
			return this.caixa.totalAVista
		},
		calculaTotalGeralFundo() {
			this.totalGeralFundo = 
				parseInt(this.caixa.fundoReal, 10) + 
				parseInt(this.caixa.fundoDolar, 10) + 
				parseInt(this.caixa.fundoPeso, 10)			
			return this.totalGeralFundo
		},
		calculaTotalGeralFechamentos(){
			this.totaGeralFechamento = 
			parseInt(this.caixa.fechamentosReal, 10) + 
			parseInt(this.caixa.fechamentosDolar, 10) + 
			parseInt(this.caixa.fechamentosPeso, 10) + 
			parseInt(this.caixa.fechamentosCartaoCred, 10) + 
			parseInt(this.caixa.fechamentosCartaoDeb, 10)
			return this.totaGeralFechamento
		},
		calculaTotalGeralTotal() {
			this.geralTotal = this.calculaTotalGeralFundo + this.calculaTotalGeralFechamentos
			return this.geralTotal
		},
		calculaSaldoInicial() {
			this.saldoInicial = parseInt(this.fundo.real, 10) + parseInt(this.fundo.dolar, 10) + parseInt(this.fundo.peso, 10)
			return this.saldoInicial
		},
		converteTotalDolar() {
			const tatalFechamentosDolar =	parseFloat(this.caixa.fundoDolar) + parseFloat(this.caixa.fechamentosDolar)
			return parseFloat(tatalFechamentosDolar) / 4.20
		},
		converteTotalPeso() {
			const tatalFechamentosPeso =	parseFloat(this.caixa.fundoPeso) + parseFloat(this.caixa.fechamentosPeso)
			return parseFloat(tatalFechamentosPeso) / 14.22
		},
	},

	methods: {
		async getCurrentCashier () {
      let response, currentCashier
      try {
        response = await RestConnection.get('caixa/consultar/')
				currentCashier = response.data.conteudo
				if (response.status === 200 && currentCashier) {
					this.caixa = currentCashier
					this.getFechamentos()
				} else {
					this.getEmployee()
					this.getQuotation()
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar as informações do caixa atual.")
          }
      }
    },
		async getFechamentos() {
			let response
			try {
				response = await RestConnection.get('fechamento/consultar/fechamentos/' + this.caixa.id)
				let fechamentos = response.data.conteudo
				this.listaFechamentosEfetuados = fechamentos
				for (let i = 0; i < fechamentos.length; i++) {
					this.caixa.fechamentosReal = parseInt(this.caixa.fechamentosReal, 10) + parseInt(fechamentos[i].realbr, 10)
					this.caixa.fechamentosDolar = parseInt(this.caixa.fechamentosDolar, 10) + parseInt(fechamentos[i].dolar, 10)
					this.caixa.fechamentosPeso = parseInt(this.caixa.fechamentosPeso, 10) + parseInt(fechamentos[i].peso, 10)
					this.caixa.fechamentosCartaoCred = parseInt(this.caixa.fechamentosCartaoCred, 10) + parseInt(fechamentos[i].cc, 10)
					this.caixa.fechamentosCartaoDeb = parseInt(this.caixa.fechamentosCartaoDeb, 10) + parseInt(fechamentos[i].cb, 10)
				}
			} catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar os fechamentos deste caixa. Por favor, tente novamente.")
          }				
			}
		},
		async getEmployee() {
			let response, employeeList
			try {
				response = await RestConnection.get('funcionarios/consultar/funcionario')
				employeeList = response.data.conteudo			 
				for (let i = 0; i < employeeList.length; i++) {
					this.employeeList.push({value: employeeList[i].id, text: `${employeeList[i].nome}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getEmployee")
        this.backOnePage()
			}
		},
		async getQuotation() {
			let response, quotationList
			try {
				response = await RestConnection.get('cotacoes/consultar/')
				quotationList = response.data.conteudo			 
				for (let i = 0; i < quotationList.length; i++) {
					this.quotationList.push({value: quotationList[i].id, text: `${quotationList[i].simbolo} - ${quotationList[i].cotacao} (${quotationList[i].nomeMoeda})`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getQuotation")
        this.backOnePage()
			}
		},

		async abrirNovoCaixa() {
			let response
			let parameters = {			
				id_funcionario: this.employeeSelected.value,
				id_cotacao: this.quotationSelected.value,
				saldo_inicial: this.calculaSaldoInicial,
				saldo_final: 0,
				fundo_real: this.fundo.real,
				fundo_dolar: this.fundo.dolar,
				fundo_peso: this.fundo.peso,
				fechamentos_real: 0,
				fechamentos_dolar: 0,
				fechamentos_peso: 0,
				fechamentos_cartao_cred: 0,
				fechamentos_cartao_deb: 0,
				valor_total_fechamentos: 0,
				troco: 0
			}
			try {
				response = await RestConnection.post('caixa/cadastrar/', parameters)
				if (response.data.status === 200) {
					this.clearReactiveData()
					this.getCurrentCashier()
				}
			} catch (exception) {
				if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
					return alert(exception.response.data.mensagem)
				} else {
					return alert("Não foi possível abrir este caixa. Por favor, tente novamente")
				}
		}
		},

		async fecharMesa() {
			this.$router.push({ name: 'FechamentoConta', params: {idCaixa: this.caixa.id} })
		},

		async fecharCaixa() {
			this.employeeList = []
			this.quotationList = []
			let response
			let parameters = {
				id: this.caixa.id,
				saldo_final: this.calculaTotalGeralTotal,
				fechamentos_real: this.caixa.fechamentosReal,
				fechamentos_dolar: this.caixa.fechamentosDolar,
				fechamentos_peso: this.caixa.fechamentosPeso,
				fechamentos_cartao_cred: this.caixa.fechamentosCartaoCred,
				fechamentos_cartao_deb: this.caixa.fechamentosCartaoDeb,
				valor_total_fechamentos: this.calculaTotalGeralTotal
			}
			try {
				response = await RestConnection.put('caixa/fechar/', parameters)
				if (response.data.status === 200) {
					alert("Caixa fechado com sucesso!")
					this.caixa = []
					this.getCurrentCashier()
				}
			} catch (exception) {
				if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
					return alert(exception.response.data.mensagem)
				} else {
					return alert("Não foi possível fechar este caixa. Por favor, tente novamente")
				}
			}
		},

		clearReactiveData() {
			this.employeeSelected = '',
			this.fundo = {
				real: 0,
				dolar: 0,
				peso: 0
			},
			this.quotationSelected = ''
		}
	}

}
</script>

<style scoped>
.v-money {
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: #000;
}
</style>