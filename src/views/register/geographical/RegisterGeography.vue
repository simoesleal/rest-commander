<template>
  <div>
    <div v-if="this.$route.path === '/cadastros-geografico'">
        <page-title icon="fas fa-globe-americas" main="Cadastros Geográficos"></page-title>
        <div class="container row justify-content-center">
            <div class="col-12 col-sm-4 col-md-3">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700 color-666">
                            País
                        </h2>
                        <router-link :to="'cadastros-geografico/paises'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4 col-md-3">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700 color-666">
                            Estado
                        </h2>
                        <router-link :to="'cadastros-geografico/estados'" class="btn btn-info text-uppercase">Cadastrar</router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-4 col-md-3">
                <div class="material-card bg-fff">
                    <div class="card-body">
                        <h2 class="text-uppercase font-1-3em font-700 color-666">
                            Cidade
                        </h2>
                        <router-link :to="'cadastros-geografico/cidades'" class="btn btn-info text-uppercase">Cadastrar</router-link>
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
    name: 'CadastrosGeograficos',
    components: {
		'page-title': PageTitle
	}
}
</script>