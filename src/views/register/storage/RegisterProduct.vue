<template>
	<div class="register-quotation">
    <template  v-if="this.$route.path === '/cadastro-estoque/cadastrar-produto'">
      <page-title icon="fas fa-hamburger" main="Cadastrar Produto"></page-title>  
        <b-form class="form-panel mb-3">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
            <b-form-row>
              <label>Produto*</label>
              <b-form-input id="produto-nome" class="mb-3" v-model="product.nomeProduto" required type="text" placeholder="Exemplo: Arroz"></b-form-input>
              <label>Detalhes</label>
              <b-form-input id="produto-detalhes" class="mb-3" v-model="product.descricaoProduto" required type="text" placeholder="Exemplo: Integral"></b-form-input>
					  </b-form-row>           
            <label>Grupo Produto*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="selectedProductGroup"
                    :required="!selectedProductGroup" 
                    label="text" 
                    :options="productGroupList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarGrupoProdutos', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-hamburger"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarGrupoProdutos', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-hamburger fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
              <label>Unidade de Medida*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="selectedUnit"
                    :required="!selectedUnit" 
                    label="text" 
                    :options="unitList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarUnidadeMedida', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-weight-hanging"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarUnidadeMedida', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-weight-hanging fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
              <label>Grupo Cardápio*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="selectedMenuGroup"
                    :required="!selectedMenuGroup" 
                    label="text" 
                    :options="menuGroupList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarGrupoCardapio', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-bars"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarGrupoProdutos', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-bars fa-sm"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
          </b-form-group>
        </b-form>
        <b-form class="form-panel mb-3" id="informacoes-preco"
				description="*Campos obrigatórios">
          <b-form-row>
            <b-col cols="12">
              <label>Preco de Compra*</label>
              <v-money id="preco-compra" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model.number="product.precoCompra" v-bind="money"></v-money>
            </b-col>
            <b-col cols="12">
              <label>Preco de Venda*</label>
              <v-money id="preco-venda" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model.number="product.precoVenda" v-bind="money"></v-money>
            </b-col>
            <b-col cols="12">
              <label>Preco de Custo*</label>
              <v-money id="preco-custo" type="text" class="mb-3 form-control" required placeholder="Exemplo: R$ 1000.00" v-model.number="product.precoCusto" v-bind="money"></v-money>
            </b-col>
          </b-form-row>
        </b-form>
        <b-form class="form-panel mb-3" id="informacoes-quantidade"
				description="*Campos obrigatórios">
          <b-form-row>
            <b-col cols="12">
              <label>Quantidade Atual*</label>
						  <b-form-input id="preco-compra" class="mb-3" v-model.number="product.qtdAtual" required type="number" placeholder="Exemplo: 15 "></b-form-input>
            </b-col>
            <b-col cols="12">
              <label>Quantidade Máxima*</label>
						  <b-form-input id="preco-compra" class="mb-3" v-model.number="product.qtdMax" required type="number" placeholder="Exemplo: 20 "></b-form-input>
            </b-col>
            <b-col cols="12">
              <label>Quantidade Mínima*</label>
						  <b-form-input id="preco-compra" class="mb-3" v-model.number="product.qtdMin" required type="number" placeholder="Exemplo: 5 "></b-form-input>
            </b-col>
          </b-form-row>
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
    </template>
	</div>
</template>

<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'
import {TheMask} from 'vue-the-mask'
import {Money} from 'v-money'

