<template>
  <div>
    <div v-if="this.$route.path === '/cadastro-pessoas'">
        <page-title icon="fas fa-users" main="Cadastros de Pessoas"></page-title>
        <div class="row">
            <div class="col-6">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Funcionários
                        </h2>
                        <router-link :to="'/funcionarios'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Fornecedores
                        </h2>
                        <router-link :to="'/fornecedores'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700">
                            Clientes
                        </h2>
                        <router-link :to="'/clientes'" class="btn btn-info text-uppercase">Cadastrar</router-link>
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
  name: 'CadastroPessoas',
  components: {
		'page-title': PageTitle
	},
}
</script>