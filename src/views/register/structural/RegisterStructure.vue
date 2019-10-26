<template>
  <div>
    <div v-if="this.$route.path === '/cadastro-estrutural'">
        <page-title icon="fas fa-users" main="Cadastros de Estrutura"></page-title>
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Mesas
                        </h2>
                        <router-link :to="'cadastro-estrutural/mesas'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Funções
                        </h2>
                        <router-link :to="'cadastro-estrutural/funcoes'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <!-- <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            NCM
                        </h2>
                        <router-link :to="'cadastro-estrutural/ncms'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            CEST
                        </h2>
                        <router-link :to="'cadastro-estrutural/cestes'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div> -->
            <!-- <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            CST PIS/COFINS
                        </h2>
                        <router-link :to="'cadastro-estrutural/cst-pis-cofins-consulta'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            CST/CSOSN
                        </h2>
                        <router-link :to="'cadastro-estrutural/cst-csosn-consulta'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div> -->
            <!-- <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            CFOP
                        </h2>
                        <router-link :to="'cadastro-estrutural/cfops'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div> -->
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Moeda
                        </h2>
                        <router-link :to="'cadastro-estrutural/moedas'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Cotação do Dia
                        </h2>
                        <router-link :to="'cadastro-estrutural/cotacoes'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CadastroEstrutural',
  components: {
		'page-title': PageTitle
	},
}
</script>