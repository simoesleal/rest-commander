<template>
	<div>
		<b-container>
			<page-title icon="fas fa-file-medical" main="Entrada de Produtos"></page-title> 

			<!-- ABA 1 -->
			<template v-if="stageOne === true">
				<b-row>
					<b-col>
						<h1 class="h3 mr-5">Selecione o Fornecedor</h1>
					</b-col>
					<b-col>
						<template v-if="listOfProviders.length > 0">
							<div class="d-flex justify-content-end">
								<router-link :to="{ name: 'CadastrarFornecedor', params: { actionMode:'save' }}">
										<b-button class="btn-sm" variant="outline-dark"><i class="fas fa-truck"></i> Cadastrar Fornecedor</b-button>
								</router-link>								
							</div>
						</template>
					</b-col>
				</b-row>
				
				<b-row class="mt-3">
					<b-col cols="6">
						<label>Fornecedor</label>
						<b-input-group>
							<b-form-input v-model="searchProviderName" placeholder="Exemplo: Mercado"></b-form-input>
							<b-input-group-append>
								<b-button variant="outline-secondary" @click="getProvider"><i class="fas fa-search"></i> Buscar</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-col>
					<b-col cols="6">
						<label>Documento (CNPJ / CPF)</label>
						<b-input-group>
							<b-form-input v-model="searchProviderDoc" placeholder="Exemplo: 11.111.111/0001-00"></b-form-input>
							<b-input-group-append>
								<b-button variant="outline-secondary" @click="getProvider"><i class="fas fa-search"></i> Buscar</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-col>
				</b-row>
				<template v-if="searchStatusFornecedor === 400">
          <b-alert class="mt-3 alert-link" variant="warning" show dismissible>Nenhum Fornecedor encontrado.</b-alert> 
        </template>	
				<b-row>
					<div class="mt-3" v-if="listOfProviders.length > 0">
						<b-table
							class="text-center"
							selectable
							select-mode="single"
							hover 
							bordered
							sticky-header						
							@row-selected="onRowSelectedProvider"
							:items="listOfProviders"
							:fields="fieldsProvider">
							<template  v-slot:cell(selectedProvider)="{ rowSelected }">
								<template v-if="rowSelected">
									<span aria-hidden="true">&check;&check;</span>
									<span class="sr-only">Selected</span>
								</template>
								<template v-else>
									<span aria-hidden="true">&nbsp;</span>
									<span class="sr-only">Not selected</span>
								</template>
							</template>
						</b-table>
        	</div>
				</b-row>
				<b-row class="d-flex justify-content-end mt-5">
					<b-button variant="outline-secondary" @click="changeStage(2)">Próximo <i class="fas fa-angle-right"></i></b-button>
				</b-row> 
			</template>

			<!-- ABA 2 -->
			<template v-else-if="stageTwo === true">
				<b-row>
					<b-col>
						<h1 class="h3 mr-5">Selecione os Produto</h1>
					</b-col>
					<b-col>
						<template v-if="listOfProviders.length > 0">
							<div class="d-flex justify-content-end">
								<router-link :to="{ name: 'CadastrarProduto', params: { actionMode:'save' }}">
										<b-button class="btn-sm" variant="outline-dark"><i class="fas fa-hamburger"></i> Cadastrar Produto</b-button>
								</router-link>								
							</div>
						</template>
					</b-col>
				</b-row>
				<b-row class="mt-3">
					<b-col>
						<label>Produto</label>
						<b-input-group>
							<b-form-input v-model="searchProductName" placeholder="Exemplo: Mercado"></b-form-input>
							<b-input-group-append>
								<b-button variant="outline-secondary" @click="getProduct"><i class="fas fa-search"></i> Buscar</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-col>
				</b-row>
				<template v-if="searchStatusProduto === 400">
          <b-alert class="mt-3 alert-link" variant="warning" show dismissible>Nenhum Produto encontrado.</b-alert> 
        </template>
				<b-row>
					<div class="mt-3 p-3" v-if="listOfProducts.length > 0">
						<b-table
							class="text-center"
							selectable
							select-mode="multi"
							hover 
							bordered
							fixed
							sticky-header					
							@row-selected="onRowSelectedProduct"
							:items="listOfProducts"
							:fields="fieldsProduct">
							<template  v-slot:cell(selectedProduct)="{ rowSelected }">
								<template v-if="rowSelected">
									<span aria-hidden="true">&check;&check;</span>
									<span class="sr-only">Selected</span>
								</template>
								<template v-else>
									<span aria-hidden="true">&nbsp;</span>
									<span class="sr-only">Not selected</span>
								</template>
							</template>
						</b-table>
						<b-row class="d-flex justify-content-end mt-5 mr-2">
							<b-button @click="adicionarProductsSelect" variant="primary"><i class="fas fa-plus"></i> Adicionar</b-button>
						</b-row>						
        	</div>
				</b-row>
				<hr>
				<b-row v-if="listProductsSelected.length > 0">
					<h1 class="h3 mt-3 ml-3">Produtos da Nota</h1>
				</b-row>
				<b-row class="mt-2">
					<template v-if="listProductsSelected.length > 0">
						<b-col class="table-responsive text-center">
							<table class="table table-hover">
								<thead>
									<tr>
										<th class="text-center" scope="col">Produto</th>
										<th class="text-center" scope="col">Descrição</th>
										<th class="text-center" scope="col">Qtd Comprada</th>
										<th class="text-center" scope="col">Valor Unitário</th>
										<th class="text-center" scope="col">Valor Total</th>
										<th class="text-center" scope="col">Ações</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(produto, index) in listProductsSelected" :key="index">
										<td><b-form-input class="border text-center" v-model="produto.nomeProduto" type="text" readonly trim></b-form-input></td>
										<td><b-form-input class="border text-center" v-model="produto.descricaoProduto" type="text" readonly trim></b-form-input></td>
										<td><b-form-input class="border text-center" v-model="produto.qtdCompra" type="text" number trim></b-form-input></td>
										<td><v-money class="border-0 form-control text-center" v-model="produto.valorUnitarioCompra" placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
										<td><v-money class="border-0 form-control text-center" :value="parseFloat(produto.valorUnitarioCompra) * parseFloat(produto.qtdCompra)" readonly placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
										<td><b-button @click="deleteProductFromList(index)" class="mr-5"><i class="fas fa-times"></i></b-button>
										</td>
									</tr>
								</tbody>
							</table>
						</b-col>
					</template>
				</b-row>
				<b-row>
					<b-col class="mt-5">
						<b-button v-if="listProductsSelected.length > 0" variant="outline-dark" class="mr-3" @click="clearProductSelectedList"><i class="fas fa-broom"></i> Limpar</b-button>						
					</b-col>
					<div  class="d-flex justify-content-end mt-5">
						<b-col>
							<b-button class="mr-2" variant="outline-secondary" @click="backStage(1)"><i class="fas fa-angle-left"></i> Anterior</b-button>
							<b-button variant="outline-secondary" @click="changeStage(3)">Próximo <i class="fas fa-angle-right"></i></b-button>
						</b-col>
					</div>
				</b-row>
			</template>

			<!-- ABA 3 -->
			<template v-else-if="stageThree === true">
				<b-row>
					<b-col>
						<h1 class="h3 mr-5">Resumo Nota de Compra</h1>
					</b-col>
				</b-row>
				<b-row class="mt-3">
					<b-col>
						<h1 class="h4 mr-5">Informações Fornecedor</h1>
					</b-col>
				</b-row>
				<b-row>
					<b-form class="form-panel mb-3">
						<b-form-group
							id="informacoes-basicas"
							description="">
								<b-form-row>
									<b-col cols="12" sm="9">
										<label>CPF / CNPJ</label>
										<the-mask id="provider-cpfCnpj" type="text" class="form-control mb-3" v-model.trim="selectedProvider[0].cpfCnpj" :mask="['###.###.###-##', '##.###.###/####-##']" :masked="false" placeholder="Exemplo: 11.111.111/1111-11" :required="true" readonly/>
									</b-col>
										<b-col cols="12" sm="3">
										<label>Tipo de Fornecedor</label>
										<b-form-input class="mb-3" v-model="selectedProvider[0].tipoFornecedor" required type="text" readonly></b-form-input>
									</b-col>
								</b-form-row>
								<b-form-row>
									<label>Nome Fantasia</label>
									<b-form-input id="provider-nomefantasia" class="mb-3" v-model="selectedProvider[0].nomeFantasia" required type="text" placeholder="Exemplo: Empresa Fantasia" readonly></b-form-input>
									<label>Razão Social</label>
									<b-form-input id="provider-razaoSocial" class="mb-3" v-model="selectedProvider[0].razaoSocial" required type="text" placeholder="Exemplo: Empresa Séria SA LTDE" readonly></b-form-input>
								</b-form-row>
								<b-form-row>
									<b-col cols="12" sm="6">
										<label>Telefone</label>
										<the-mask id="provider-phone" type="text" class="form-control mb-3" v-model.trim="selectedProvider[0].telefone" :mask="['+## (##) ####-####']" :masked="false" placeholder="Exemplo: +55 (45) 3025-1144" :required="true" readonly/>
									</b-col>
									<b-col cols="12" sm="6">
										<label>Celular</label>
										<the-mask id="provider-cellphone" type="text" class="form-control mb-3" v-model.trim="selectedProvider[0].celular" :mask="['+## (##) #####-####']" :masked="false" placeholder="Exemplo: +55 (45) 98404-5443" :required="true" readonly/>
									</b-col>
								</b-form-row>	
								<b-form-row>
									<label>E-mail</label>
									<b-form-input id="provider-email" class="mb-3" v-model="selectedProvider[0].email" type="email" placeholder="Exemplo: simoeslealneto@gmail.com" readonly></b-form-input>
								</b-form-row>	
						</b-form-group>
					</b-form>
				</b-row>
				<b-row class="mt-3">
					<b-col>
						<h1 class="h4 mr-5">Produtos</h1>
					</b-col>
				</b-row>
				<b-row class="mt-2">
					<template v-if="listProductsSelected.length > 0">
						<b-col class="table-responsive text-center form-panel">
							<table class="table table-bordeless">
								<thead>
									<tr>
										<th class="text-center" scope="col">Produto</th>
										<th class="text-center" scope="col">Descrição</th>
										<th class="text-center" scope="col">Qtd Comprada</th>
										<th class="text-center" scope="col">Valor Unitário</th>
										<th class="text-center" scope="col">Valor Total</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(produto, index) in listProductsSelected" :key="index">
										<td><b-form-input class="border text-center" v-model="produto.nomeProduto" type="text" readonly trim></b-form-input></td>
										<td><b-form-input class="border text-center" v-model="produto.descricaoProduto" type="text" readonly trim></b-form-input></td>
										<td><b-form-input class="border text-center" v-model="produto.qtdCompra" type="text"  readonly number trim></b-form-input></td>
										<td><v-money class="border-0 form-control text-center" v-model="produto.valorUnitarioCompra" readonly placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
										<td><v-money class="border-0 form-control" :value="parseFloat(produto.valorUnitarioCompra) * parseFloat(produto.qtdCompra)" readonly placeholder="Exemplo: R$ 0.00" required v-bind="money"></v-money></td>
									</tr>
								</tbody>
							</table>
						</b-col>
					</template>
				</b-row>
				<b-row class="mt-4">
					<b-col>
						<h1 class="h4 mr-5">Informações complementares da Nota</h1>
					</b-col>
				</b-row>
				<b-row>
					<b-form class="form-panel">		
						<b-form-group
							id="informacoes-endereco"
							description="*Campos obrigatórios">								
								<b-form-row>
									<b-col cols="12" sm="6">
										<label>Número*</label>
										<b-form-input v-model="numeroNota" id="account-id" class="mb-3" type="text" placeholder="Exemplo: 00.000.001"></b-form-input>
									</b-col>
									<b-col cols="12" sm="6">
										<label>Série*</label>
										<b-form-input v-model="serieNota" id="account-id" class="mb-3" type="text" placeholder="Exemplo: 001"></b-form-input>
									</b-col>
								</b-form-row>
								<b-form-row  class="mt-3">
									<b-col cols="4">
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
									<b-col cols="4">
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
									<b-col cols="4">
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
								<b-form-row class="mt-3">
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
								<b-form-row>
									<b-col>
										<label for="observacoes">Observações</label>
										<textarea id="observacoes" name="observacoes" class="form-control" maxlength="150" v-model="observacoes"></textarea>
									</b-col>	
								</b-form-row>
						</b-form-group>		
					</b-form>					
				</b-row>
				<div class="mt-5">
					<b-row>
						<b-col>
							<span class="h4 text-uppercase">Valor total da compra - </span>
							<v-money disabled class="border-0 h3 valor-total-compra" type="text" required placeholder="Exemplo: R$ 0.00" :value="calculaTotalNota" v-bind="money" trim></v-money>
						</b-col>
					</b-row>
				</div>
				<b-row>
					<b-col class="d-flex justify-content-end mt-5">
						<b-button class="mr-2" variant="outline-secondary" @click="backStage(2)"><i class="fas fa-angle-left"></i> Anterior</b-button>
						<b-button variant="primary" @click="concluirNotaEntrada"><i class="fas fa-check-double"></i> Concluir</b-button>
					</b-col> 
				</b-row>
			</template>

			<template v-if="stageOne === true">
				<b-col cols="1" class="d-flex justify-content-start mt-5 btn-voltar">
					<div @click="backOnePage">
							<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
							<div class="text-uppercase font-300">Voltar</div>
					</div>
				</b-col>
			</template>
		</b-container>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'

