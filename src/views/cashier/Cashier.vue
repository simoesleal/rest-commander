<template>
	<div>
		<b-container>
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
					<span>Operador: {{caixa.nomeFunc}} {{caixa.sobreFunc}}</span>					
				</b-col>
			</b-row>
			<div class="text-muted">
				<div class="table-response">
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
								<td>0.00</td>
								<td>0.00</td>
								<td>0.00</td>
								<td></td>
							</tr>
							<tr>
								<th class="table-success" scope="row">Dolar (U$)</th>
								<td>0.00</td>
								<td>0.00</td>
								<td>0.00</td>
								<td>U$ 0.00</td>
							</tr>
							<tr>
								<th class="table-success" scope="row">Peso (P$)</th>
								<td>0.00</td>
								<td>0.00</td>
								<td>0.00</td>
								<td>P$ 0.00</td>
							</tr>
							<tr>
								<th class="bg-info" scope="row">Total à Vista</th>
								<td class="bg-info">0.00</td>
								<td class="bg-info">0.00</td>
								<td class="bg-info">0.00</td>
								<td></td>
							</tr>
							<tr>
								<th class="table-success" scope="row">Cartão Crédito</th>
								<td></td>
								<td>0.00</td>
								<td>0.00</td>
								<td></td>
							</tr>
							<tr>
								<th class="table-success" scope="row">Cartão Débito</th>
								<td></td>
								<td>0.00</td>
								<td>0.00</td>
								<td></td>
							</tr>
							<tr>
								<th class="bg-info" scope="row">Total à Prazo</th>
								<td class="bg-info">0.00</td>
								<td class="bg-info">0.00</td>
								<td class="bg-info">0.00</td>
								<td></td>
							</tr>
							<tr>
								<th class="bg-success" scope="row">Total Geral</th>
								<td class="bg-success">0.00</td>
								<td class="bg-success">0.00</td>
								<td class="bg-success">0.00</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<b-row>
				<b-col cols="3">
					<span>Cotação Dolar: {{caixa.cotacaoDolar || 0.00}}</span>
				</b-col>
				<b-col cols="3">
					<span>Cotação Peso: {{caixa.cotacaoPeso || 0.00}}</span>
				</b-col>
			</b-row>

			<b-row>
				<b-col class="d-flex justify-content-end">
					<b-button size="lg" variant="outline-dark" class="m-1" @click="listaFechamentos"><i class="fas fa-check-double"></i> Fechamentos</b-button>
					<b-button size="lg" variant="outline-primary" class="m-1" @click="fecharMesa"><i class="fab fa-buromobelexperte"></i> Fechar Mesa</b-button>
					<b-button size="lg" variant="outline-danger" class="m-1" @click="fecharCaixa"><i class="fas fa-archive"></i> Fechar Caixa</b-button>
				</b-col>   
			</b-row>
		</b-container>
	</div>
</template>

<script>
import PageTitle from '../../components/template/PageTitle'

export default {
 name: 'Caixa',
  components: {
		'page-title': PageTitle
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
				nomeFunc: '',
				sobreFunc: '',
				idCotacaoDolar: 0,
				cotacaoDolar: 0,
				idCotacaoPeso: 0,
				cotacaoPeso: 0,

				fundo: {
					dinheiro: 0,
					dolar: 0,
					peso: 0,
				},
				fechamentos: {
					dinheiro: 0,
					dolar: 0,
					peso: 0,
					cartaoCredito: 0,
					cartaoDebito: 0
				},
				totalEmCaixa: {
					dinheiro: 0,
					dolar: 0,
					peso: 0,
					cartaoCredito: 0,
					cartaoDebito: 0
				},
				totalAVista: {
					fundo: 0,
					fechamentos: 0,
					total: 0,
				},
				totalAPrazo: {
					fundo: 0,
					fechamentos: 0,
					total: 0,
				},
				totalGeral: {
					fundo: 0,
					fechamentos: 0,
					total: 0,
				}
			}
		}
	},

	mounted() {
		this.getInfo()
	},

	methods: {
		getInfo() {
			let parameters = {
				id: "3",
				saldoInicial: "300.00",
				saldoFinal: "3000.00",
				dataHoraInicio: "2019-10-11T03:00:00.000Z",
				dataHoraFim: "2019-10-12T03:00:00.000Z",
				idFunc: "1",
				nomeFunc: "Gustavo",
				sobreFunc: "Machado",
				idCotacao: "3",
				cotacao: "1.539"
			}

			this.caixa = parameters
		},
		async listaFechamentos() {

		},
		async fecharMesa() {

		},
		async fecharCaixa() {

		}
	}

}
</script>

<style scoped>
</style>