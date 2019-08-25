<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="9">
            <page-title icon="fas fa-city" main="Cadastrar Cidade"></page-title>           
          </b-col>
        </b-row>
      </b-container>
    </template>
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