export default {
  name: 'CrudProdutos',
  components: {
		'page-title': PageTitle,
    TheMask,
		'v-money': Money
	},
  props: {
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedProduct: Object,
  },
  data() {
    return {
      product: {
        id: 0,
				nomeProduto: '',
        descricaoProduto: '',
        precoCompra: 0,
        precoVenda: 0,
        precoCusto: 0,
        qtdAtual: 0,
        qtdMax: 0,
        qtdMin: 0,
        status: 0,
        idGupoProduto: 0,
        idUnidade: 0,
        idGrupoCardapio: 0
      },
			productGroupList: [],
			unitList: [],
      menuGroupList: [],
      selectedProductGroup: '',
      selectedUnit: '',
      selectedMenuGroup: '',

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
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedProduct) {
      this.product = this.selectedProduct
      this.selectedProductGroup = {value: this.product.idGupoProduto, text: `${this.product.nomeGrupo}`}
      this.selectedUnit = {value: this.product.idUnidade, text: `${this.product.nomeUnidade}`}
      this.selectedMenuGroup = {value: this.product.idGrupoCardapio, text: `${this.product.grupoCardapioNome}`}
    } else {
      this.getProductGroupList()
      this.getUnitMeasurementList()
      this.getMenuGroup()
    }
  },

  watch: {
    selectedProductGroup() {
      if (this.selectedProductGroup) this.product.idGupoProduto = this.selectedProductGroup.value
      if (this.selectedProductGroup === null) {
        this.productGroupList = []
        this.selectedProductGroup = ''
        this.getProductGroupList()
      }
    },
    selectedUnit() {
      if (this.selectedUnit) this.product.idUnidade = this.selectedUnit.value
      if (this.selectedUnit === null) {
        this.unitList = [],
        this.selectedUnit = ''
        this.getUnitMeasurementList()
      }
    },
    selectedMenuGroup() {
      if (this.selectedMenuGroup) this.product.idGrupoCardapio = this.selectedMenuGroup.value
      if (this.selectedMenuGroup === null) {
        this.menuGroupList = []
        this.selectedMenuGroup = ''
        this.getMenuGroup()
      }
    },
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    async getProductGroupList () {
      let response, productGroupList
      try {
        response = await RestConnection.get('grupos-produto/consultar/')
        productGroupList = response.data.conteudo
        for (let i = 0; i < productGroupList.length; i++) {
					this.productGroupList.push({value: productGroupList[i].id, text: `${productGroupList[i].nomeGrupo} - ${productGroupList[i].descricao}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Grupo de Produtos.")
          }
          this.backOnePage()
      }
    },

    async getUnitMeasurementList () {
      let response, unitList
      try {
        response = await RestConnection.get('unidade-medida/consultar/')
        unitList = response.data.conteudo
        for (let i = 0; i < unitList.length; i++) {
					this.unitList.push({value: unitList[i].id, text: `${unitList[i].nomeUnidade} - ${unitList[i].abreviatura}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Unidades de Medida.")
          }
          this.backOnePage()
      }
    },

    async getMenuGroup () {
      let response, menuGroupList
      try {
        response = await RestConnection.get('grupos-cardapio/consultar/')
        menuGroupList = response.data.conteudo
        for (let i = 0; i < menuGroupList.length; i++) {
					this.menuGroupList.push({value: menuGroupList[i].id, text: `${menuGroupList[i].nomeGrupo}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Grupos do Cardápio.")
          }
          this.backOnePage()
      }
    },    

    async saveRecord() {
      if (!this.selectedProductGroup.value) {
        alert('O Grupo do Produto é um campo obrigatório. Por favor, selecione um grupo de produto.')
      } else if (!this.selectedUnit.value) {
        alert('A unidade de medida é um campo obrigatório. Por favor, selecione uma unidade de medida.')
      } else {
        let response
        let parameters = {
          name: this.product.nomeProduto,
          description: this.product.descricaoProduto,
          purchase_price: this.product.precoCompra,
          sale_price: this.product.precoVenda,
          cost_price: this.product.precoCusto,
          current_quantity: this.product.qtdAtual,
          max_quantity: this.product.qtdMax,
          min_quantity: this.product.qtdMin,
          status: true,
          id_grupo_produto: this.selectedProductGroup.value,
          id_unidade: this.selectedUnit.value,
          id_grupo_cardapio: this.selectedMenuGroup.value
        }
        try {
          response = await RestConnection.post('produtos/cadastrar/produto/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Salvar este Produto.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      }
    },

    async alterRecord() {
      if (!this.selectedProductGroup.value) {
        alert('O Grupo do Produto é um campo obrigatório. Por favor, selecione um grupo de produto.')
      } else if (!this.selectedUnit.value) {
        alert('A unidade de medida é um campo obrigatório. Por favor, selecione uma unidade de medida.')
      } else {
        let response
        let parameters = {
          id: this.product.id,
          name: this.product.nomeProduto,
          description: this.product.descricaoProduto,
          purchase_price: this.product.precoCompra,
          sale_price: this.product.precoVenda,
          cost_price: this.product.precoCusto,
          current_quantity: this.product.qtdAtual,
          max_quantity: this.product.qtdMax,
          min_quantity: this.product.qtdMin,
          status: true,
          id_grupo_produto: this.selectedProductGroup.value,
          id_unidade: this.selectedUnit.value,
          id_grupo_cardapio: this.selectedMenuGroup.value
        }
        try {
          response = await RestConnection.put('produtos/atualizar/produto/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Atualizar este produto.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      }
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('produtos/deletar/produto/' + this.product.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Produto.')
            }
        }
      alert(response.data.mensagem)
      this.backOnePage()      
    }
  }
}
</script>

<style>

</style>