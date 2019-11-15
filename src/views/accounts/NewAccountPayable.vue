<template>
	<div>
		<div v-if="this.$route.path === '/contas-pagar/nova-conta-pagar'">
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-copy" main="Nova Duplitaca a Pagar"></page-title> 
          </b-col>
        </b-row>

				<b-form class="form-panel">		
					<b-form-group
						id="informacoes-endereco"
						description="*Campos obrigatórios">
							
							<b-form-row>
								<b-col cols="12">
									<label>Código*</label>
									<b-form-input v-model="codigoParcelamento" id="account-id" class="mb-3" type="text" placeholder="Exemplo: 0000"></b-form-input>
								</b-col>
							</b-form-row>

							<b-form-row>
								<b-col cols="12">
									<label>Fornecedor*</label>
									<v-select
										class="mb-3" 
										v-model="supplierSelected"
										:required="!supplierSelected" 
										label="text" 
										:options="supplierList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarFornecedor', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-truck"></i></b-button>
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
											<!-- <router-link :to="{ name: 'CadastrarFornecedor', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-truck"></i></b-button>
											</router-link> -->
											<b-button variant="primary"><i class="fas fa-truck"></i></b-button>
										</template>
									</v-select>
								</b-col>
								<b-col cols="12" sm="4">
									<label>Conta*</label>
									<v-select
										class="mb-3" 
										v-model="accountSelected"
										:required="!accountSelected" 
										label="text" 
										:options="accountList">
										<template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
											<router-link :to="{ name: 'CadastrarMoeda', params: { actionMode:'save' }}">
												<b-button variant="primary"><i class="fas fa-money-bill-alt"></i></b-button>
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
						id="informacoes-endereco"
						description="*Campos obrigatórios">
							<b-form-row>
							<b-col cols="12" sm="4">
								<label>Emissão*</label>
								<the-mask id="data-emissao" type="text" class="form-control" v-model="dataEmissao" :mask="['##/##/####']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Vencimento*</label>
								<the-mask id="data-vencimento" type="text" class="form-control" v-model="dataVencimento" :mask="['##/##/####']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Apropriação</label>
								<the-mask id="data-apropriacao" class="form-control" v-model="dataApropriacao" :mask="['##/##/####']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
						</b-form-row>								
					</b-form-group>		
				</b-form>

				<b-form class="form-panel mt-3">
					<b-form-group
						id="informacoes-valores"
						description="*Campos obrigatórios">
							<b-form-row>
							<b-col cols="12" sm="4">
								<label>Valor Bruto*</label>
								<v-money id="valor-bruto" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="valorBruto" v-bind="money" number trim></v-money>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Desconto</label>
								<v-money id="valor-desconto" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="valorDesconto" v-bind="money" number trim></v-money>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Valor Líquido*</label>
								<v-money disabled id="valor-liquido" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="valorLiquido" v-bind="money" number trim></v-money>
							</b-col>
						</b-form-row>								
					</b-form-group>

					<b-row>
						<b-col cols="12" md="3" class="parcelamento-group">
							<b-form-group
								id="informacoes-endereco"
								description="*Campos obrigatórios">
									<b-form-row>
										<label>Qtd Parcelas*</label>
										<b-form-input id="qtd-parcelas" class="mb-3" v-model="qtdParcelas" type="number" min="1" max="24" required placeholder="Exemplo: 01"></b-form-input>
									</b-form-row>
									<b-form-row>
										<label>Valor Parcelas*</label>
										<v-money disabled id="valor-parcela" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="valorParcela" v-bind="money" number trim>{{calculaValorParcela}}</v-money>
									</b-form-row>	
									<b-form-row>
										<label>Período entre parcelas* (dias)</label>
										<b-form-input id="periodo-dias" class="mb-3" v-model="periodoDias" type="number" min="1" max="365" required placeholder="Exemplo: 01"></b-form-input>
									</b-form-row>	
									<b-form-row>
										<b-button block variant="outline-dark" class="mx-auto my-auto" @click="gerarParcelamento"><i class="fas fas fa-copy"></i> Gerar Parcelamento</b-button>
									</b-form-row>	
							</b-form-group>
						</b-col>	
						<b-col cols="12" md="9">
					<div v-if="listaParcelas.length > 0">
						<div class="col-12">
							<div class="table-responsive">
								<table class="table table-sm">
									<thead>
									<tr class="text-center">
										<th>Parcela</th>
										<th>Emissão</th>
										<th>Vencimento</th>
										<th>Valor</th>
									</tr>
									</thead>
									<tbody>
									<tr v-for="(parcela, index) in listaParcelas" :key="parcela.numeroParcela">
										<td><b-form-input id="codigo-parcela" class="p-0 text-center" v-model="parcela.codigoParcela" :disabled="setInputFieldDisabled"  required type="text"></b-form-input></td>   

										<td><b-form-input id="data-parcela-emissao" class="p-0 text-center" v-model="parcela.emissao" :disabled="setInputFieldDisabled"  required type="text"></b-form-input></td>      

										<td><b-form-input id="data-parcela-vencimento" class="p-0 text-center" v-model="parcela.vencimento" :disabled="setInputFieldDisabled"  required type="text"></b-form-input></td>

										<td><v-money :disabled="setInputFieldDisabled"  id="valor-parcela" type="text" class="p-0 form-control text-center" v-model="listaParcelas[index].valorParcela" v-bind="money" number trim>{{ parcela.valorParcela }}</v-money></td>         
									</tr>
									</tbody>
								</table>								
							</div>
						</div>
						<b-row>
							<b-col cols="6" class="mx-auto d-flex justify-content-end">
								<h2>Valor Total:</h2>
							</b-col>
							<b-col cols="5" class="ml-auto mr-4">
								<v-money disabled type="text" class="p-0 form-control text-center" :value="valorTotalParcelas" v-bind="money" number trim>{{ valorTotalParcelas }}</v-money>
							</b-col>
						</b-row>
						<b-row class="m-3">
							<b-col>
								<b-alert :show="alertValorTotal" dismissible	variant="danger">O valor total das parcelas é menor que o valor total líquido estipulado.</b-alert> 
							</b-col>
						</b-row>
						<b-row class="m-3 mb-5">
							<b-col>
								<label for="observacoes">Observações</label>
								<textarea id="observacoes" name="observacoes" class="form-control" maxlength="150" v-model="observacoes"></textarea>
							</b-col>							
						</b-row>

						<b-row>
							<b-col class="d-flex justify-content-start">
								<b-button @click="limparParcelamento" class="text-uppercase text-center mx-3" variant="outline-danger"><i class="fas fa-trash-alt"></i> Excluir</b-button>
							</b-col> 
							<b-col class="d-flex justify-content-end">
								<b-button class="text-uppercase text-center mx-3"  variant="outline-secondary" @click="editarParcela"><i class="fas fa-pencil-alt"></i> Editar</b-button>
								<b-button :disabled="!setInputFieldDisabled" @click="concluirParcelamento" class="text-uppercase text-center mx-3" variant="primary"><i class="fas fa-copy"></i> Concluir</b-button>
							</b-col>
						</b-row>						
					</div>
						</b-col>	
					</b-row>	
				</b-form>
			</b-container>
		</div>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'
