<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/cidades'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="9">
            <page-title icon="fas fa-city" main="Consultar Cidade"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Foz do Iguaçu"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCidades"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <b-button variant="primary" @click="novaCidade"><i class="fas fa-plus"></i> Nova Cidade</b-button>
          </b-col>
        </b-row>
        <b-alert v-model="alertAlteradoComSucesso" variant="success" dismissible class="m-3 text-left">
          Cidade alterado com sucesso!
         </b-alert>
        <b-alert v-model="alertCriadoComSucesso" variant="success" dismissible class="m-3 text-left">
          Cidade criada com sucesso!
         </b-alert>
        <b-alert v-model="alertDeletadoComSucesso" variant="danger" dismissible class="m-3 text-left">
          Cidade deletada com sucesso!
         </b-alert>
        <b-row class="mt-3" v-if="(listaCidade.length > 0)">
          <b-col>
             <table class="table m-b-2 bg-fff">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Cidade</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(cidade, index) in listaCidade" :key="index">
                    <td>{{ cidade.id }}</td>
                    <td>{{ cidade.nomeCidade }}</td>
                    <td>{{ cidade.uf }}</td>
                    <td>
                      <b-button variant="outline-info" class="mr-5" @click="showModalAlterarCidade(cidade)"><i class="fas fa-pencil-alt"></i> Alterar</b-button>     
                      <b-button variant="outline-danger" @click="deletarCidade"><i class="fas fa-trash-alt"></i> Deletar</b-button>
                    </td>
                    </tr>
                    </tbody>
                  </table>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'Cadastros'}">
            <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
            <div class="text-uppercase font-300">Voltar</div>
          </router-link>
        </div>
      </b-container>
    </template>
  <b-modal ref="modal-nova-cidade" id="adicionar-cidade" title="Adicionar Cidade" size="md" header-bg-variant="light">
    <b-form>
      <label>ID cidade*</label>
      <b-form-input id="id-cidade" class="mb-3" type="text" v-model="idCidade" number placeholder="Exemplo: 01"></b-form-input>
      <label>Cidade*</label>
      <b-form-input id="nome-cidade" class="mb-3" type="text" v-model="nomeCidade" trim placeholder="Exemplo: Foz do Iguaçu"></b-form-input>
      <label>UF*</label>
      <b-form-select class="mb-3" v-model="ufSelected" :options="ufEstados"></b-form-select>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="salvarCidade">Salvar</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalNovaCidade">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campos Obrigatórios!</small></p>
  </b-modal>
  <b-modal ref="modal-alterar-cidade" id="alterar-cidade" title="Alterar cidade" size="md" header-bg-variant="light">
    <b-form>
       <label>ID Cidade*</label>
      <b-form-input id="id-cidade" class="mb-3" type="text" v-model="idCidade" trim placeholder="Exemplo: 01" disabled></b-form-input>
      <label>Cidade*</label>
      <b-form-input id="nome-cidade" class="mb-3" type="text" v-model="nomeCidade" trim></b-form-input>
      <label>UF*</label>
      <b-form-select class="mb-3" v-model="ufSelected" :options="ufEstados"></b-form-select>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="alterarCidade">Salvar Alteração</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalAlterarCidade">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campos Obrigatórios!</small></p>
  </b-modal>
  </div>
</template>


