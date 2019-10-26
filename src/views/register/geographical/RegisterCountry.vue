<template>
  <div>
    <template  v-if="this.$route.path === '/cadastros-geografico/pais'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-flag" main="Cadastrar País"></page-title>       
          </b-col>
        </b-row>
        <b-form class="form-panel">
          <b-form-group
            id="informacoes-basicas"
            description="*Campos obrigatórios">
              <label>Código*</label>
              <b-form-input id="country-id" class="mb-2" :disabled="setInputFieldDisabled" v-model="country.id" required type="number" placeholder="Exemplo: 01"></b-form-input>
              <label>País*</label>
              <b-form-input id="country-name" class="mb-3" v-model="country.nomePt" required type="text" placeholder="Exemplo: Brasil"></b-form-input>
              <label>Sigla*</label>
              <b-form-input id="country-sigla" class="mb-3" v-model="country.sigla" required type="text" placeholder="Exemplo: BR"></b-form-input>
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
              <next-vue-button
              />
            </b-col>
          </template>
        </b-row>
      </b-container>
    </template>
  </div>
</template>


<script>
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'
import NextVueButton from 'next-vue-button'

export default {
  name: 'CrudPais',
  components: {
		'page-title': PageTitle,
    'next-vue-button': NextVueButton
	},
  props: {
    actionMode: String,
    selectedCountry: Object,
  },
  data() {
    return {
      country: {
        id: 0,
        nomePt: '',
        sigla: '',
      }
    }
  },
  computed: {
    setInputFieldDisabled() { 
      if(this.actionMode === 'edit') { return true } else { return false } 
    }
  },
  mounted() {
    if(this.selectedCountry) {
      this.country = this.selectedCountry    
    }
  },
  methods: {
    backOnePage() {
      this.$router.back()
    },

    async saveRecord() {
      let response
      let parameters = {
        name: this.country.nomePt,
        initials: this.country.sigla
      }
      try {
        response = await RestConnection.post('paises/cadastrar/pais/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi Salvar este país.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async alterRecord() {
      let response
      let parameters = {
        id: this.country.id,
        name: this.country.nomePt,
        initials: this.country.sigla
      }
      try {
        response = await RestConnection.put('paises/atualizar/pais/', parameters)
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert('Não foi possível Atualizar este país.')
          }
      }
      alert(response.data.mensagem)
      this.backOnePage()
    },

    async deleteRecord() {
      let response
      try {
          response = await RestConnection.delete('paises/deletar/pais/' + this.country.id)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Não foi possível Deletar este país.')
            }
        }
        this.listOfCountries = response.data.conteudo   
      alert(response.data.mensagem)
      this.backOnePage()    
    }
  }
}

</script>
