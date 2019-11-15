<template>
	<div>
		<div v-if="this.$route.path === '/contas-pagar'">
			<b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-file-invoice" main="Contas a Pagar"></page-title> 
          </b-col>
        </b-row>
			</b-container>
			</div>
		<router-view></router-view>
	</div>
</template>

<script>
import { RestConnection } from '../../rest/rest.connection'
import PageTitle from '../../components/template/PageTitle'

export default {
  name: 'ContasPagar',
  components: {
		'page-title': PageTitle
	},
}
</script>

<style>

</style>