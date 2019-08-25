<template>
  <div>
    <template v-if="this.$route.path === '/cadastros-geografico/estados'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-university" main="Consultar Estado"></page-title>        
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Paraná"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getStates"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Estado</b-button>
            </router-link>
          </b-col>
        </b-row>
        <b-row class="mt-3" v-if="(listOfStates.length > 0)">
          <b-col>
             <table class="table m-b-2 bg-fff">
                  <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Estado</th>
                    <th scope="col">UF</th>
                    <th scope="col">País</th>
                    <th scope="col">Ações</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(state, index) in listOfStates" :key="index">
                    <td>{{ state.id }}</td>
                    <td>{{ state.nameState }}</td>
                    <td>{{ state.uf }}</td>
                    <td>{{ state.nameCountry }}</td>
                    <td>
                      <router-link :to="{ name: 'CadastrarEstado', params: { actionMode:'edit', selectedState: state }}">
                        <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
                      </router-link> 
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
      listOfStates: [],
      statesDBReturn: [
        { id: '01', nameState: 'Acre', uf:'AC', idCountry: '01', nameCountry: 'Brasil'},
        { id: '02', nameState: 'Alagoas', uf:'AL', idCountry: '01', nameCountry: 'Brasil'},
        { id: '03', nameState: 'Amapá', uf:'AP', idCountry: '01', nameCountry: 'Brasil'},
        { id: '04', nameState: 'Amazonas', uf:'AM', idCountry: '01', nameCountry: 'Brasil'},
        { id: '05', nameState: 'Bahia', uf:'BA', idCountry: '01', nameCountry: 'Brasil'},
        { id: '06', nameState: 'Ceará', uf:'CE', idCountry: '01', nameCountry: 'Brasil'},
        { id: '07', nameState: 'Distrito Federal', uf:'DF', idCountry: '01', nameCountry: 'Brasil'},
        { id: '08', nameState: 'Espírito Santo', uf:'ES', idCountry: '01', nameCountry: 'Brasil'},
        { id: '09', nameState: 'Goiás', uf:'GO', idCountry: '01', nameCountry: 'Brasil'},
        { id: '010', nameState: 'Maranhão', uf:'MA', idCountry: '01', nameCountry: 'Brasil'},
        { id: '011', nameState: 'Mato Grosso', uf:'MT', idCountry: '01', nameCountry: 'Brasil'},
        { id: '012', nameState: 'Mato Grosso do Sul', uf:'MS', idCountry: '01', nameCountry: 'Brasil'},
        { id: '013', nameState: 'Minas Gerais', uf:'MG', idCountry: '01', nameCountry: 'Brasil'},
        { id: '014', nameState: 'Pará', uf:'PA', idCountry: '01', nameCountry: 'Brasil'},
        { id: '015', nameState: 'Paraíba', uf:'PB', idCountry: '01', nameCountry: 'Brasil'},
        { id: '016', nameState: 'Paraná', uf:'PR', idCountry: '01', nameCountry: 'Brasil'},
        { id: '017', nameState: 'Pernambuco', uf:'PE', idCountry: '01', nameCountry: 'Brasil'},
        { id: '018', nameState: 'Piauí', uf:'PI', idCountry: '01', nameCountry: 'Brasil'},
        { id: '019', nameState: 'Rio de Janeiro', uf:'RJ', idCountry: '01', nameCountry: 'Brasil'},
        { id: '020', nameState: 'Rio Grande do Norte', uf:'RN', idCountry: '01', nameCountry: 'Brasil'},
        { id: '021', nameState: 'Rio Grande do Sul', uf:'RS', idCountry: '01', nameCountry: 'Brasil'},
        { id: '022', nameState: 'Rondônia', uf:'RO', idCountry: '01', nameCountry: 'Brasil'},
        { id: '023', nameState: 'Roraima', uf:'RR', idCountry: '01', nameCountry: 'Brasil'},
        { id: '024', nameState: 'Santa Catarina', uf:'SC', idCountry: '01', nameCountry: 'Brasil'},
        { id: '025', nameState: 'São Paulo', uf:'SP', idCountry: '01', nameCountry: 'Brasil'},
        { id: '026', nameState: 'Sergipe', uf:'SE', idCountry: '01', nameCountry: 'Brasil'},
        { id: '027', nameState: 'Tocantins', uf:'TO', idCountry: '01', nameCountry: 'Brasil'},
      ],   
    }
  },
  methods: {
    getStates() {
      this.listOfStates = this.statesDBReturn
    },
  }
}

</script>

<style>

</style>
