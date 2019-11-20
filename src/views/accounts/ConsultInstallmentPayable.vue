<template>
	<div>
		<div>
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-copy" main="Duplitacas a Pagar"></page-title> 
          </b-col>
        </b-row>
				<b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: LUZ"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
					<b-col>
            <router-link :to="{ name: 'NovaContaPagar', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Duplicata</b-button>
            </router-link>
          </b-col>
        </b-row>
			</b-container>
			<b-container v-if="listaParcelas.length > 0">
				<div class="mt-3 table-responsive">
						<table class="table table-bordeless">
							<thead>
								<tr class="text-center">
									<th scoped="col">Código</th>
									<th scoped="col">#Parcela</th>
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
									<td>
										<b-form-input v-model="parcela.codigo" disabled id="parcela-status" class="form-control input-control text-center" type="text"></b-form-input>
									</td>
									<td>
										<b-form-input v-model="parcela.numeroParcela" disabled id="parcela-status" class="form-control input-control text-center" type="text"></b-form-input>
									</td>
									<td><v-money disabled id="valor-parcela" class="form-control input-control text-center" type="text" required placeholder="Exemplo: R$ 1000.00" v-model="parcela.valorParcela" v-bind="money" number trim></v-money></td>
									<td><v-money disabled id="valor-total" type="text" class="form-control input-control text-center" required placeholder="Exemplo: R$ 1000.00" v-model="parcela.valorTotal" v-bind="money" number trim></v-money></td>
									<td><the-mask disabled id="data-emissao" type="text" class="form-control input-control text-center" v-model="parcela.dataEmissao" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/></td>
									<td><the-mask disabled id="data-emissao" type="text" class="form-control input-control text-center" v-model="parcela.dataVencimento" :mask="['####/##/##']" :masked="true" placeholder="Ex:dd/mm/aaaa" :required="true"/></td>
									<td><b-form-input v-model="parcela.status" disabled id="parcela-status" class="form-control input-control text-center" type="text"></b-form-input></td>
									<td>
										<router-link :to="{ name: 'DetalhesParcelaPagar', params: { actionMode:'edit', selectedInstallment: parcela }}">
											<b-button variant="outline-info" class="mt-2 mx-auto"><i class="fas fa-pencil-alt"></i> Editar
											</b-button>
										</router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
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
			listaParcelas: [],
			searchItem: '',
			money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      },
		}
	},

	methods: {
		backOnePage() {
      this.$router.back()
    },

		async getItem() {
			if (this.searchItem.length === 0) {
        this.getInstallmentList()
      } else {
        this.getInstallmentByNumber(this.searchItem)
      }
		},	

		async getInstallmentList () {
      let response
      try {
        response = await RestConnection.get('parcelas-a-pagar/consultar')
				this.listaParcelas = response.data.conteudo
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Parcelas.")
          }
      }
    },

		 async getInstallmentByNumber (searchItem) {
      let response
      try {
					response = await RestConnection.get('parcelas-a-pagar/consultar/identificador/' + searchItem)
					this.listaParcelas = response.data.conteudo
        } catch (exception) {
					if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
						return alert(exception.response.data.mensagem)
					} else {
						return alert('Nenhuma Parcela com este código encontrada.')
					}
        }
      }

	}

}
</script>

<style scoped>
.input-control {
    border: none !important;
		background: #EFEFEF !important;
  }
</style>