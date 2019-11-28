<template>
	<div>
		<div>
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-copy" main="Detalhes Parcela a Pagar"></page-title> 
          </b-col>
        </b-row>

				<b-form class="form-panel">		
					<b-form-group
						id="informacoes-endereco"
						description="*Campos obrigatórios">
							
							<b-form-row>
								<b-col cols="2">
									<label># Parcela*</label>
									<b-form-input disabled v-model="parcela.numeroParcela" id="parcela-codigo" class="mb-3" type="text"></b-form-input>
								</b-col>
								<b-col cols="4">
									<label>Código*</label>
									<b-form-input disabled v-model="parcela.codigo" id="parcela-id" class="mb-3" type="text" placeholder="Exemplo: LUZ"></b-form-input>
								</b-col>
								<b-col cols="6">
									<label>Situação*</label>
									<b-form-input disabled v-model="parcela.status" id="parcela-situacao" class="mb-3" type="text" placeholder="Exemplo: PAGA"></b-form-input>
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
								<the-mask id="data-emissao" type="text" class="form-control" v-model="parcela.dataEmissao" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Vencimento*</label>
								<the-mask id="data-vencimento" type="text" class="form-control" v-model="parcela.dataVencimento" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
							<b-col cols="12" sm="4">
								<label>Apropriação</label>
								<the-mask id="data-apropriacao" class="form-control" v-model="parcela.dataApropriacao" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/>
							</b-col>
						</b-form-row>								
					</b-form-group>		
				</b-form>
				<b-form class="form-panel mt-3">
					<b-form-group
						id="informacoes-valores"
						description="*Campos obrigatórios">
							<b-form-row>
							<b-col cols="12" sm="2">
								<label>Qtd Parcelas*</label>
								<b-form-input disabled v-model="parcela.qtdParcela" id="qtd-parcelas" class="mb-3" type="text" placeholder="Exemplo: 10"></b-form-input>
							</b-col>
							<b-col cols="12" sm="5">
								<label>Valor Parcela*</label>
								<v-money disabled id="valor-parcela" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 100.00" v-model="parcela.valorParcela" v-bind="money" number trim></v-money>
							</b-col>
							<b-col cols="12" sm="5">
								<label>Valor Líquido*</label>
								<v-money disabled id="valor-liquido" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model="parcela.valorTotal" v-bind="money" number trim></v-money>
							</b-col>
						</b-form-row>								
					</b-form-group>
				</b-form>
				<b-form class="form-panel mt-3">
					<b-form-group
						id="informacoes-adicionais"
						description="*Campos obrigatórios">
							<b-form-row>
								<b-col>
									<label for="observacoes">Observações</label>
									<textarea v-model="parcela.descricao" id="observacoes" name="observacoes" class="form-control" maxlength="150"></textarea>
								</b-col>
							</b-form-row>						
					</b-form-group>
				</b-form>
				<b-container>
					<b-row class="mt-5">
						<b-col class="d-flex justify-content-start btn-voltar  btn-voltar">
							<div @click="backOnePage">
								<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
								<div class="text-uppercase font-300">Voltar</div>
							</div>
						</b-col> 
						<b-col class="d-flex justify-content-end">
							<b-button @click="cancelarParcela" class="text-uppercase text-center mx-2" variant="outline-danger"><i class="fas fa-exclamation"></i> Cancelar Parcela</b-button>
							<b-button @click="baixarParcela" class="text-uppercase text-center mx-2" variant="outline-success"><i class="fas fa-angle-double-down"></i> Baixar Parcela</b-button>
							<b-button @click="alterRecord" class="text-uppercase text-center mx-2" variant="outline-info">Salvar Alteração</b-button>
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
const moment = require('moment');

export default {
  name: 'NovaContaPagar',
  components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},
	props: {
		selectedInstallment: Object,
		actionMode: String
	},
	data() {
		return {
			parcela: {},
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

	mounted() {
		this.getInstallementInfo()
	},

	methods: {
		backOnePage() {
      this.$router.push({ name: 'ContasPagar' })
    },

		getInstallementInfo() {
			this.parcela = this.selectedInstallment
		},

		async alterRecord() {
			let response
			let parameters = {
					id: this.selectedInstallment.id, 
					dataEmissao: this.selectedInstallment.dataEmissao,
					dataVencimento: this.selectedInstallment.dataVencimento,
					dataApropriacao: this.selectedInstallment.dataApropriacao,
					descricao: this.selectedInstallment.descricao,
			}
			try {
				response = await RestConnection.put('parcelas-a-pagar/atualizar/parcela/', parameters)
			} catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível atualizar as informações desta parcela a pagar. Por favor, tente novamente.')
          }
				}				
				alert(response.data.mensagem)
		},

		async baixarParcela() {
			if (this.selectedInstallment.dataApropriacao) {
				let response
				let parameters = {
						id: this.selectedInstallment.id
				}
				try {
					response = await RestConnection.put('parcelas-a-pagar/atualizar/parcela/baixar', parameters)
				} catch (exception) {
						if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
							return alert(exception.response.data.mensagem)
						} else {
							return alert('Não foi possível baixar esta parcela a pagar. Por favor, tente novamente.')
						}
					}				
					alert(response.data.mensagem)
					this.backOnePage()
			} else {
				alert ('Para baixar uma parcela é necessário informar a data de apropriação.')
			}
		},
		async cancelarParcela() {
			let response
			let parameters = {
					id: this.selectedInstallment.id
			}
			try {
				response = await RestConnection.put('parcelas-a-pagar/atualizar/parcela/cancelar', parameters)
			} catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível cancelar esta parcela a pagar. Por favor, tente novamente.')
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
	.parcelamento-group {
		border-right: 2px solid rgb(185, 185, 185);
	}
</style>