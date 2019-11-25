<template>
	<div v-if="this.$route.path === '/caixa/fechamento-conta'">
		<b-container v-if="idCaixa">
			<div v-if="itensPedido.length <= 0">
				<b-row>
					<b-col cols="12" md="9">
						<page-title icon="fas fa-calculator" main="Fechamento de Mesa"></page-title>           
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<h1 class="h3">Selecione a mesa que deseje encerrar</h1>
					</b-col>
				</b-row>
				<b-row>
					<b-col cols="3" class="mt-3 mb-3" v-for="(mesa, index) in listOfTables" :key="index">
						<b-button @click="selectCustomerAccount(mesa)" size="lg" class="mesas text-nowrap shadow-sm" variant="outline-danger"><i class="fab fa-buromobelexperte"></i> {{mesa.numeroMesa}}</b-button>
					</b-col>
				</b-row>
				<b-row>
          <b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
            <router-link :to="{ name: 'Caixa'}">
              <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
              <div class="text-uppercase font-300">Voltar</div>
            </router-link>
          </b-col>
        </b-row>
			</div>
			<div v-else>
				<b-row>
					<b-col cols="12" md="9">
						<page-title icon="fas fa-calculator" main="Fechamento de Mesa"></page-title>           
					</b-col>
				</b-row>
				<div class="table-responsive">
					<table class="table table-striped table-sm">
						<thead class="thead-dark">
							<tr>
								<th scoped="col">Produto</th>
								<th scoped="col">QTD</th>
								<th scoped="col">Valor Unit</th>
								<th scoped="col">Valor Total</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(pedido, index) in itensPedido" :key="index">
								<td>{{pedido.nomeProd}}</td>
								<td>{{pedido.quantidade}}</td>
								<td><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="pedido.pvProd" v-bind="money"></v-money></td>
								<!-- <td>{{pedido.pvProd}}</td> -->
								<!-- <td>{{pedido.pvProd*pedido.quantidade}}</td> -->
								<td><v-money disabled placeholder="Exemplo: R$ 0.00" required :value="pedido.pvProd*pedido.quantidade" v-bind="money"></v-money></td>
							</tr>
						</tbody>
					</table>
				</div>

				<b-row class="mt-5">
					<b-col>
						<h1>10%</h1>
						<v-money class="d-inline" disabled placeholder="Exemplo: R$ 0.00" required :value="tenPercent" v-bind="money"></v-money>
						<b-form-checkbox v-model="tip" name="tip-button" switch>
							Sem 10%
						</b-form-checkbox>
					</b-col>
					<b-col>
						<h1>Valor Total</h1>
						<v-money class="d-inline" disabled placeholder="Exemplo: R$ 0.00" required :value="totalValue" v-bind="money"></v-money>
					</b-col>
				</b-row>

				<div class="mt-5">
					<b-collapse id="collapse-close-account" class="mt-2  form-panel">
						<b-row>
							<b-col cols="6" class="forma-pagamento-box">
								<b-row>
									<b-col>
										<label>Forma de Pagamento</label>
										<v-select
											class="mb-3" 
											v-model="formaPagamentoSelected"
											:required="!formaPagamentoSelected" 
											label="text" 
											:options="formasDePagamento">
										</v-select>
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3">
										<span>Real R$</span>
									</b-col>
									<b-col cols="9" class="mb-2">
										<span class="form-control"><v-money placeholder="Exemplo: R$ 0.00" required v-model="dinheiro.real" v-bind="money"></v-money></span>										
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3">
										<span>Dolar R$</span>
									</b-col>
									<b-col cols="9" class="mb-2">
										<span class="form-control"><v-money placeholder="Exemplo: U$ 0.00" required v-model="dinheiro.dolar" v-bind="moneyU$"></v-money></span>
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3">
										<span>Peso P$</span>
									</b-col>
									<b-col cols="9" class="mb-2">
										<span class="form-control"><v-money placeholder="Exemplo: P$ 0.00" required v-model="dinheiro.peso" v-bind="moneyP$"></v-money></span>
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3">
										<span>Guarani G$</span>
									</b-col>
									<b-col cols="9" class="mb-2">
										<span class="form-control"><v-money placeholder="Exemplo: G$ 0.00000" required v-model="dinheiro.guarani" v-bind="moneyG$"></v-money></span>
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3">
										<span>Cartão Créd</span>
									</b-col>
									<b-col cols="9" class="mb-2">
										<span class="form-control"><v-money placeholder="Exemplo: R$ 0.00" required v-model="cartao.credito" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
								<b-row>
									<b-col cols="3" class="mb-2">
										<span>Cartão Déb</span>
									</b-col>
									<b-col cols="9">
										<span class="form-control"><v-money placeholder="Exemplo: R$ 0.00" required v-model="cartao.debito" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
							</b-col>
							<b-col cols="6">
								<b-row class="mt-4">
									<b-col cols="3">
										<span>Desconto %</span>
									</b-col>
									<b-col cols="4">
										<b-form-input class="text-center" type="number" v-model="descontoValorPorcentagem" placeholder="%">{{ descontoPorcentagem }}</b-form-input>
									</b-col>
									<b-col cols="4">
										<span class="form-control"><v-money placeholder="Exemplo: R$ 0.00" required v-model="descontoValor" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
								<hr>
								<b-row>
									<b-col cols="3">
										<span>Valor Total</span>
									</b-col>
									<b-col cols="9">
										<span class="form-control closed-field"><v-money placeholder="Exemplo: R$ 0.00" required :value="valorTotalCalculado" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
								<b-row class="mt-3">
									<b-col cols="3">
										<span>Valor Pago</span>
									</b-col>
									<b-col cols="9">										
										<span class="form-control closed-field"><v-money placeholder="Exemplo: R$ 0.00" required :value="valorPago" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
								<hr>
								<b-row>
									<b-col cols="3">
										<span>Faltante</span>
									</b-col>
									<!-- <b-col cols="9">
										<span class="form-control closed-field"><v-money placeholder="Exemplo: R$ 0.00" required :value="totalFaltante" v-bind="money"></v-money></span>
									</b-col> -->
									<b-col cols="9">
										<span class="form-control closed-field"><v-money placeholder="Exemplo: R$ 0.00" required :value="valorTotalFaltante" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
								<b-row class="mt-3">
									<b-col cols="3">
										<span>Troco</span>
									</b-col>
									<b-col cols="9">
										<!-- <b-form-input type="number" disabled v-model="totalTroco" placeholder="R$ 0.00">{{valorTotalTroco}}</b-form-input> -->
										<span class="form-control closed-field"><v-money placeholder="Exemplo: R$ 0.00" required :value="valorTotalTroco" v-bind="money"></v-money></span>
									</b-col>
								</b-row>
							</b-col>
						</b-row>
						 <b-row>
              <b-col class="d-flex justify-content-end mt-4">
                <b-button variant="outline-dark" class="m-1" @click="clearPagamento"><i class="fas fa-broom"></i> Limpar</b-button>
                <b-button variant="success" class="m-1" @click="closeClientAccount"><i class="fas fa-check-double"></i> Concluir Fechamento</b-button>
              </b-col>   
            </b-row>
					</b-collapse>
				</div>

				<b-row>
					<b-col class="d-flex justify-content-start mt-5">
						<b-button @click="selectAnotherTable" size="lg" class="mesas text-nowrap shadow-sm" variant="outline-secondary">Cancelar</b-button>	
					</b-col>
					<b-col class="d-flex justify-content-end mt-5">
						<b-button @click="clearPagamento" v-b-toggle.collapse-close-account size="lg" class="mesas text-nowrap shadow-sm" variant="primary">Fechar</b-button>	
					</b-col>
				</b-row>	
			</div>
		</b-container>
		<b-container v-else>
			<b-alert show variant="danger">Acesso não permitido!</b-alert>
			<b-row>
          <b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
            <router-link :to="{ name: 'Caixa'}">
              <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
              <div class="text-uppercase font-300">Voltar</div>
            </router-link>
          </b-col>
        </b-row>
		</b-container>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'

