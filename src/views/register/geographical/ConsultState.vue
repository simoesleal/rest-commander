/* eslint-disable */
<template>
  <div>
    <template v-if="this.$route.path === '/cadastros-geografico/estados'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="9">
            <page-title icon="fas fa-university" main="Consultar Estado"></page-title>        
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Paraná"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getEstados"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <b-button variant="primary" @click="novoEstado"><i class="fas fa-plus"></i> Novo Estado</b-button>
          </b-col>
        </b-row>
        <b-alert v-model="alertAlteradoComSucesso" variant="success" dismissible class="m-3 text-left">
          Estado alterado com sucesso!
         </b-alert>
        <b-alert v-model="alertCriadoComSucesso" variant="success" dismissible class="m-3 text-left">
          Estado criado com sucesso!
         </b-alert>
         <b-alert v-model="alertDeletadoComSucesso" variant="danger" dismissible class="m-3 text-left">
          Estado deletado com sucesso!
         </b-alert>
        <b-row class="mt-3" v-if="(listaEstado.length > 0)">
          <b-col>
             <table class="table m-b-2 bg-fff">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Estado</th>
                    <th scope="col">País</th>
                    <th scope="col">Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(estado, index) in listaEstado" :key="index">
                    <td>{{ estado.id }}</td>
                    <td>{{ estado.nomeEstado }}</td>
                    <td>{{ estado.nomePais }}</td>
                    <td>
                      <b-button variant="outline-info" class="mr-5" @click="showModalAlterarEstado(estado)"><i class="fas fa-pencil-alt"></i> Alterar</b-button>     
                      <b-button variant="outline-danger" @click="deletarEstado" disabled><i class="fas fa-trash-alt"></i> Deletar</b-button>
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
  <b-modal ref="modal-novo-estado" id="adicionar-estado" title="Adicionar Estado" size="md" header-bg-variant="light">
    <b-form>
      <label>ID estado*</label>
      <b-form-input id="id-estado" class="mb-3" type="text" v-model="idEstado" trim placeholder="Exemplo: 01"></b-form-input>
      <label>Estado*</label>
      <b-form-select class="mb-3" v-model="estadoSelected" :options="estadosBrasileiros"></b-form-select>
      <label>UF*</label>
      <b-form-select class="mb-3" v-model="ufSelected" :options="ufEstados"></b-form-select>
      <label>País*</label>
      <b-form-select class="mb-3" v-model="countrySelected" :options="countryList"></b-form-select>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="salvarEstado">Salvar</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalNovoEstado">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campos Obrigatórios!</small></p>
  </b-modal>
  <b-modal ref="modal-alterar-estado" id="alterar-estado" title="Alterar Estado" size="md" header-bg-variant="light">
    <b-form>
       <label>ID estado*</label>
      <b-form-input id="id-estado" class="mb-3" type="text" v-model="idEstado" trim placeholder="Exemplo: 01" disabled></b-form-input>
      <label>Estado*</label>
      <b-form-select class="mb-3" v-model="estadoSelected" :options="estadosBrasileiros"></b-form-select>
      <label>UF*</label>
      <b-form-select class="mb-3" v-model="ufSelected" :options="ufEstados"></b-form-select>
      <label>País*</label>
      <b-form-select class="mb-3" v-model="countrySelected" :options="countryList"></b-form-select>
    </b-form>   
    <div class="w-100" slot="modal-footer">
      <b-button class="mt-2 float-right" variant="outline-primary" @click="alterarEstado">Salvar Alteração</b-button>        
      <b-button class="mt-2 mr-2 float-right" variant="outline-danger" @click="hideModalAlterarEstado">Cancelar</b-button>
    </div>
    <p class="card-text"><small class="text-muted">* Campos Obrigatórios!</small></p>
  </b-modal>
  </div>
</template>