import PageTitle from '../../components/template/PageTitle'
const moment = require('moment');

export default {
  name: 'NovaContaPagar',
  components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},

	data() {
		return {
			codigoParcelamento: '',
			supplierSelected: '',
			supplierList: [],
			documentTypeSelected: '',
			documentTypeList: [],
			coinSelected: '',
			coinList: [],
			accountSelected: '',
			accountList: [],
			dataEmissao: '',
			dataVencimento: '',
			dataApropriacao: '',
			valorBruto: 0,
			valorDesconto: 0,
			valorLiquido: 0,
			qtdParcelas: 1,
			valorParcela: 0,
			periodoDias: 1,
			numeroParcela: 1,
			listaParcelas: [],
			actionMode: false,
			observacoes: '',
			alertValorTotal: false,
			money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
		}
	},	

	watch: {
		dataEmissao() {
			if (this.dataEmissao && this.dataEmissao.length  === 10) {
				this.dataEmissao = moment(this.dataEmissao, "DD-MM-YYYY").format('YYYY-MM-DD')
				const flagDateValidator = moment(this.dataEmissao).isValid()
				if (flagDateValidator === false) {
					alert (`A data de emissão está incorreta. Por favor, preencha de forma correta.`)
				} else {
					this.dataEmissao = moment(this.dataEmissao).format('DD/MM/YYYY')
				}
			}
		},
		dataVencimento() {
			if (this.dataVencimento && this.dataVencimento.length  === 10) {
				this.dataVencimento = moment(this.dataVencimento, "DD-MM-YYYY").format('YYYY-MM-DD')
				const flagDateValidator = moment(this.dataVencimento).isValid()
				if (flagDateValidator === false) {
					alert (`A data de vencimento está incorreta. Por favor, preencha de forma correta.`)
				} else {
					this.dataVencimento = moment(this.dataVencimento).format('DD/MM/YYYY')
				}
			}
		}
	},
	
	computed: {
		calculaValorLiquido() {
			return this.valorLiquido = parseFloat(this.valorBruto, 10) - parseFloat(this.valorDesconto, 10)
		},
		calculaValorParcela() {
			return this.valorParcela = parseFloat(this.calculaValorLiquido, 10) / parseFloat(this.qtdParcelas, 10)
		},
		setInputFieldDisabled() { 
      if(this.actionMode === false) { return true } else { return false } 
    },
		valorTotalParcelas() {
			let totalParcelas = 0
			for (let i=0; i < this.listaParcelas.length; i++) {
				totalParcelas = parseFloat(totalParcelas, 10) + parseFloat(this.listaParcelas[i].valorParcela, 10)
			}		
			return totalParcelas
		}
	},

	methods: {
		gerarParcelamento() {
			this.listaParcelas = []
			if (!this.codigoParcelamento || this.codigoParcelamento.length === 0) {
				alert('O campo código da parcela é obrigatório')
				return false
			}
			if (!this.dataEmissao || this.dataEmissao.length < 10 ) {
				alert('O campo data de emissão da parcela é obrigatório')
				return false
			}
			if (!this.dataVencimento || this.dataVencimento.length < 10) {
				alert('O campo data de vencimento da parcela é obrigatório')
				return false
			}
			if (!this.valorParcela || this.valorParcela.length === 0) {
				alert('O campo valor da parcela da parcela é obrigatório')
				return false
			}
			let dataControle = moment(this.dataVencimento, "DD-MM-YYYY").format('YYYY-MM-DD')
			for (let i = 1; i <= this.qtdParcelas; i++) {
				const payload = {
					codigoParcela: `${this.codigoParcelamento}-${i}`,
					numeroParcela: i,
					emissao: this.dataEmissao,
					vencimento: moment(dataControle).format('DD/MM/YYYY'),
					valorParcela: this.valorParcela
				}
				this.listaParcelas.push(payload)
				dataControle = moment(dataControle).add(this.periodoDias, 'days').format('YYYY-MM-DD')
			}
		},

		async concluirParcelamento() {
			if (this.valorTotalParcelas < this.valorLiquido) {
				this.alertValorTotal = true
				return false
			} else {
				let payload = []
				for (let i = 0; i < this.listaParcelas.length; i++) {
					let parcela = {
					codigo: this.codigoParcelamento,
					idFornecedor: this.supplierSelected.value,
					idTipoDocumento: this.documentTypeSelected.value,
					idContaCorrente: this.accountSelected.value,
					idMoeda: this.coinSelected.value,
					dataEmissao: this.listaParcelas[i].emissao,
					dataVencimento: this.listaParcelas[i].vencimento,
					numeroParcela: this.listaParcelas[i].numeroParcela,
					valorParecla: this.listaParcelas[i].valorParcela,
					valorTotal: this.valorLiquido,
					observacoes: this.observacoes,
					status: 'ABERTA'
					}
					payload.push(parcela)
				}
				console.log('payload')
				console.log(payload)
				this.alertValorTotal = false
			}
		},
		
		editarParcela() {
			if (this.actionMode === true) {
				for (let i=0; i < this.listaParcelas.length; i++) {
					if (this.listaParcelas[i].codigoParcela.length === 0) {
						this.listaParcelas[i].codigoParcela = `${this.codigoParcelamento}-${i+1}`
					} 
					if (this.listaParcelas[i].emissao.length === 0) {
						this.listaParcelas[i].emissao = this.dataEmissao
					} else {
						let dateValidation = moment(this.listaParcelas[i].emissao, "DD-MM-YYYY").format('YYYY-MM-DD')
						const flagValidator = moment(dateValidation).isValid();
						if (flagValidator === false) {
							alert (`Campo data de emissão da parcela ${this.codigoParcelamento}-${i+1} não está preenchido de forma correta. Por favor, preencha de forma correta.`)
							return true
						} else {
							this.listaParcelas[i].emissao = moment(dateValidation).format('DD/MM/YYYY')
						}
					}
					if (this.listaParcelas[i].vencimento.length === 0) {						
						alert (`Campo data de vencimento da parcela ${this.codigoParcelamento}-${i+1} não preenchido. Por favor, realize o preenchimento da data.`)
						return true
					} else {
						let dateValidation = moment(this.listaParcelas[i].vencimento, "DD-MM-YYYY").format('YYYY-MM-DD')
						const flagValidator = moment(dateValidation).isValid();
						if (dateValidation === false) {
							alert (`Campo data de vencimento da parcela ${this.codigoParcelamento}-${i+1} não está preenchido de forma correta. Por favor, preencha de forma correta.`)
							return true
						} else {
							this.listaParcelas[i].vencimento = moment(dateValidation).format('DD/MM/YYYY')
						}
					}	
					if (this.listaParcelas[i].valorParcela === 0) {
						this.listaParcelas[i].valorParcela = this.valorParcela
					}
				}
			}
			return this.actionMode = !this.actionMode
		},

		limparParcelamento() {
			this.listaParcelas = []
		}
	}
}
</script>

<style scoped>
  .btn-new-register {
    position: relative;
    margin-left:-30px;
  }
	.parcelamento-group {
		border-right: 2px solid rgb(185, 185, 185);
	}
</style>