export default {
	name: 'FechamentoMesa',
  components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},
	props: {
    idCaixa: [Number, String],
  },
	data() {
		return {
			listOfTables: [],
			selectedTable: {
				id: 0,
				numero: 0
			},
			pedidosStatus: 0,
			itensPedido: [],
			tip: true,
			tipValue: 0,
			formaPagamentoSelected: '',
			formasDePagamento: [],
			dinheiro: {
				real: 0,
				dolar: 0,
				peso: 0,
				guarani: 0
			},
			cartao: {
				credito: 0,
				debito: 0,
			},
			descontoValorPorcentagem: 0,
			descontoValor: 0,
			valorAPagar: 0,
			totalValueCalculeted: 0,
			totalFaltante: 0,
			totalTroco: 0,
			idContaCliente: 0,
			idMesa: 0,
			currentQuotation: 0,
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
		this.getTables()
		this.getFormasPagamento()
		this.getQuotations()
	},
	watch: {
		selectedTable() {
			let idMesa = this.selectedTable.id
			let numeroMesa = this.selectedTable.numero
			this.getOrdersFromCustomer(idMesa, numeroMesa)
		}
	},

	computed: {
		tenPercent() {
			if (this.itensPedido.length > 0) {
				let tenPercent = 0
				for(let i = 0; i < this.itensPedido.length; i++) {
					let totalValue = parseFloat(this.itensPedido[i].pvProd) * this.itensPedido[i].quantidade
					tenPercent = parseFloat(tenPercent) + parseFloat(totalValue)
				}
				tenPercent = (parseFloat(tenPercent)/10)
				this.tipValue = tenPercent
				return tenPercent
			}
		},
		totalValue() {
			if (this.itensPedido.length > 0) {
				let total = 0
				for(let i = 0; i < this.itensPedido.length; i++) {
					let totalValue = this.itensPedido[i].pvProd * this.itensPedido[i].quantidade
					total = parseFloat(total) + parseFloat(totalValue)
				}
				if (this.tip === true) {
					total = total + this.tipValue
					return total
				} else {
					return total
				}
			}
		},
		descontoPorcentagem() {
			if (this.descontoValorPorcentagem > 0) {
				this.descontoValor = (parseFloat(this.totalValue) * (parseFloat(this.descontoValorPorcentagem) / 100))
				return `${this.descontoValor}`
			} else {
				return this.descontoValor = `${0.00}%`
			}
		},
		valorTotalCalculado() {
			if (this.descontoValorPorcentagem > 0 || this.descontoValor > 0) {
				return this.totalValueCalculeted = (this.totalValue - this.descontoValor)
			} else {
				return this.totalValueCalculeted = this.totalValue
			}
		},
		valorPago() {
			if (this.formaPagamentoSelected) {
				if (this.descontoValorPorcentagem > 0) {
					return this.valorAPagar = (
						(parseFloat(this.dinheiro.real) + 
						(parseFloat(this.dinheiro.dolar) * parseFloat(this.currentQuotation.dolarQuotation.cotacao)) + 
						(parseFloat(this.dinheiro.peso) * parseFloat(this.currentQuotation.pesoQuotation.cotacao)) +
						(parseFloat(this.dinheiro.guarani) / parseFloat(this.currentQuotation.gueraniQuotation.cotacao)) + 
						parseFloat(this.cartao.credito) + 
						parseFloat(this.cartao.debito)) - 
						parseFloat(this.descontoValor)
					)
				} else {
					return this.valorAPagar = (
						parseFloat(this.dinheiro.real) + 
						(parseFloat(this.dinheiro.dolar) * parseFloat(this.currentQuotation.dolarQuotation.cotacao)) + 
						(parseFloat(this.dinheiro.peso) * parseFloat(this.currentQuotation.pesoQuotation.cotacao)) +
						(parseFloat(this.dinheiro.guarani) / parseFloat(this.currentQuotation.gueraniQuotation.cotacao)) + 
						parseFloat(this.cartao.credito) + 
						parseFloat(this.cartao.debito)
					)				
				}
			}
		},
		valorTotalFaltante() {
			if (this.valorTotalCalculado > this.valorPago) {
				return this.totalFaltante = parseFloat(this.valorTotalCalculado) - parseFloat(this.valorPago)
			} else {
				return this.totalFaltante = 0
			}
		},
		valorTotalTroco() {
			if (this.valorTotalCalculado < this.valorPago) {
				return this.totalTroco = parseFloat(this.valorPago) - parseFloat(this.valorTotalCalculado)
			} else {
				return this.totalTroco = 0
			}
		}
	},
	methods: {
		async getTables () {
      let response, tableList
      try {
        response = await RestConnection.get('conta-cliente/consultar/mesas/ocupadas')
				tableList = response.data.conteudo
				for (let i = 0; i < tableList.length; i++ ) {
					if (tableList[i].status === 'OCUPADA' ) {
						this.listOfTables.push(tableList[i])
					}
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Mesas.")
          }
      }
    },
			
		async getFormasPagamento () {
			let response, formasDePagamento
			try {
				response = await RestConnection.get('formas-pagamento/consultar/')
				formasDePagamento = response.data.conteudo			 
				for (let i = 0; i < formasDePagamento.length; i++) {
					this.formasDePagamento.push({value: formasDePagamento[i].id, text: `${formasDePagamento[i].forma}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getCountries")
				this.backOnePage()
			}
		},

		async getQuotations() {
			let response, quotationList
			try {
				response = await RestConnection.get('cotacoes/consultar/lista/caixa')
				this.currentQuotation = response.data.conteudo
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes. getQuotation")
        this.backOnePage()
			}
		},

		selectCustomerAccount (mesa) {
			this.selectedTable = {
				id: mesa.idMesa,
				numero: mesa.numeroMesa
			}
			this.idContaCliente = mesa.id
			this.idMesa = mesa.idMesa
		},

		async getOrdersFromCustomer(idMesa, numeroMesa) {
			let response
			try {
				response = await RestConnection.get('conta-cliente/consultar/pedidos/' + idMesa + '/' + numeroMesa)
				if (response.data.status === 200) {
					this.pedidosStatus = 200
					this.itensPedido = response.data.conteudo
				}
			} catch (exception) {
				if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
					return alert(exception.response.data.mensagem)
				} else {
					return alert('Não foi buscar a lista de pedidos. Por favor, tente novamente.')
				}
			}
		},

		async closeClientAccount() {
			let response
			let parameters = {
				p_id_conta_cliente: this.idContaCliente,
				p_id_mesa: this.idMesa,
				json_fechamento: [ {
					idCaixa: this.idCaixa,
					idFormaPagamento: this.formaPagamentoSelected.value,
					dinheiroReal: this.dinheiro.real,
					dinheiroDolar: this.dinheiro.dolar,
					dinheiroPeso: this.dinheiro.peso,
					cartaoCredito: this.cartao.credito,
					cartaoDebito: this.cartao.debito,
					desconto: this.descontoValor,
					troco: this.totalTroco,
					valorTotal: this.valorPago
				} ]
			}
			try {
				response = await RestConnection.post('fechamento/novo-fechamento/', parameters)
				if (response.data.status === 200) {
					alert('Mesa fechada com sucesso!')
					this.$router.push({ name: 'Caixa', params: {flagGetCaixa: true} })
				}
			} catch (exception) {
				if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
					return alert(exception.response.data.mensagem)
				} else {
					return alert('Não foi Fechar esta mesa. Por favor, tente novamente.')
				}  				
			}
		},
		
		backOnePage() {
      this.$router.back()
    },

		selectAnotherTable () {
			this.itensPedido = []
		},

		clearPagamento() {
			this.dinheiro = {
				real: 0,
				dolar: 0,
				peso: 0,
			},
			this.cartao = {
				credito: 0,
				debito: 0,
			},
			this.descontoValor = 0
		},

	},
			
}
</script>

<style scoped>
.forma-pagamento-box {
	border-right: 2px solid #ddd;
}

.v-money {
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: #000;
}

.closed-field {
	background: rgb(119, 196, 241);
}
</style>
</style>