export default {
	name: 'NovaEntradaProduto',
	components: {
		'page-title': PageTitle,
		TheMask,
		'v-money': Money
	},

	data() {
		return {
			stageOne: true,
			stageTwo: false,
			stageThree: false,
			searchStatusFornecedor: 0,
			searchStatusProduto: 0,
			provider: {
				id: 0,
				typeProvider: '',
				cpfCnpj: '',
				nomeFantasia: '',
				razaoSocial: '',				
			},
			providerTemp: {
				id: 0,
				typeProvider: '',
				cpfCnpj: '',
				nomeFantasia: '',
				razaoSocial: '',				
				telefone: '',
				celular: '',
			},
			orderNumber: '',
			orderSerial: '',
			typeOfPayment: '',
			totalValue: 0,
			searchProviderName: '',
			searchProviderDoc: '',
			listOfProviders: [],
			selectedProvider: [],
			cadastroIncompleto: false,
			listOfProducts: [],
			searchProductName: '',
			selectedProduct: [],
			listProductsSelected: [],
			formaPagamentoSelected: '',
			formasDePagamento: [],
			documentTypeSelected: '',
			documentTypeList: [],
			accountSelected: '',
			bankAccountList: [],
			coinSelected: '',
			coinList: [],
			numeroNota: '',
			serieNota: '',
			dataEmissao: '',
			dataVencimento: '',
			dataApropriacao: '',
			observacoes: '',
			fieldsProvider: [
				{ key: 'selectedProvider', label: 'Selecione' },
        { key: 'nomeFantasia', label: 'Nome Fantasia' },
        { key: 'razaoSocial', label: 'Razão Social' },
        { key: 'cpfCnpj', label: 'Documento' },
        { key: 'email', label: 'Email' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'celular', label: 'Celular' },
      ],
			fieldsProduct: [
				{ key: 'selectedProduct', label: 'Selecione' },
        { key: 'nomeProduto', label: 'Nome Produto' },
        { key: 'descricaoProduto', label: 'Descrição' },
        { key: 'qtdAtual', label: 'Qtd Atual' },
        { key: 'nomeUnidade', label: 'Unidade' }
      ],
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

	computed: {
		calculaTotalNota() {
			let totalNota = 0
			for (let i = 0; i < this.listProductsSelected.length; i++) {
				totalNota = parseFloat(totalNota) + (parseFloat(this.listProductsSelected[i].valorUnitarioCompra) * parseFloat(this.listProductsSelected[i].qtdCompra))
			}
			this.totalValue = totalNota
			return  parseFloat(totalNota)
		}
	},

	methods: {
		backOnePage() {
      this.$router.back()
    },
		onRowSelectedProvider(items) {
      this.selectedProvider = items
		},
		onRowSelectedProduct(items) {
      this.selectedProduct = items
		},

		changeStage(stage) {	
			if (stage === 1) { 
				this.stageOne = true, this.stageTwo = false, this.stageThree = false	
			} else if (stage === 2) {
				if (this.selectedProvider.length > 0) {
					this.stageOne = false, this.stageTwo = true, this.stageThree = false	
				} else {
					alert('Selecione um fornecedor para prosseguir com o processo de entrada de produtos.')
				}
			} else if (stage === 3) {
				if (this.listProductsSelected.length > 0) {
					for (let i = 0; i < this.listProductsSelected.length; i++) {
						if (!this.listProductsSelected[i].qtdCompra || this.listProductsSelected[i].qtdCompra <= 0) {
							alert('Há produtos com a quantidade comprada menor que 1. Por favor, informe a quantidade corretamente.')
							return
						}
						if (!this.listProductsSelected[i].valorUnitarioCompra || this.listProductsSelected[i].valorUnitarioCompra <= 0) {
							alert('Há produtos com o valo unitário inválido. Por favor, informe a quantidade corretamente.')
							return
						}
					}
					this.stageOne = false, this.stageTwo = false, this.stageThree = true	
					this.getFormasPagamento()
					this.getInfos()
				} else {
					alert('Selecione ao menos um produto para prosseguir com o processo de entrada de produtos.')
				}
			}
		},
		backStage(stage) {
			if (stage === 1) { 
				this.stageOne = true, this.stageTwo = false, this.stageThree = false	
			} else if (stage === 2) {
				this.stageOne = false, this.stageTwo = true, this.stageThree = false	
			} else if (stage === 3) {
				this.stageOne = false, this.stageTwo = false, this.stageThree = true	
			}
		},

		getProvider () {
			this.clearReactiveData()
      if (this.searchProviderName.length === 0 && this.searchProviderDoc.length === 0) {
        this.getProvidersList()
      } else {
				if (this.searchProviderDoc.length > 0 && this.searchProviderName.length > 0) {
					this.getProviderByDoc(this.searchProviderDoc)
				} else {
					if (this.searchProviderName.length > 0) {
        		this.getProviderByName(this.searchProviderName)
					} else if (this.searchProviderDoc.length > 0) {	
						this.getProviderByDoc(this.searchProviderDoc)				
					}
				}
			}	
    },

    async getProvidersList () {
      let response
      try {
        response = await RestConnection.get('fornecedores/consultar/fornecedor')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Fornecedores.")
          }
      }
      this.listOfProviders = response.data.conteudo
    },

    async getProviderByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('fornecedores/consultar/fornecedor/razao-social/' + searchItem)
					if (response.data.conteudo.length > 0) {
            this.listOfProviders = response.data.conteudo
          } else {
            this.searchStatusFornecedor = 400
          }
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Fornecedor com este nome encontrado.')
            }
        }
      },

    async getProviderByDoc (searchItem) {
      let response
      try {
          response = await RestConnection.get('fornecedores/consultar/fornecedor/documento/' + searchItem)
					if (response.data.conteudo.length > 0) {
            this.listOfProviders = response.data.conteudo
          } else {
            this.searchStatusFornecedor = 400
          }	
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Fornecedor com este nome encontrado.')
            }
        }        
		},

		getProduct () {
			this.clearReactiveData()
      if (this.searchProductName.length === 0) {
        this.getProductList()
      } else {
        this.getProductByName(this.searchProductName)
      }
    },

    async getProductList () {
      let response
      try {
        response = await RestConnection.get('produtos/consultar/produto/')
				if (response.data.conteudo.length > 0) {
            this.listOfProducts = response.data.conteudo
				} else {
					this.searchStatusProduto = 400
				}	
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível buscar a lista de Produtos.')
          }
      }
      
    },

    async getProductByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('produtos/consultar/produto/descricao/' + searchItem)
					if (response.data.conteudo.length > 0) {
            this.listOfProducts = response.data.conteudo
				} else {
					this.searchStatusProduto = 400
				}
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Produto com este nome encontrado.')
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
			}
		},
		async getInfos() {
			let response, supplierList, documentTypeList, bankAccountList, coinList
			try {
				response = await RestConnection.get('contas-a-pagar/buscar/informacoes/cadastrais')
				documentTypeList = response.data.conteudo.documentTypeList			 
				bankAccountList = response.data.conteudo.bankAccountList			 
				coinList = response.data.conteudo.coinList	

				for (let i = 0; i < documentTypeList.length; i++) {
					this.documentTypeList.push({value: documentTypeList[i].id, text: `${documentTypeList[i].tipoDocumento}`})
				}

				for (let i = 0; i < bankAccountList.length; i++) {
					this.bankAccountList.push({value: bankAccountList[i].id, text: `${bankAccountList[i].contaBancaria} / ${bankAccountList[i].agencia}-${bankAccountList[i].digitoAgencia} / ${bankAccountList[i].numeroConta}-${bankAccountList[i].digitoConta}`})
				}

				for (let i = 0; i < coinList.length; i++) {
					this.coinList.push({value: coinList[i].id, text: `${coinList[i].simbolo} - ${coinList[i].nomeMoeda}`})
				}
			} catch (error) {
				alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
			}
		},

		async concluirNotaEntrada() {
			let response
			if (!this.documentTypeSelected || !this.accountSelected || !this.coinSelected) {
				alert('Há campos obrigatórios não preenchidos')
			} else {				
				let parameters = {
					numeroNota: this.numeroNota,
					serieNota: this.serieNota,
					totalValue: this.totalValue,
					description: this.observacoes,
					dataEmissao: this.dataEmissao,
					dataVencimento: this.dataVencimento,
					dataApropriacao: this.dataApropriacao,
					idFornecedor: this.selectedProvider[0].id,
					idTipoDocumento: this.documentTypeSelected.value,
					idContaBancaria: this.accountSelected.value,
					idMoeda: this.coinSelected.value,
					listaProdutos: this.listProductsSelected,
				}
				try {
					response = await RestConnection.post('estoque/nova-entrada-compra/', parameters)
					if (response.data.status === 200) {
						alert('Nota de entrada lançada com sucesso!')
						this.backOnePage()
					}
				} catch (exception) {
					if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
						return alert(exception.response.data.mensagem)
					} else {
						return alert('Não foi possível lançar essa nota de entrada. Por favor, tente novamente.')
					}  				
				}
			}
		},

		adicionarProductsSelect() {
			for (let i = 0; i < this.selectedProduct.length; i++) {
				this.listProductsSelected.push(this.selectedProduct[i])
			}
		},

		deleteProductFromList(index) {
			this.listProductsSelected.splice(index, 1)
		},

		clearProductSelectedList() {
			this.listProductsSelected = []
		},

		initCadastroIncompleto() {
			this.cadastroIncompleto = true
			this.listOfProviders = []
			this.selectedProvider = []
		},

		cancelProviderRegister() {
			this.cadastroIncompleto = false
		},

		clearReactiveData() {
      this.listOfProviders = []
			this.listOfProducts = []
      this.searchStatusFornecedor = 0
			this.searchStatusProduto = 0
    }	
	},


}
</script>

<style scoped>
 .valor-total-compra{
	border: none;
	background-color: rgba(255, 255, 255, 0);
	color: #000;
}
</style>