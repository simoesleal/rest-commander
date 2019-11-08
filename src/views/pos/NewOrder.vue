<template>
  <div>
    <template >
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="far fa-edit" main="Novo Pedido"></page-title>           
          </b-col>
        </b-row>
				<b-form class="form-panel">
          <b-form-group
            id="selected-table"
            description="*Campos obrigatórios">             
						<label>Mesa</label>
            <b-row>
              <b-col cols="12" md="11">
                <v-select
                  class="mb-3" 
                  v-model="tableSelected"
                  :required="!tableSelected" 
                  label="text" 
                  :options="tableList">
                  <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                    <router-link :to="{ name: 'CadastrarMesa', params: { actionMode:'save' }}">
                      <b-button variant="primary"><i class="fab fa-buromobelexperte"></i></b-button>
                    </router-link>
                  </template>
                </v-select>
              </b-col>  
              <b-col cols="1" class="d-none d-md-inline-block btn-new-register">
                <router-link :to="{ name: 'ConsultarMesas', params: { actionMode:'save' }}">
                  <b-button variant="primary"><i class="fab fa-buromobelexperte fa-sm"></i></b-button>
                </router-link>
              </b-col>  
           </b-row>
          </b-form-group>
        </b-form>
				<b-form class="form-panel mt-3">
          <b-form-group
            id="selected-table"
            description="*Campos obrigatórios">  

            <label>Produto</label>
            <b-row>
              <b-col cols="12" md="11">
                <v-select
                  class="mb-3" 
                  v-model="selectedProduct"
                  :required="!selectedProduct" 
                  label="text" 
                  :options="productList">
                  <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                    <router-link :to="{ name: 'CadastrarProduto', params: { actionMode:'save' }}">
                      <b-button variant="primary"><i class="fas fa-hamburger"></i></b-button>
                    </router-link>
                  </template>
                </v-select>
              </b-col>  
              <b-col cols="1" class="d-none d-md-inline-block btn-new-register">
                <router-link :to="{ name: 'ConsultarProdutos', params: { actionMode:'save' }}">
                  <b-button variant="primary"><i class="fas fa-hamburger fa-sm"></i></b-button>
                </router-link>
              </b-col>
           </b-row>

           <b-row>
             <b-col cols="12">
               <label>Quantidade</label>
               <b-form-input id="quantidade" class="mb-3" v-model="quantity" required type="number"></b-form-input>
             </b-col>
           </b-row>

            <div class="form-row">
              <div class="col-12 col-sm-12 col-md-12">
                <div class="form-group">
                  <label for="informacoes-adicionais">Observação</label>
                  <textarea id="informacoes-adicionais" name="informacoes-adicionais" class="form-control" maxlength="150" v-model="orderObservation"></textarea>
                </div>
              </div>
            </div>

            <b-row>
              <b-col class="d-flex justify-content-end">
                <b-button variant="outline-dark" class="m-1" @click="clearProductOrder"><i class="fas fa-broom"></i> Limpar</b-button>

                <b-button variant="primary" class="m-1" @click="addProductOrder"><i class="fas fa-plus"></i> Adicionar</b-button>
              </b-col>   
            </b-row>

          </b-form-group>
        </b-form>
        <hr>
        <div class="my-5">
          <label class="text-uppercase">Resudo do Pedido</label>
          <b-table responsive hover striped bordered :items="itensPedido" :fields="fields">
          </b-table>
        </div>
        <b-row class="mt-5 p-5">
          <b-col>
            <b-button block variant="outline-success" @click="finishOrder">Finalizar Pedido</b-button>
          </b-col>
        </b-row> 

        <b-row>
          <b-col cols="1" class="d-flex justify-content-start m-3 mt-5 btn-voltar">
            <router-link :to="{ name: 'MapaMesas'}">
              <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
              <div class="text-uppercase font-300">Voltar</div>
            </router-link>
          </b-col>
        </b-row>
      </b-container>	
    </template>
  </div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'

export default {
 name: 'NovoPedido',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			tableSelected: '',
      tableList: [],
			selectedProduct: '',
      productList: [],
      itensPedido: [],
      fields: [
        { key: 'idProduto', label: 'Código', sortable: true},
        { key: 'produto', label: 'Produto', sortable: true},
        { key: 'quantidade', label: 'QTD', sortable: true},
        { key: 'observacao', label: 'Obs', sortable: true},
      ],
      orderObservation: '',
      quantity: 1
		}
	},

  mounted() {
    this.getTables()
    this.getProduct()
  },

  methods: {
    async getTables () {
      let response, tableList
      try {
        response = await RestConnection.get('mesas/consultar/mesas/ocupadas')
        tableList = response.data.conteudo
        for (let i = 0; i < tableList.length; i++) {
					this.tableList.push({value: tableList[i].id, text: `Mesa - ${tableList[i].numero}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Mesas.")
          }
      }
      
    },

    async getProduct () {
      let response, productList
      try {
        response = await RestConnection.get('produtos/consultar/produto/')
        productList = response.data.conteudo
        for (let i = 0; i < productList.length; i++) {
					this.productList.push({value: productList[i].id, text: `${productList[i].nomeProduto} - ${productList[i].descricaoProduto}`})
				}
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível buscar a lista de Produtos.')
          }
      }
      
    },

    addProductOrder() {
      if (this.selectedProduct && this.quantity > 0) {
        let productOrder = {
          idProduto: this.selectedProduct.value,
          produto: this.selectedProduct.text,
          quantidade: this.quantity,
          observacao: this.orderObservation,
        }
        this.itensPedido.push(productOrder)
      } else {
        alert('Selecione um produto!')
      }
    },

    async finishOrder() {
      if (!this.tableSelected) {
        alert('Seleciona uma mesa!')
      } else if (this.itensPedido.length <= 0) {
        alert('Selecione ao menos um produto!')
      } else {
        let response
        let parameters = {
          idMesa: this.tableSelected.value,
          idFuncionario: 1,
          idContaCliente: 2,
          produtos: this.itensPedido
        }     
        try {
          response = await RestConnection.post('pedidos/novo-pedido/', parameters)
          if (response.data.status === 200) {
            alert('Pedido realizado com sucesso!')
            this.backOnePage()
          }
        } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Possível criar este pedido. Por favor, revise seu pedido tente novamente.')
          }          
        }
      }
    },

    backOnePage() {
      this.$router.back(-1)
    },

    clearProductOrder() {
      this.selectedProduct = '',
      this.orderObservation = '',
      this.quantity = 1
    }
  }
}

</script>

<style>

</style>