<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudEstado',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      estadosDB: [
        { id: '01', nomeEstado: 'Acre', uf:'AC', idPais: '01', nomePais: 'Brasil'},
        { id: '02', nomeEstado: 'Alagoas', uf:'AL', idPais: '01', nomePais: 'Brasil'},
        { id: '03', nomeEstado: 'Amapá', uf:'AP', idPais: '01', nomePais: 'Brasil'},
        { id: '04', nomeEstado: 'Amazonas', uf:'AM', idPais: '01', nomePais: 'Brasil'},
        { id: '05', nomeEstado: 'Bahia', uf:'BA', idPais: '01', nomePais: 'Brasil'},
        { id: '06', nomeEstado: 'Ceará', uf:'CE', idPais: '01', nomePais: 'Brasil'},
        { id: '07', nomeEstado: 'Distrito Federal', uf:'DF', idPais: '01', nomePais: 'Brasil'},
        { id: '08', nomeEstado: 'Espírito Santo', uf:'ES', idPais: '01', nomePais: 'Brasil'},
        { id: '09', nomeEstado: 'Goiás', uf:'GO', idPais: '01', nomePais: 'Brasil'},
        { id: '010', nomeEstado: 'Maranhão', uf:'MA', idPais: '01', nomePais: 'Brasil'},
        { id: '011', nomeEstado: 'Mato Grosso', uf:'MT', idPais: '01', nomePais: 'Brasil'},
        { id: '012', nomeEstado: 'Mato Grosso do Sul', uf:'MS', idPais: '01', nomePais: 'Brasil'},
        { id: '013', nomeEstado: 'Minas Gerais', uf:'MG', idPais: '01', nomePais: 'Brasil'},
        { id: '014', nomeEstado: 'Pará', uf:'PA', idPais: '01', nomePais: 'Brasil'},
        { id: '015', nomeEstado: 'Paraíba', uf:'PB', idPais: '01', nomePais: 'Brasil'},
        { id: '016', nomeEstado: 'Paraná', uf:'PR', idPais: '01', nomePais: 'Brasil'},
        { id: '017', nomeEstado: 'Pernambuco', uf:'PE', idPais: '01', nomePais: 'Brasil'},
        { id: '018', nomeEstado: 'Piauí', uf:'PI', idPais: '01', nomePais: 'Brasil'},
        { id: '019', nomeEstado: 'Rio de Janeiro', uf:'RJ', idPais: '01', nomePais: 'Brasil'},
        { id: '020', nomeEstado: 'Rio Grande do Norte', uf:'RN', idPais: '01', nomePais: 'Brasil'},
        { id: '021', nomeEstado: 'Rio Grande do Sul', uf:'RS', idPais: '01', nomePais: 'Brasil'},
        { id: '022', nomeEstado: 'Rondônia', uf:'RO', idPais: '01', nomePais: 'Brasil'},
        { id: '023', nomeEstado: 'Roraima', uf:'RR', idPais: '01', nomePais: 'Brasil'},
        { id: '024', nomeEstado: 'Santa Catarina', uf:'SC', idPais: '01', nomePais: 'Brasil'},
        { id: '025', nomeEstado: 'São Paulo', uf:'SP', idPais: '01', nomePais: 'Brasil'},
        { id: '026', nomeEstado: 'Sergipe', uf:'SE', idPais: '01', nomePais: 'Brasil'},
        { id: '027', nomeEstado: 'Tocantins', uf:'TO', idPais: '01', nomePais: 'Brasil'},
      ],
      listaEstado: [],
      idEstado: '',
      nomeEstado: '',
      ufEstado: '',
      idPais: '',
      nomePais: '',
      alertAlteradoComSucesso: false,
      alertCriadoComSucesso: false,
      alertDeletadoComSucesso: false, 
      listPais: [],
      estadoSelected: null,
      estadosBrasileiros: [
        { value: null, text: 'Selecione um Estado', disabled: true },
        { value: 'Acre', text: 'Acre' },
        { value: 'Alagoas', text: 'Alagoas' },
        { value: 'Amapá', text: 'Amapá' },
        { value: 'Amazonas', text: 'Amazonas' },
        { value: 'Bahia', text: 'Bahia' },
        { value: 'Ceará', text: 'Ceará' },
        { value: 'Distrito Federal', text: 'Distrito Federal' },
        { value: 'Espírito Santo', text: 'Espírito Santo' },
        { value: 'Goiás', text: 'Goiás' },
        { value: 'Maranhão', text: 'Maranhão' },
        { value: 'Mato Grosso', text: 'Mato Grosso' },
        { value: 'Mato Grosso do Sul', text: 'Mato Grosso do Sul' },
        { value: 'Minas Gerais', text: 'Minas Gerais' },
        { value: 'Pará', text: 'Pará' },
        { value: 'Paraíba', text: 'Paraíba' },
        { value: 'Paraná', text: 'Paraná' },
        { value: 'Pernambuco', text: 'Pernambuco' },
        { value: 'Piauí', text: 'Piauí' },
        { value: 'Rio de Janeiro', text: 'Rio de Janeiro' },
        { value: 'Rio Grande do Norte', text: 'Rio Grande do Norte' },
        { value: 'Rio Grande do Sul', text: 'Rio Grande do Sul' },
        { value: 'Rondônia', text: 'Rondônia' },
        { value: 'Roraima', text: 'Roraima' },
        { value: 'Santa Catarina', text: 'Santa Catarina' },
        { value: 'São Paulo', text: 'São Paulo' },
        { value: 'Sergipe', text: 'Sergipe' },
        { value: 'Tocantins', text: 'Tocantins' },
      ],
      ufSelected: null,
      ufEstados: [
        { value: null, text: 'Selecione a UF' },
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
      countrySelected: null,
      countryList: [{ value: null, text: 'Selecione o País' }, { value: 'BR', text: 'Brasil' }]
    }
  },

  methods: {
    getEstados() {
      this.listaEstado = this.estadosDB
    },

    novoEstado() {
      this.showModalNovoEstado()
    },

    salvarEstado() {
      if (this.idEstado.length <= 0) {
        alert('O campo ID do Estado é obrigátorio!')
      } else if (this.estadoSelected === null) {
        alert('O campo Nome do Estado é obrigátorio!')
      } else if (this.ufSelected === null ) {
          alert('O campo UF do Estado é obrigatório!')        
      } else if (this.countrySelected === null ) {
          alert('O campo Pais do Estado é obrigatório!')
      } else {
        console.log(this.estadoSelected)
        const parametros = {
          id: this.idEstado,
          nomeEstado: this.estadoSelected,
          uf: this.ufSelected,
          nomePais: this.countrySelected
        }
        console.log(parametros)
        this.listaEstado.push(parametros)
        console.log(this.listaEstado)
        this.hideModalNovoEstado()
        this.alertCriadoComSucesso = true
      }
      },

    alterarEstado() {
      if (this.idEstado.length <= 0) {
        alert('O campo ID do Estado é obrigátorio!')
      } else if (this.estadoSelected === null) {
        alert('O campo Nome do Estado é obrigátorio!')
      } else if (this.ufSelected === null ) {
          alert('O campo UF do Estado é obrigatório!')        
      } else if (this.countrySelected === null ) {
          alert('O campo Pais do Estado é obrigatório!')
      } else {
        const parametros = {
          id: this.idEstado,
          nomeEstado: this.nomeEstado,
          ufEstado: this.ufSelected,
          paisEstado: this.countrySelected
        }
        let index = this.listaEstado.findIndex(i => i.id === this.idEstado)
        this.listaEstado[index] = parametros
        this.hideModalAlterarEstado()
        this.alertAlteradoComSucesso = true
      }
      
    },

    deletarEstado() {
      let index = this.listaEstado.findIndex(i => i.id === this.idEstado)
      this.listaEstado.splice(index, 1)
      this.alertDeletadoComSucesso = true 
    },

    showModalNovoEstado() {
      this.$root.$emit('bv::show::modal', 'adicionar-estado', '#btnShow')      
    },
    hideModalNovoEstado() {
      this.$root.$emit('bv::hide::modal', 'adicionar-estado', '#btnShow')
      this.limparDadosReativos()
    },
    showModalAlterarEstado(estado) {
      console.log('estado')
      console.log(estado)
      this.idEstado = estado.id
      this.nomeEstado = estado.nomeEstado
      this.ufSelected = estado.uf
      this.countrySelected = estado.nomePais
      this.$root.$emit('bv::show::modal', 'alterar-estado', '#btnShow')      
    },
    hideModalAlterarEstado() {
      this.$root.$emit('bv::hide::modal', 'alterar-estado', '#btnShow')
      this.limparDadosReativos()
    },
    limparDadosReativos() {
      this.idEstado = '',
      this.nomeEstado = '',
      this.ufEstado = '',
      this.idPais = '',
      this.nomePais = '',
      this.alertAlteradoComSucesso = false,
      this.alertCriadoComSucesso = false
      this.alertDeletadoComSucesso = false 
    },
  }
}

</script>

<style>

</style>
