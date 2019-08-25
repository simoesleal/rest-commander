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
        <b-row class="mt-3" v-if="(listOfCities.length > 0)">
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
                  <tr v-for="(city, index) in listOfCities" :key="index">
                    <td>{{ city.id }}</td>
                    <td>{{ city.nameCity}}</td>
                    <td>{{ city.uf }}</td>
                    <td>
                      <router-link :to="{ name: 'CadastrarCidade', params: { actionMode:'edit', selectedCity: city }}">
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
      ufSelected: null,
      ufBrazilianStates: [
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
        { value: 'XX', text: 'XX' },
      ],

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