<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudCidade',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      cidadesDB: [
        { id: '01', nomeCidade: 'Foz do IGuaçu', ufID: '15', uf:'PR'},
        ],
      listaCidade: [],
      idCidade: '',
      nomeCidade: '',
      ufEstado: '',
      ufID: '',
      alertAlteradoComSucesso: false,
      alertCriadoComSucesso: false,
      alertDeletadoComSucesso: false,
      ufSelected: null,
      ufEstados: [
        { value: null, text: 'Selecione a UF', disabled: "true" },
        { value: 'AC', text: 'AC' },
        { value: 'AL', text: 'AL' },
        { value: 'AP', text: 'AP' },
        { value: 'AM', text: 'AM' },
        { value: 'BA', text: 'BA' },
        { value: 'CE', text: 'CE' },
        { value: 'DF', text: 'DF' },
        { value: 'ES', text: 'ES' },
        { value: 'GO', text: 'GO' },
        { value: 'MA', text: 'MA' },
        { value: 'MT', text: 'MT' },
        { value: 'MS', text: 'MS' },
        { value: 'MG', text: 'MG' },
        { value: 'PA', text: 'PA' },
        { value: 'PB', text: 'PB' },
        { value: 'PR', text: 'PR' },
        { value: 'PE', text: 'PE' },
        { value: 'PI', text: 'PI' },
        { value: 'RJ', text: 'RJ' },
        { value: 'RN', text: 'RN' },
        { value: 'RS', text: 'RS' },
        { value: 'RO', text: 'RO' },
        { value: 'RR', text: 'RR' },
        { value: 'SC', text: 'SC' },
        { value: 'SP', text: 'SP' },
        { value: 'SE', text: 'SE' },
        { value: 'TO', text: 'TO' },
      ],

    }
  },

  methods: {
    getCidades() {
      this.listaCidade = this.cidadesDB
    },

    novaCidade() {
      this.showModalNovaCidade()
    },

    salvarCidade() {
      if (this.idCidade.length <= 0) {
        alert('O campo ID da Cidade é obrigátorio!')
      } else if (this.nomeCidade.length <= 0) {
        alert('O campo Nome do Cidade é obrigátorio!')
      } else if (this.ufSelected === null ) {
          alert('O campo UF da Cidade é obrigatório!')        
      } else {
        const parametros = {
          id: this.idCidade ,
          nomeCidade: this.nomeCidade,
          uf: this.ufSelected,
        }
        this.listaCidade.push(parametros)
        this.hideModalNovaCidade()
        this.alertCriadoComSucesso = true
      }
      },

    alterarCidade() {
      if (this.nomeCidade.length <= 0) {
        alert('O campo nome da Cidade é obrigátorio')
      } else if (this.ufSelected === null) {
          alert('O campo UF da Cidade é obrigatório!')        
      } else {
        const parametros = {
          id: this.idCidade ,
          nomeCidade: this.nomeCidade,
          uf: this.ufSelected,
        }
        let index = this.listaCidade.findIndex(i => i.id === this.idCidade)
        this.listaCidade[index] = parametros
        this.hideModalAlterarCidade()
        this.alertAlteradoComSucesso = true
      }      
    },

    deletarCidade() {
        let index = this.listaCidade.findIndex(i => i.id === this.idCidade)
        this.listaCidade.splice(index, 1)
        this.alertDeletadoComSucesso = true   
    },

    showModalNovaCidade() {
      this.$root.$emit('bv::show::modal', 'adicionar-cidade', '#btnShow')      
    },
    hideModalNovaCidade() {
      this.$root.$emit('bv::hide::modal', 'adicionar-cidade', '#btnShow')
      this.limparDadosReativos()
    },
    showModalAlterarCidade(cidade) {
      this.idCidade = cidade.id
      this.nomeCidade = cidade.nomeCidade
      this.ufSelected = cidade.uf
      this.$root.$emit('bv::show::modal', 'alterar-cidade', '#btnShow')      
    },
    hideModalAlterarCidade() {
      this.$root.$emit('bv::hide::modal', 'alterar-cidade', '#btnShow')
      this.limparDadosReativos()
    },
    limparDadosReativos() {
      this.idCidade = '',
      this.nomeCidade = '',
      this.ufEstado = '',
      this.ufID = '',
      this.alertAlteradoComSucesso = false,
      this.alertCriadoComSucesso = false,
      this.alertDeletadoComSucesso = false
    },
  }
}

</script>

<style>

</style>
