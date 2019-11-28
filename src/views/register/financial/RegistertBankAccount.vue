<template>
	<div>
    <template v-if="this.$route.path === '/cadastro-financeiro/cadastrar-conta-bancaria'">
      <page-title icon="fas fa-piggy-bank" main="Cadastrar Conta Bancária"></page-title>  
      <b-form class="form-panel mb-3">
        <b-form-group
          id="informacoes-basicas"
          descrip tion="*Campos obrigatórios">
            <label>Conta*</label>
            <b-form-input id="conta" class="mb-3" v-model="bankAccount.contaBancaria" 
            required 
            type="text" 
            placeholder="Exemplo: Carteira">
            </b-form-input>
            <label>Banco*</label>
              <b-row>
                <b-col cols="11">
                  <v-select
                    class="mb-3" 
                    v-model="selectedBank"
                    :required="!selectedBank" 
                    label="text" 
                    :options="bankList">
                    <template slot="no-options">Desculpe, não há opções correspondentes! Clique aqui para para um novo cadastro 
                      <router-link :to="{ name: 'CadastrarBanco', params: { actionMode:'save' }}">
                        <b-button variant="primary"><i class="fas fa-university"></i></b-button>
                      </router-link>
                    </template>
                  </v-select>
                </b-col>                  
                <b-col cols="1" class="btn-new-register">
                  <router-link :to="{ name: 'ConsultarBanco', params: { actionMode:'save' }}">
                   <b-button variant="primary"><i class="fas fa-university"></i></b-button>
                  </router-link>
                </b-col>  
              </b-row>
            <div class="form-row">
              <div class="col-10 col-sm-10 col-md-6">
                <div class="form-group">
                  <label for="agencia">Agência*</label>
                  <input v-model="bankAccount.agencia" type="text"  id="agencia" name="agencia" class="form-control" placeholder="Ex: 1234" :required="true">
                </div>
              </div>
              <div class="col-1 col-sm-1 col-md-2">
                <div class="form-group">
                  <label for="digito-agencia">Dígito*</label>
                  <input v-model="bankAccount.digitoAgencia" type="text" id="digito-agencia" name="digito-agencia" class="form-control" placeholder="0" :required="true">
                </div>
              </div> 
            </div>   
            <div class="form-row">
						<div class="col-10 col-sm-10 col-md-6">
							<div class="form-group">
								<label for="numero-conta">Conta*</label>
								<input v-model="bankAccount.numeroConta" type="text" id="numero-conta" name="numero-conta" class="form-control" placeholder="Ex: 45678-9" :required="true">
							</div>
						</div> 
						<div class="col-1 col-sm-1 col-md-2">
							<div class="form-group">
								<label for="digito-conta">Dígito*</label>
								<input v-model="bankAccount.digitoConta" type="text" id="digito-conta" name="digito-conta" class="form-control" placeholder="0" :required="true">
							</div>
						</div> 
					</div> 
          </b-form-group>
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

export default {
  name: 'CrudBanks',
  components: {
		'page-title': PageTitle
	},
  props: {
    actionMode: {
      type: String,
      default: 'save'
    },
    selectedBankAccount: Object,
  },
  data() {
    return {
      bankAccount: {
        id: 0,
        contaBancaria: '',
        agencia: '',
        digitoAgencia: '',
        numeroConta: '',
        digitoConta: '',
        idBanco: 0,
        nomeBanco: ''
      },
      selectedBank: '',
      bankList: []
    }
  },

  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },

  mounted() {
    if(this.selectedBankAccount) {
      this.bankAccount = this.selectedBankAccount
      this.selectedBank =  {value: this.bankAccount.idBanco, text: `${this.bankAccount.nomeBanco}`}
    } 
    if (this.selectedBankAccount === null) {
        this.bankList = []
        this.selectedBankAccount = ''
    }
    this.getBank()
  },

  methods: {
    backOnePage() {
      this.$router.back()
    },

    async getBank() {
      let response, bankList
      try {
        response = await RestConnection.get('bancos/consultar/banco')
        bankList = response.data.conteudo			 
        for (let i = 0; i < bankList.length; i++) {
          this.bankList.push({value: bankList[i].id, text: `${bankList[i].banco}`})
        }
      } catch (error) {
        alert("Erro ao carregar informações necessárias para este formulário. Por favor, tente novamente em alguns instântes.")
        this.backOnePage()
      }
    },

    async saveRecord() {
      if (this.selectedBank) {
        let response
        let parameters = {
          id_banco: this.selectedBank.value,
          account: this.bankAccount.contaBancaria,
          agency: this.bankAccount.agencia,
          agencyDigit: this.bankAccount.digitoAgencia,
          accountNumber: this.bankAccount.numeroConta,
          accountNumberDigit: this.bankAccount.digitoConta,
        }
        try {
          response = await RestConnection.post('contas-bancarias/cadastrar/conta-bancaria/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Salvar esta Conta Bancária.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      } else {
        alert('O banco é um campo obrigatório, selecione um banco.')
      }
    },

    async alterRecord() {
      if (this.selectedBank) {
        let response
        let parameters = {
          id: this.bankAccount.id,
          id_banco: this.selectedBank.value,
          account: this.bankAccount.contaBancaria,
          agency: this.bankAccount.agencia,
          agencyDigit: this.bankAccount.digitoAgencia,
          accountNumber: this.bankAccount.numeroConta,
          accountNumberDigit: this.bankAccount.digitoConta,
        }
        try {
          response = await RestConnection.put('contas-bancarias/atualizar/conta-bancaria/', parameters)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Atualizar esta Conta Bancária.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()
      } else {
        alert('O banco é um campo obrigatório, selecione um banco.')
      }
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('contas-bancarias/deletar/conta-bancaria/' + this.bankAccount.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar esta Conta Bancaria.')
            }
        }
        alert(response.data.mensagem)
        this.backOnePage()    
      }  
    }
}
</script>

<style scoped>
  .btn-new-register {
    position: relative;
    margin-left:-30px;
  }
</style>