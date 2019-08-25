<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/cidades'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-city" main="Consultar Cidade"></page-title>           
          </b-col>
        </b-row>
        <b-row class="justify-content-md-center mt-3">
          <b-col cols="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Foz do Iguaçu"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCities"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col>
            <router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Nova Cidade</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCities.length > 0">
          <b-table hover striped bordered fixed :items="listOfCities" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'edit', selectedCity: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
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
  name: 'CrudCidade',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      listOfCities: [],
      citiesReturnDB: [
        { id: '01', nameCity: 'Foz do Iguaçu', ufID: '15', uf:'PR'},
        { id: '02', nameCity: 'Curitiba', ufID: '15', uf:'PR'},
        { id: '03', nameCity: 'Cascavel', ufID: '15', uf:'PR'},
        { id: '04', nameCity: 'Londrina', ufID: '15', uf:'PR'},
        { id: '05', nameCity: 'Maringa', ufID: '15', uf:'PR'},
      ],
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nameCity', label: 'Nome', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },

  methods: {
    getCities() {
      this.listOfCities = this.citiesReturnDB
    },
  }
}

</script>

<style>

</style>
